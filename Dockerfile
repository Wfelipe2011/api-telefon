FROM node:16.17.1-alpine

WORKDIR /app

COPY package*.json .

# COPY package.json /app
RUN npm install

COPY . .

RUN npm run prebuild
RUN npm run build

ENV TZ=Brazil/East
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

CMD ["yarn", "start"]