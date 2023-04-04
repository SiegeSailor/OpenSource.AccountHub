FROM node:18

WORKDIR /application

COPY package*.json tsconfig.json ./

RUN npm install

COPY . .

EXPOSE ${APPLICATION_PORT}

CMD ["npm", "run", "watch"]