FROM node:14.16

EXPOSE 80

RUN mkdir /app

WORKDIR /app

COPY ./ /app

RUN npm install