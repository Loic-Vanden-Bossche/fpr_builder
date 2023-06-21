#FROM fpr-executor-python:latest
#
#COPY . /game/game.py
#
#ENTRYPOINT ["/usr/local/bin/fpr-executor", "--exec-type", "python", "--debug", "--script-path", "/game/game.py", "--listener-timeout", "30000"]

FROM alpine:3.14.2
