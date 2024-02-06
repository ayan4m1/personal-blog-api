FROM node:lts-alpine

WORKDIR /usr/src/personal-blog-api

COPY . .

RUN npm ci

RUN npm run build

EXPOSE 4088

CMD ["node", "lib/index.js"]
