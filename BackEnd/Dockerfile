# Use an official OpenJDK runtime as the base image
FROM openjdk:11-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the packaged JAR file to the working directory
COPY target/JeeProjectApplication.jar app.jar

# Set the command to run the Spring Boot application
CMD ["java", "-jar", "app.jar"]
