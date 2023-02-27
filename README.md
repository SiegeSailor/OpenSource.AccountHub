# Account Hub

Constructs endpoints for a sophisticated account database system within the OWASP SAMM framework.

## Prerequisites

See `engines` in [package.json](./package.json):

```json
"engines": {
    "node": ">= 16.0.0",
    "npm": ">= 8.0.0"
},
```

File structure:

```
├── images/
├── patches/
├── source/
│   ├── algorithms/
│   │   ├── baby-step-giant-step/
│   │   └── ...
│   ├── common/
│   │   ├── constants/
│   │   ├── utilities/
│   │   └── ...
│   ├── illustration/
│   │   ├── ElGamal.ts
│   │   └── ...
│   ├── types/
│   ├── command.ts
│   └── entry-point.ts
└── README.md
```

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

### Test

Formulas uses Jest for unit tests purpose. You can generate the coverage report:

```bash
npm run test -- --coverage
```

Or see the detail for each test case:

```bash
npm run test -- --verbose
```
