node -v
npm -v
yarn config set registry http://registry.npm.taobao.org
yarn config set sass-binary-site http://npm.taobao.org/mirrors/node-sass

PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=YES

yarn config set cache-folder /yarn
yarn

npm config set sass-binary-site http://npm.taobao.org/mirrors/node-sass
npm rebuild node-sass

sh scripts/wrap

yarn test
yarn jest --clearCache
