# Base Image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose API port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
