FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
COPY scripts/start.js ./scripts/
COPY docker/.env ./docker/.env
RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/docker/.env .env

CMD ["node", "scripts/start.js"]
