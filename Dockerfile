FROM gcr.io/kaniko-project/executor AS kaniko

FROM node:18-alpine AS build-env

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

WORKDIR /app

RUN npm ci --omit=dev

FROM gcr.io/distroless/nodejs18-debian11

COPY --from=kaniko /kaniko/executor /kaniko/executor
COPY --from=kaniko /kaniko/docker-credential-ecr-login /kaniko/docker-credential-ecr-login
COPY --from=kaniko /etc/nsswitch.conf /etc/nsswitch.conf
COPY --from=kaniko /kaniko/.docker /kaniko/.docker

COPY --from=build-env /app/node_modules /app/node_modules

COPY ./build/*.js /app/

COPY fakefile *game.zip /files/
COPY ./dockerfiles /dockerfiles

ENV PATH $PATH:/usr/local/bin:/kaniko
ENV DOCKER_CONFIG /kaniko/.docker/

WORKDIR /app

CMD ["main.js"]

