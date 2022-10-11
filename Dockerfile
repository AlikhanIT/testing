FROM node

WORKDIR /usr/src/app

WORKDIR /app
COPY package*.json .
COPY prisma ./prisma/
RUN npm install --only=prod

COPY . .

EXPOSE 5555
CMD [ "npm", "start" ]