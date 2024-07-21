# Stage 1: Build
FROM node:22 AS build

# Set working directory
WORKDIR /app/frontend

# Copy package.json and package-lock.json
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY frontend .

# Build the React application
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

# Copy the build output from the build stage
COPY --from=build /app/frontend/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]