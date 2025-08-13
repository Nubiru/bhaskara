FROM node:20-alpine AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN npm ci

FROM node:20-alpine AS production-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
RUN npm ci --omit=dev

FROM node:20-alpine AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
# Build-time API base URL for Vite
ARG VITE_API_BASE_URL=http://backend:8000
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN npm run build

# Serve static client with Nginx
FROM nginx:alpine
COPY --from=build-env /app/build/client /usr/share/nginx/html
# Basic caching headers could be added via a custom nginx.conf if needed
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]