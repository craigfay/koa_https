FROM node:10
  
WORKDIR /app

COPY package*.json .

RUN npm install --quiet

COPY . .

EXPOSE 8080

CMD node server.js