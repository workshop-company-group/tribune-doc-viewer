FROM node:16-buster

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD tail -f /dev/null