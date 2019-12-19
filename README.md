# spsa.church

St. Peter & St. Andrew Coptic Orthodox Church website (https://spsa.church)

## development installation

### on Fedora 31

- `$sudo dnf install podman podman-compose -y`
- `$npm install`
- `$npm start`
- `$npm run podman:compose-up`
  - for subsequent runs:
  - `$rpm run podman:compose-start`
- open (http://localhost:1337/admin) in the browser
