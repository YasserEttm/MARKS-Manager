# Base image for React app
FROM node:14-alpine as react-app

# Set the working directory for React app
WORKDIR /app/FrontEnd

# Copy package.json and package-lock.json to the working directory
COPY FrontEnd/package*.json ./

# Install dependencies for React app
RUN npm install

# Copy the rest of the React application code
COPY FrontEnd ./

# Build the React app
RUN npm run build


# Base image
FROM openjdk:11-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the application source code to the working directory
COPY . .

# Build the Spring Boot application (if required)
# Replace the build command with your specific build process if needed
RUN mvnw clean package

# Set the command to run the Spring Boot application
CMD ["java", "-jar", "target/your-application.jar"]
