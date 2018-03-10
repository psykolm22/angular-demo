# Development

yarn install
yarn run build:ssr
yarn run serve:ssr

# Deploy staging serverless

yarn run build:ssr-staging && yarn run deploy:staging

# Deploy prod serverless

yarn run build:ssr-prod && yarn run deploy:prod