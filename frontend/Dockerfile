# Этап 1: Сборка статики
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
# RUN npm ci
RUN npm install --verbose

COPY . .
RUN npm run build

# Этап 2: Раздача через Nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
# Примечание: если используете Vite вместо CRA, замените /app/build на /app/dist

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
