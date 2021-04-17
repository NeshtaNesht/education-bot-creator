FROM node:12-alpine as builder
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app
# RUN apk --no-cache add --virtual builds-deps build-base python
EXPOSE 8080
USER node
CMD ["npm", "run", "start:prod"]