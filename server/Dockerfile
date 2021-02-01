FROM node:14

RUN mkdir -p /app/server
WORKDIR /app/server

COPY . /app/server
RUN npm install
RUN npm install --global kill-port