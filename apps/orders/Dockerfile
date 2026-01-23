# Builder
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files for install
COPY apps/orders/package*.json ./

RUN echo "Installing dependencies"
RUN npm install

# Copy source and build
COPY apps/orders/ ./
RUN npm run build

# Production image
FROM node:20-alpine AS production

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
