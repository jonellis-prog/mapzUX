# Stage 1: Build the React application
FROM node:18-alpine AS build
WORKDIR /mapapp
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:1.25.0-alpine AS production
COPY --from=build /app/build /usr/share/nginx/html
# Optional: Copy a custom nginx.conf if needed for single page application routing
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
