FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:22-alpine AS final

WORKDIR /app

RUN npm install -g pm2

COPY package*.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

COPY --from=builder /app/build ./build

CMD [ "pm2-runtime", "start", "build/server.js" ]