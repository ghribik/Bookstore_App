FROM node

WORKDIR /app

COPY . /app

RUN mkdir -p /home/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT 5001

EXPOSE 5001

CMD ["node", "Server.js"]