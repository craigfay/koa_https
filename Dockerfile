FROM node:10 

WORKDIR /usr/src/app

COPY package.json .

COPY . .

CMD npm install

EXPOSE 80

EXPOSE 443