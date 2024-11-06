FROM maven:3-eclipse-temurin-17-alpine AS deps

WORKDIR /app
COPY pom.xml /app

RUN mvn dependency:go-offline

FROM maven:3-eclipse-temurin-17-alpine AS builder

WORKDIR /app

COPY . /app
COPY ./docker-entrypoint.sh /docker-entrypoint.sh

RUN apk add inotify-tools
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]