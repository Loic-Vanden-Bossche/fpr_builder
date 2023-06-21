FROM gcr.io/kaniko-project/executor AS kaniko

FROM node:18.16.0-alpine3.18

RUN apk --update add \
  bash \
  curl \
  git \
  jq \
  npm \
  unzip

COPY --from=kaniko /kaniko/executor /kaniko/executor
COPY --from=kaniko /kaniko/docker-credential-ecr-login /kaniko/docker-credential-ecr-login
COPY --from=kaniko /etc/nsswitch.conf /etc/nsswitch.conf
COPY --from=kaniko /kaniko/.docker /kaniko/.docker

COPY ./build/*.js /app/
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

COPY *game.zip /game
COPY ./dockerfiles /dockerfiles

ENV PATH $PATH:/usr/local/bin:/kaniko
ENV DOCKER_CONFIG /kaniko/.docker/

WORKDIR /app

RUN npm ci --production

ENTRYPOINT ["node", "main.js"]

