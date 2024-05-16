# Auto Debit web

### Prerequisites
Nodejs `v18.0.0` or newer

### Development with Docker compose

Start docker compose
```
docker compose up -d
```

Exec inside docker

```
docker compose exec nuxt3-debit sh

# install package
yarn install

# start local server
yarn dev
```

Down docker compose
```
docker compose down
```