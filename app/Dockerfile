FROM johnpapa/angular-cli as client
WORKDIR /usr/src/app
COPY package.json /usr/src/app/package.json
RUN npm install
COPY . /usr/src/app
RUN ng build --prod --build-optimizer

FROM nginx:1.13.8-alpine
COPY --from=client /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
