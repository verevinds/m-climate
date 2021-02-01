FROM node:14

RUN mkdir -p /app
WORKDIR /app

COPY . /app
RUN npm install

CMD [ "npm", "run", "dev"]