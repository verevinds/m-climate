FROM node:14

RUN mkdir -p /app
WORKDIR /app

COPY . /app

RUN npm install
RUN npm install --global kill-port
RUN npm install --global nodemon