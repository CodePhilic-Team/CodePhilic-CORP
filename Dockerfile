# Install dependencies only when needed
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Production image
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose Next.js default port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
