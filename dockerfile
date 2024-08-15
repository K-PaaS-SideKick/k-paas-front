# Use the official Node.js image as the base image
FROM node:16 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN yarn build

# Use the official NGINX image to serve the React app
FROM node:16-slim

WORKDIR /app

# Expose port 3000
EXPOSE 3000

CMD ["npx", "serve", "-s", "build"]