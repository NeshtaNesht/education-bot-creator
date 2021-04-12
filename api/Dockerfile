FROM node:12-alpine as builder
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --only=prod
COPY . /app
RUN apk --no-cache add --virtual builds-deps build-base python
EXPOSE 8080
USER node
CMD ["npm", "start"]