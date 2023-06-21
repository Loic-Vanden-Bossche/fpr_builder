# FPR game builder

## Description
This program is meant to be used in a ECS container to build a game.

## Usage

### Build
```
npm run build
```

### Run
```
docker-compose up --build
```

### Local development

Place the file zip in the folder ./files/game.zip
Place env vars in the file .env, it will be used in the docker-compose.yml file.

```
npm run build && docker-compose up --build
```
