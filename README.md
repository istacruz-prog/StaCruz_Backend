# StaCruz Backend

NestJS REST API backed by MySQL and TypeORM. Requests and responses use JSON.

## Run locally

1. Install dependencies:

   ```sh
   npm install
   ```

2. Create a **separate development database** in MySQL:

   ```sql
   CREATE DATABASE barberdb_dev CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

3. Copy `.env.example` to `.env` and set `DB_HOST`, `DB_PORT`, `DB_USER`, and
   `DB_PASSWORD` to match your local MySQL server. Set
   `DB_NAME=barberdb_dev` and `DB_SYNCHRONIZE=true` for local development.

   With synchronization enabled, TypeORM creates the tables from the entities
   when the app starts. Only use this with a disposable development database;
   keep `DB_SYNCHRONIZE=false` in production and manage its schema with
   migrations.

4. Start the API:

   ```sh
   npm run start:dev
   ```

   The default address is `http://localhost:3000`. The root health check is
   `GET http://localhost:3000/`. If the port is occupied, stop the other server
   or change `PORT` in `.env`.

## Use with Postman

Set the request header `Content-Type: application/json` for requests with a
body. Start with `GET http://localhost:3000/clients` to verify the database
connection and tables. A successful list request returns JSON, usually `[]`
for an empty table.

Example requests:

| Method | URL | JSON body |
| --- | --- | --- |
| `POST` | `/clients` | `{"client_code":"C001","first_name":"Alex","last_name":"Rivera","phone_number":"555-0100"}` |
| `GET` | `/clients` | — |
| `GET` | `/clients/1` | — |
| `PUT` | `/clients/1` | `{"phone_number":"555-0101"}` |
| `DELETE` | `/clients/1` | — |

All resource routes:

| Resource | Routes |
| --- | --- |
| Users | `GET, POST /users`; `GET, PATCH, DELETE /users/:id` |
| Barbers | `GET, POST /barbers`; `GET, PUT, DELETE /barbers/:id` |
| Services | `GET, POST /services`; `GET, PUT, DELETE /services/:id` |
| Clients | `GET, POST /clients`; `GET, PUT, DELETE /clients/:id` |
| Appointments | `GET, POST /appointments`; `GET, PUT, DELETE /appointments/:id` |
| Payments | `GET, POST /payments`; `GET, PUT, DELETE /payments/:id` |

The `:id` value is the numeric primary key returned when an item is created.
Missing records return `404 Not Found`. The API does not create MySQL itself:
the database must exist and the configured MySQL account must have permission
to create tables when `DB_SYNCHRONIZE=true`.

If a request fails with `Unknown column` or `Table doesn't exist`, the selected
database does not match these entities. Point `.env` at a fresh development
database such as `barberdb_dev`, then restart the server; do not enable schema
synchronization against a database containing unrelated or production data.

Build and run the compiled app with:

```sh
npm run build
npm run start:prod
```
