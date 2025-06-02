# Etapa 1: Construcción
FROM node:20-alpine AS builder

WORKDIR /app

# Copiamos dependencias
COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.ts ./
COPY public ./public
COPY src ./src

RUN npm install
RUN npm run build

# Etapa 2: Producción
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000

# Copiar solo lo necesario desde la etapa de build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]
