FROM node:18

WORKDIR /service

COPY package*.json tsconfig.json ./

RUN npm install

COPY . .

EXPOSE ${SERVICE_PORT}

CMD ["npm", "run", "watch"]