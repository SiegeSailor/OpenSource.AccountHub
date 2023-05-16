# Account Hub

Constructs endpoints for a sophisticated account database system within the OWASP SAMM framework. File structure:

```
├── source/
│   ├── configuration/
│   ├── controller/
│   ├── middleware/
│   ├── model/
│   ├── route/
│   └── entry-point.js
├── ...
└── README.md
```

## Prerequisites

See `engines` in [package.json](./terminal/package.json):

```json
"engines": {
    "node": ">= 16.0.0",
    "npm": ">= 8.0.0"
},
```

Also, be sure to have Docker `>= 4` installed. If you were to use your local database, MySQL [8.0.32 macOS-arm64](https://dev.mysql.com/downloads/file/?id=516827) is valid to use for MacBook with M1 Chip.

## Get Started

Use the following commands to help you to run or develop this project locally:

```bash
git clone https://github.com/SiegeSailor/OpenSource.AccountHub.git
```

Go to the folder you just created with `git clone`. It should be typically named `OpenSource.AccountHub`:

```bash
cd OpenSource.AccountHub
```

Install all the packages you need. Remember that you have to run this under `node >= 16.0.0` and `npm >= 8.0.0`. You can simply use `nvm use 16` if you have multiple versions on your local machine:

```bash
npm install
```

After installing packages, run the following command to start the project:

```bash
npm run start
```

### Environment

Create a `.env` file in the root folder:

```bash
DATABASE_HOST= # database
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_CONNECTION_LIMIT=
DATABASE_SKIP_TZINFO= # 1 | 0
DATABASE_PORT=
SESSION_HOST= # session
SESSION_PORT=
SECRET= #
HTTPS= # 1 | 0
SERVICE_PORT=
ORIGIN=
```
