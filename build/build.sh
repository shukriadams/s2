# fail on errors
set -e

DOCKERPUSH=0
TEST=0
BUILD=0
COMPOSE="docker compose"

while [ -n "$1" ]; do 
    case "$1" in
    --build) BUILD=1 ;;
    --push) DOCKERPUSH=1 ;;
    --test) TEST=1 ;;
    --legacy-compose|-l) COMPOSE="docker-compose" ;;
    esac 
    shift
done

if [ $BUILD -eq 1 ]; then
    echo "Building ... "

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
fi

if [ $TEST -eq 1 ]; then
    echo "Testing ... "

    # test build
    $COMPOSE -f docker-compose.yml down 
    $COMPOSE -f docker-compose.yml up -d 
    
    # give container a chance to start
    sleep 5 
    
    # confirm http process in container is responding
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" localhost:4070) 
    if [ ! $STATUS -eq 200 ] ; then
        echo "ERROR : container test failed with status ${STATUS}"
        exit 1
    fi

    $COMPOSE -f docker-compose.yml down 
    echo "container test passed with status ${STATUS}"
fi

if [ $DOCKERPUSH -eq 1 ]; then
    echo "Pushing ... "

    docker login -u $DOCKER_USER -p $DOCKER_PASS 
    docker push shukriadams/http-filestore:$TAG 
    echo "Pushed container to docker hub";
fi

echo "Done";
