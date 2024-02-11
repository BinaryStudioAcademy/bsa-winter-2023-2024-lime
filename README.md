# LIME

## ℹ️ General Info

This is the repository responsible for LIME apps.

## 🏭 Applications

-   [Backend](./backend) — LIME application backend.

    _To work properly, fill in the **`.env`** file. Use the **`.env.example`** file as an example._

-   [Frontend](./frontend) — LIME application frontend.

    _To work properly, fill in the **`.env`** file. Use the **`.env.example`** file as an example._

-   [Shared](./shared) — LIME application common modules for reuse.

## 🖍 Requirements

-   [NodeJS](https://nodejs.org/en/) (18.x.x);
-   [NPM](https://www.npmjs.com/) (10.x.x);
-   [PostgreSQL](https://www.postgresql.org/) (15.2)
-   run **`npx simple-git-hooks`** at the root of the project, before the start (it will set the [pre-commit hook](https://www.npmjs.com/package/simple-git-hooks) for any commits).

### 💽 DB Schema

Will be added soon

## 🏃‍♂️ Simple Start

1. Install packages: **`npm install`**
2. Fill ENVs
3. Install pre-commit hooks: **`npx simple-git-hooks`**
4. Run migrations: **`npm run migrate:dev -w backend`**
5. Run backend: **`npm run start:dev -w backend`**
6. Run fronend: **`npm run start:dev -w frontend`**

### 🌑 Backend

-   [Fastify](https://www.fastify.io/) — a backend framework.
-   [Knex](https://knexjs.org/) — a query builder.
-   [Objection](https://vincit.github.io/objection.js/) — an ORM.

### 🌕 Frontend

-   [Redux](https://redux.js.org/)
-   [Redux Toolkit](https://redux-toolkit.js.org/) — a state manager.
-   [Tailwind CSS](https://tailwindcss.com/) - a CSS framework

### 🥊 Code quality

-   [simple-git-hooks](https://www.npmjs.com/package/simple-git-hooks) — a tool that lets you easily manage git hooks.
-   [lint-staged](https://www.npmjs.com/package/lint-staged) — run linters on git staged files.
-   [dangerjs](https://danger.systems/js/) — automate common code review chores.
-   [commitlint](https://commitlint.js.org/) — helps your team adhere to a commit convention.
-   [editorconfig](https://editorconfig.org/) — helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.
-   [prettier](https://prettier.io/) — an opinionated code formatter.
-   [ls-lint](https://ls-lint.org/) — file and directory name linter.
-   [eslint](https://eslint.org/) — find problems in your JS code.
-   [stylelint](https://stylelint.io/) — find and fix problems in your CSS code.

#### 🏅 Pull Request flow

```
<project-prefix>-<issue-number>: <ticket-title>
```

##### Example

-   `LIME-5: Add auth`

#### 🌳 Branch flow

```
<type>/<project-prefix>-<issue-number>-<short-desc>
```

##### Types

-   task
-   fix

##### Examples

-   `task/LIME-5-add-clinician-dashboard`
-   `task/LIME-12-add-clinician-flow`
-   `fix/LIME-16-fix-clinician-flow`

#### 🗂 Commit flow

```
<project-prefix>-<issue-number>: <modifier> <description>
```

##### Modifiers

-   `+` (add)
-   `*` (edit)
-   `-` (remove)

##### Examples

-   `LIME-5: + title for dashboard`
-   `LIME-12: * dashboard title`
-   `LIME-16: - dashboard title`

## 📦 CI/CD

CI/CD implemented using [GitHub Actions](https://docs.github.com/en/actions)
