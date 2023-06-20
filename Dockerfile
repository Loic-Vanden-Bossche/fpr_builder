FROM gcr.io/kaniko-project/executor AS kaniko

FROM node:18.16.0-alpine3.18

RUN apk --update add \
  bash \
  curl \
  git \
  jq \
  npm
RUN curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.21.4/bin/linux/amd64/kubectl
RUN chmod u+x kubectl && mv kubectl /bin/kubectl

COPY --from=kaniko /kaniko/executor /kaniko/executor
COPY --from=kaniko /kaniko/docker-credential-gcr /kaniko/docker-credential-gcr
COPY --from=kaniko /kaniko/docker-credential-ecr-login /kaniko/docker-credential-ecr-login
COPY --from=kaniko /etc/nsswitch.conf /etc/nsswitch.conf
COPY --from=kaniko /kaniko/.docker /kaniko/.docker

COPY ./build/app.js /app/app.js
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

COPY ./files /game

ENV PATH $PATH:/usr/local/bin:/kaniko
ENV DOCKER_CONFIG /kaniko/.docker/
ENV DOCKER_CREDENTIAL_GCR_CONFIG /kaniko/.config/gcloud/docker_credential_gcr_config.json

WORKDIR /app

RUN npm ci --production

ENTRYPOINT ["node", "app.js"]

