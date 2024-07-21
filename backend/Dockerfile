# Use the official Node.js image
FROM node:22

# Set working directory
WORKDIR /app/backend

# Copy package.json and package-lock.json
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY backend .

# Build TypeScript
RUN npm run build

# Expose port 3001
EXPOSE 3001

# Command to run the application
CMD ["npm", "start"]