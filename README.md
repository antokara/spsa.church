# spsa.church

St. Peter & St. Andrew Coptic Orthodox Church website (https://spsa.church)

## development installation

### initialize cms

1. `$cd docker/strapi/src`
1. `$yarn install`
1. `$yarn build`

### update cms

1. `$cd docker/strapi/src`
1. `$yarn upgrade --latest`
1. `$yarn build`

### develop cms

add/modify docker/strapi/src files

### containers

#### for creation / startup of the containers

- `$sudo docker-compose -f docker/docker-compose.yml up`

#### for restart of the containers prior to cleanup

- `$sudo docker-compose -f docker/docker-compose.yml start db cms`

#### for shutdown / cleanup of the containers

- `$sudo docker-compose -f docker/docker-compose.yml down`

#### for pull of latest images

- `$sudo docker-compose -f docker/docker-compose.yml pull`

- open (http://localhost:1337/admin) in the browser

#### test db connection

`$psql -h localhost -p 5432 -U user -d strapi`
