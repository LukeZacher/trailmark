# TrailMark

A job application tracker. Angular 22 frontend, .NET 10 API, SQL Server, with cookie-based authentication via ASP.NET Core Identity.

## Repository layout

| Path    | Contents                                                               |
| ------- | ---------------------------------------------------------------------- |
| `api/`  | .NET 10 backend: Domain, Infrastructure, and Api projects              |
| `web/`  | Angular 22 frontend                                                    |
| `docs/` | Project documentation, including the [decision log](docs/decisions.md) |

## Prerequisites

| Tool       | Version                 | Pinned in                         |
| ---------- | ----------------------- | --------------------------------- |
| .NET SDK   | 10.0.302                | `api/global.json`                 |
| Node.js    | 24.21.0                 | `web/.node-version`, `web/.nvmrc` |
| SQL Server | Express, local instance | —                                 |

A Node version manager such as [fnm](https://github.com/Schniz/fnm) or [nvm](https://github.com/nvm-sh/nvm) is recommended. Both read the version files and switch automatically.

## Backend setup

Run all of these from `api/`.

1. **Restore .NET tools.** Installs the pinned `dotnet-ef` version from `dotnet-tools.json`.

   ```
   dotnet tool restore
   ```

2. **Trust the development HTTPS certificate.** Required once per machine. The API serves HTTPS only.

   ```
   dotnet dev-certs https --trust
   ```

3. **Set the database connection string.** It lives in user secrets rather than the repository, because it differs from machine to machine.

   ```
   dotnet user-secrets set "ConnectionStrings:TrailMarkDb" "<connection string>" --project TrailMark.Api
   ```

   A typical local connection string:

   ```
   Server=localhost\SQLEXPRESS;Database=TrailMark;Trusted_Connection=True;TrustServerCertificate=True
   ```

   The instance name (`SQLEXPRESS` above) depends on how SQL Server was installed. Check SQL Server Configuration Manager or SSMS if unsure. `TrustServerCertificate=True` is for local development only and must never reach production.

4. **Create the database.**

   ```
   dotnet ef database update --project TrailMark.Infrastructure --startup-project TrailMark.Api
   ```

5. **Run the API.**

   ```
   dotnet run --project TrailMark.Api
   ```

   It listens on `https://localhost:7123` only. There is no HTTP endpoint.

## Frontend setup

Run these from `web/`.

1. **Install dependencies** exactly as locked in `package-lock.json`:

   ```
   npm ci
   ```

2. **Start the dev server:**

   ```
   npm start
   ```

   Then open http://localhost:4200.

## Running locally

Both servers must be running. The Angular dev server proxies every request under `/api` to the API (configured in `web/proxy.conf.json`), so the browser only ever talks to `localhost:4200`. That keeps development same-origin: no CORS configuration is needed, and the auth cookie behaves as it will in production.

## Frontend scripts

| Command          | Purpose                             |
| ---------------- | ----------------------------------- |
| `npm start`      | Dev server with live reload         |
| `npm run build`  | Production build                    |
| `npm test`       | Unit tests                          |
| `npm run lint`   | ESLint with Angular rules           |
| `npm run format` | Prettier, including import ordering |

## Decisions

[`docs/decisions.md`](docs/decisions.md) records why the project is built the way it is: conventions, trade-offs, and open questions. Read it before changing auth, data access, or API conventions.
