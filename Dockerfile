FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . .

RUN javac -cp "mysql-connector-j-26.7.0.jar" -d out src/*.java

EXPOSE 8080

CMD ["java", "-cp", "out:mysql-connector-j-26.7.0.jar", "JobServer"]