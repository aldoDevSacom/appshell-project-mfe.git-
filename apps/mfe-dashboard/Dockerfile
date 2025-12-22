FROM node:20-alpine AS build

WORKDIR /app

# Instala dependencias en capa cacheable
COPY package*.json ./
RUN npm ci

# Copia código y construye el dashboard
COPY . .
RUN npm run build:dashboard

# Imagen final ligera para servir estáticos
FROM nginx:1.27-alpine AS runtime

WORKDIR /usr/share/nginx/html

# Config de Nginx para SPA (fallback a index.html)
COPY apps/mfe-dashboard/default.conf /etc/nginx/conf.d/default.conf

# Copia artefacto de build
COPY --from=build /app/dist/mfe-dashboard/browser ./

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
