ARG NODE_VERSION=20.11.0

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /server
COPY  package.json .
RUN npm install 
COPY . .
CMD npm run dev