FROM node:latest

RUN mkdir -p /usr/src/app/

WORKDIR /usr/src/app/

COPY package.json .

RUN RUN echo "$PWD"

RUN npm install

COPY . .