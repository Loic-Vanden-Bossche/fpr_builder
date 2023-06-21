ARG EXECUTOR_IMAGE_NAME

FROM ${EXECUTOR_IMAGE_NAME}

COPY . /game

ENTRYPOINT ["/usr/local/bin/fpr-executor", "--exec-type", "python", "--debug", "--script-path", "/game/game.py", "--listener-timeout", "30000"]
