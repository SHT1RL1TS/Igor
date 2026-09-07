FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
# RUN npm ci --only=production

RUN npm install --omit=dev

COPY . .

EXPOSE 5000

CMD ["node", "src/index.js"]
