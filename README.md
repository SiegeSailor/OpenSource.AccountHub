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

See `engines` in [package.json](./package.json):

```json
"engines": {
    "node": ">= 16.0.0",
    "npm": ">= 8.0.0"
},
```

MySQL [8.0.32 macOS-arm64](https://dev.mysql.com/downloads/file/?id=516827) is valid to use.

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

## Properties

- Use `/account/freeze/:email` when there is a token leak
- `nobility` is set to 1 as default. Any advanced operation require `> 1` such as update other accounts

## Future Plan

Things will be completed after the first release:

1. Dockerize with Monorepo Structure
2. GitHub Actions CICD
3. Deploy to AWS
4. Connect to AWS Database
5. Use AWS Cloud Logging
6. Rewrite with TypeScript
7. Session and Cookie
8. XSS Prevention
9. Unit Testing with Jest
10. GitHub Issues Board
11. Git Flow
12. ESlint with Husky
13. Integration Test with Postman
