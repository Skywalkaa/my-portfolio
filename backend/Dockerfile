# Build stage
FROM node:20-alpine AS build

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./

# Install all dependencies including devDependencies
RUN npm ci

# Copy source code
COPY src/ src/

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy built files from build stage
COPY --from=build /usr/src/app/dist ./dist

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port the app runs on
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').request('http://localhost:3000/health', console.log).on('error', process.exit(1)).end()"

# Command to run the application
CMD ["node", "dist/main"]
