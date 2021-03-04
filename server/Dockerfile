FROM node:14

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./

RUN npm install && npm cache clean --force --loglevel=error

COPY . /app

RUN npm install --global kill-port
RUN npm install --global nodemon

CMD ["npm", "run", "dev"]