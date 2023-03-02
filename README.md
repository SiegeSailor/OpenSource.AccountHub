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

### Environment

Create a `.env` file in root:

```
MYSQL_HOST=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DATABASE=
MYSQL_CONNECTION_LIMIT=
JWT_SECRET_KEY=
PRIVILEGED_EMAILS=
PORT=
```

### Endpoints

The followings are valid endpoints:

- Use `/account/freeze/:email` when there is a token leak. Ask others to use `/account/defrost/:email` to defrost
- `nobility` is set to 1 as default. Any advanced operation require `> 1` such as update other accounts

| Method | Endpoint                     | Description                                                    | Protection                          |
| ------ | ---------------------------- | -------------------------------------------------------------- | ----------------------------------- |
| GET    | /                            | Health check.                                                  |                                     |
| GET    | /account?limit=&page=        | List all accounts with pagination and insensitive information. | Token.                              |
| POST   | /account/register            | Create an account.                                             |                                     |
| POST   | /account/login               | Obtain a token with username and passcode.                     |                                     |
| POST   | /account/cancel              | Cancel an account. This is irreversible.                       | Token. Only the owner.              |
| GET    | /account/profile/:email      | Obtain the account information for the desired email.          | Token. Nobility `> 1` or ownership. |
| PATCH  | /account/profile/:email      | Update the account information for the desired email.          | Token. Nobility `> 1` or ownership. |
| POST   | /account/freeze/:email       | Freeze an account.                                             | Token. Nobility `> 1` or ownership. |
| POST   | /account/defrost/:email      | Defrost an account.                                            | Token. Nobility `> 1`.              |
| GET    | /history/:email?limit=&page= | List all history for the desired email with pagination.        | Token.                              |

### Test Flow

The following step may be used for integration test:

1. Register 2 accounts. Let's say there are `A` and `B`, and `A` is in `PRIVILEGED_EMAILS`.
2. Login with the `A`, the system-privileged account
3. Update `B` with nobility `2`
4. Login with `B`
5. See profiles
6. Freeze `B` self
7. Use `A` to defrost
8. Login with `A`
9. Cancel `A`
10. Login with `B`
11. See all history
12. See all accounts

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
