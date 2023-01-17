FROM node:alpine 

WORKDIR /bookstore_app/Back-End

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start"]