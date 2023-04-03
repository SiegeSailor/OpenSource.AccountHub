FROM node:18

WORKDIR /application

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${PORT_APPLICATION}

CMD ["npm", "run", "watch"]