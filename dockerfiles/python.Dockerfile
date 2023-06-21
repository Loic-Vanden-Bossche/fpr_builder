ARG EXECUTOR_IMAGE_NAME=latest

FROM ${EXECUTOR_IMAGE_NAME}:latest

COPY . /game/game.py

ENTRYPOINT ["/usr/local/bin/fpr-executor", "--exec-type", "python", "--debug", "--script-path", "/game/game.py", "--listener-timeout", "30000"]
