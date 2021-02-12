FROM node:14

RUN mkdir -p /app
WORKDIR /app

COPY . /app
RUN npm install
RUN npm install -g typescript eslint prettier

CMD [ "npm", "run", "dev"]