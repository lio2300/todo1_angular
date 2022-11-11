FROM node:16 as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --aot --prod --base-href=/ --build-optimizer

FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist/todo1 /usr/share/nginx/html