FROM node:alpine 

WORKDIR /bookstore_app/Front-End

COPY package*.json ./

RUN npm install react-bootstrap-validation --save

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]