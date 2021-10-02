FROM node:12-alpine as builder
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
USER node
CMD ["node", "index.js"]