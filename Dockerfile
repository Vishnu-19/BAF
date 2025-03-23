# Use a lightweight Node.js image
FROM node:13-alpine

# Set the working directory
WORKDIR /home/app

# Copy package.json and package-lock.json first for efficient caching
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application
COPY . .

# Expose the application port (optional, based on your app)
EXPOSE 5000

# Start the application
CMD ["node", "app.js"]
