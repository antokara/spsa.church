# spsa.church

St. Peter & St. Andrew Coptic Orthodox Church website (https://spsa.church)

## containers

### local dev

#### installation

Initialize the Database with an admin account
`$sudo docker-compose -f containers/compose.develop.yml run directus install --email antokarag@gmail.com --password password`

#### run

`$sudo docker-compose -f containers/compose.develop.yml up`

#### db migrations

`$npx knex --knexfile containers/mysql/knex/knexfile.js migrate:up`

### production
