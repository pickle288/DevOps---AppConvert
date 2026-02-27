# Stage de build
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production --no-optional && npm cache clean --force

# Stage de production
FROM node:18-alpine AS production

WORKDIR /app

# Copie des dépendances depuis le stage builder
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Exposition du port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

# Démarrage
CMD ["npm", "start"]
