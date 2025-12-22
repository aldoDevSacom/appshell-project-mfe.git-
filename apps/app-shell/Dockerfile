FROM node:20-alpine AS build

WORKDIR /app

# Instala dependencias en una capa cacheable
COPY package*.json ./
RUN npm ci

# Copia el resto del código y construye el shell
COPY . .
RUN npm run build:shell

# Imagen final ligera para servir estáticos
FROM nginx:1.27-alpine AS runtime

WORKDIR /usr/share/nginx/html

# Config de Nginx para SPA (fallback a index.html)
COPY apps/app-shell/default.conf /etc/nginx/conf.d/default.conf

# Copia el artefacto del shell
COPY --from=build /app/dist/app-shell/browser ./

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
