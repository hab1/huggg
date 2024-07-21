# Use the official Node.js image for building
FROM node:22 as builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for backend
COPY backend/package*.json ./backend/
COPY backend/tsconfig.json ./backend/
WORKDIR /app/backend

# Install backend dependencies
RUN npm install

# Copy the rest of the backend application code
COPY backend/src ./src

# Build TypeScript for backend
RUN npm run build

# Switch back to root directory
WORKDIR /app

# Copy package.json and package-lock.json for frontend
# COPY frontend/package*.json ./frontend/
# WORKDIR /app/frontend

# # Install frontend dependencies
# RUN npm install

# # Copy the rest of the frontend application code
# COPY frontend .

# # Build the frontend application
# RUN npm run build

# # Use lightweight Nginx image for serving the frontend
# FROM nginx:alpine

# # Copy build files from build stage to nginx web server directory
# COPY --from=builder /app/frontend/build /usr/share/nginx/html

# # Copy nginx configuration file
# COPY nginx.conf /etc/nginx/nginx.conf

# # Expose port 80
# EXPOSE 80

# # Default command starts Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]