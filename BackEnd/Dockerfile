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
WORKDIR /app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline

COPY src ./src

CMD ["./mvnw", "spring-boot:run"]