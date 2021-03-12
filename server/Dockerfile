FROM node:14

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./

RUN npm install && npm cache clean --force --loglevel=error

COPY . /app

RUN npm install pm2 -g
ENV PM2_PUBLIC_KEY cqgdwo4y13nhxb8
ENV PM2_SECRET_KEY 71vp335qywe4zwe

CMD ["pm2-runtime", "./src/app.js"]