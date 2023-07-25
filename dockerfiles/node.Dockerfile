ARG EXECUTOR_IMAGE_NAME

FROM ${EXECUTOR_IMAGE_NAME}

COPY . /game

ENTRYPOINT ["/usr/local/bin/fpr-executor", "--exec-type", "node", "--debug", "--script-path", "/game/game.js", "--listener-timeout", "30000"]
