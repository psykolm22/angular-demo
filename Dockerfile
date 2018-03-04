# Client App
FROM johnpapa/angular-cli as client-app
LABEL authors="John Papa"
WORKDIR /app/src
COPY ["package.json", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent
COPY . .
RUN ng build --prod --build-optimizer

# # Node server
# FROM node:8.9-alpine as node-server
# WORKDIR /app/src
# COPY ["package.json", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../
# COPY /src/server /app/src

# Final image
FROM node:8.9-alpine
WORKDIR /app/src
# COPY --from=node-server /usr/src /usr/src
COPY --from=client-app /app/src/dist ./
EXPOSE 3000
CMD ["node", "index.js"]
