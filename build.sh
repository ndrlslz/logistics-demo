set -e

node -v
npm -v

tag=$1
echo $tag

yarn config set registry http://registry.npm.taobao.org
yarn config set sass-binary-site http://npm.taobao.org/mirrors/node-sass
yarn config set chromedriver_cdnurl http://cdn.npm.taobao.org/dist/chromedriver

yarn config set cache-folder /yarn
yarn

export NODE_ENV=dev
yarn build
