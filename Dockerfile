FROM node:22.12-alpine AS builder

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package*.json ./

RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .

RUN npm run build

FROM node:22.12-alpine AS release

WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./

RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev && \
    npm cache clean --force

USER nextjs

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/main.js"]
