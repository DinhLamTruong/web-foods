# Stage 1, based on Node.js, to build and compile the react app
FROM node:20 as build 

RUN mkdir -p /app 

WORKDIR /app 

COPY package*.json /app/ 

COPY ./ /app/ 

COPY ./.env /app/.env 

RUN npm install 

RUN npm run build
# Stage 2, based on Nginx, to have only the compiled app, ready for production with Nginx

FROM nginx:alpine 

RUN mkdir -p /app 

WORKDIR /app COPY --from=build /app/dist/ /app/dist 

EXPOSE 80 

COPY ./nginx.conf.template /etc/nginx/conf.d/default.conf
