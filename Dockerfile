# # Install dependencies only when needed
# FROM node:22-alpine AS deps
# WORKDIR /app
# COPY package.json package-lock.json* ./
# RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# # Rebuild the source code only when needed
# FROM node:22-alpine AS builder
# WORKDIR /app
# COPY . .
# COPY --from=deps /app/node_modules ./node_modules
# RUN npm run build

# # Production image
# FROM node:22-alpine AS runner
# WORKDIR /app

# ENV NODE_ENV=production

# # Install PM2 for process management in container
# RUN npm install -g pm2

# # Copy necessary files
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/ecosystem.config.js ./ecosystem.config.js

# # Expose Next.js default port
# EXPOSE 3600

# # Start the app with PM2 ecosystem config
# CMD ["pm2-runtime", "ecosystem.config.js", "--only", "frontend"]
# Install dependencies only when needed
FROM node:22-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi


# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN npm run build


# Production image
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only required files (NO PM2)
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose port
EXPOSE 3600

# Start Next.js directly (NO PM2)
CMD ["npx", "next", "start", "-p", "3600"]