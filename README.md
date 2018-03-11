# Development

yarn install
yarn run build:server && yarn run serve:server

# Deploy staging serverless

yarn run build:server-staging && yarn run deploy:staging

# Deploy prod serverless

yarn run build:server-prod && yarn run deploy:prod