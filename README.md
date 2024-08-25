# TODO App Client

## TechStacks

- Language & Library: React + TypeScript + Vite
- Linting: Prettier & Eslint
- Unit Test: Vitest
- E2E Test: Cypress
- CSS Libraries: ANT Design and TailwindCSS

## Setup

- Install Node with version v20.13.1 or higher
- Go to GIT repo [todo-react](https://github.com/baralmanish/todo-react)
- Clone the repo

```bash
git clone git@github.com:baralmanish/todo-react.git
```

- Install node packages

```bash
npm install
```

- Run application

```bash
npm run dev
```

## Tests

- Run Unit Test

```bash
npm run test
```

- Run E2E Test HeadLess `NOTE: You should run application before running test`

```bash
npm run test:e2e
```

- Run E2E Test in Browser `NOTE: You should run application before running test`

```bash
npm run cy:open
```

## Useful Commands

- Build application

```bash
npm run build
```

- Preview Build application

```bash
npm run preview
```

- Run unit tests

```bash
npm run test
```

- Prettier Check

```bash
npm run prettier:check
```

- Prettier Fix

```bash
npm run prettier:write
```

- Lint Check

```bash
npm run lint:check
```

- Lint Fix

```bash
npm run lint:fix
```

- Setup Husky

```bash
npm run prepare
```

## ENV Variables

```
VITE_APP_NAME="TODO - Track Management"
VITE_APP_URL=http://localhost:3000
VITE_API_URL=http://localhost:3001
```
