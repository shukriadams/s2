# fail on errors
set -e
DOCKERPUSH=0
while [ -n "$1" ]; do 
    case "$1" in
    --ci) CI=1 ;;
    --jspm) JSPM=1 ;;
    --dockerpush) DOCKERPUSH=1 ;;
    esac 
    shift
done

rm -rf .clone 
mkdir -p .clone     


# if running on CI system, copy everything from src to .clone folder
cp -R  ./../src  .clone 

# cleans up local node_modules, this is for building on dev systems, on CI it has no effect
rm -rf .clone/src/node_modules

# get tag fom current context
TAG=$(git describe --abbrev=0 --tags)

if [ -z $TAG ]; then
   echo "Error, tag not set. Tag must be a valid github repo tag. Call this script : ./buildTag myTag";
   exit 1;
fi

# install with --no-bin-links to avoid simlinks, this is needed to copy build content around
docker run -v $(pwd)/.clone/src:/tmp/build shukriadams/node8build:0.0.3 sh -c 'cd /tmp/build/ && npm install --no-bin-links' 

# zip the build up
tar -czvf ./build.tar.gz .clone/src 

docker build -t shukriadams/http-filestore .
docker tag shukriadams/http-filestore:latest shukriadams/http-filestore:$TAG 

if [ $DOCKERPUSH -eq 1 ]; then
    docker login -u $DOCKER_USER -p $DOCKER_PASS 
    docker push shukriadams/http-filestore:$TAG 
    echo "Pushed container to docker hub";
fi

echo "Build done";
