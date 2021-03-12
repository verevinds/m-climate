FROM node:14

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./

RUN npm install && npm cache clean --force --loglevel=error

COPY . /app

RUN npm install pm2@latest -g

CMD ["npm", "run", "dev"]