
#   BUILD
FROM node:19-alpine AS frontend-builder

WORKDIR /usr/app

COPY ./package.json ./
RUN npm install

COPY ./ ./

RUN npm run build



#   PRODUCTION
FROM nginx:stable-alpine

COPY --from=frontend-builder /usr/app/build/ /usr/share/nginx/html
COPY ./nginx/default.conf   /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

EXPOSE 3000
