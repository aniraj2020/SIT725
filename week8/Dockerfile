# Use official Node.js image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy only package.json files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the project files
COPY . .

# Expose port the app runs on
EXPOSE 3001

# Start the app
CMD ["npm", "start"]
