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

Also, be sure to have Docker `>= 4` installed. If you were to use your local database, MySQL [8.0.32 macOS-arm64](https://dev.mysql.com/downloads/file/?id=516827) is valid to use.

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

## Security

The following is the security document list:

- Proposing the security requirement analysis based on [OWASP SAMM 2.0](https://owasp.org/www-project-samm/) with maturity level 1 in general using OWASP SAMM Toolbox
- Performing threat modeling analysis using [OWASP Threat Modeling](https://owasp.org/www-community/Threat_Modeling) document
- Demonstrating attack surface analysis with [OWASP Attack Surface Analysis Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Attack_Surface_Analysis_Cheat_Sheet.html). Tool and method remain undecided
- Implementing changes regard to identified security requirements from 1 to 3

The following list should be a part of CICD or be automated in some aspects:

- Using SonarQube and ESLint for static code analysis (SAST) on security and code quality aspects
- Using one or more tool from [OWASP Vulnerability Scanning Tool](https://owasp.org/www-community/Vulnerability_Scanning_Tools) for dynamic code analysis (DAST)
- Updating the test cycle and flow for unit testing, integration testing, and penetration testing
- Running tests and document possible attacks that can exploit the security vulnerabilities in the system
- Repeating the process from 1 to 4 until the security requirement analysis is satisfied. Some unknown attacks may remain unresolved for research purpose

## Future Plan

Things will be completed before the first release:

1. GitHub Actions CICD
2. Deploy to AWS ECS
3. Connect to AWS Database
4. Use AWS Cloud Logging
5. Unit Testing with Jest
6. GitHub Issues Board
7. Git Flow
8. ESlint with Husky
9. Integration Test with Postman
