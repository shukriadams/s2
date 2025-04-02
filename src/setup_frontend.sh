set -e
mkdir -p  ./content/css
mkdir -p  ./content/js
VERSION="0.0.21"
curl -L https://github.com/shukriadams/bootstrip/releases/download/$VERSION/bootstrip.js --output ./content/js/bootstrip.js
curl -L https://github.com/shukriadams/bootstrip/releases/download/$VERSION/bootstrip.css --output ./content/css/bootstrip.css
curl -L https://github.com/shukriadams/bootstrip/releases/download/$VERSION/bootstrip-theme-default.css --output ./content/css/bootstrip-theme-default.css
curl -L https://github.com/shukriadams/bootstrip/releases/download/$VERSION/bootstrip-theme-darkmoon.css --output ./content/css/bootstrip-theme-darkmoon.css 

echo "Done setting up"