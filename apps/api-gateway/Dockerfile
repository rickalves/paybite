# Use the official Node.js 20 Alpine image as the base image
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json
COPY apps/api-gateway/package*.json ./

# Force cache invalidation
RUN echo "Installing dependencies"

# Install dependencies
RUN npm install

# Copy the source code
COPY apps/api-gateway/ ./

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

# Set the working directory
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:prod"]