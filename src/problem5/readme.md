# User Management Demo

This is a simple demo application built with TypeScript, Express, and lowdb. It provides basic CRUD functionality for managing users through a RESTful API.

## Installation

To install the dependencies, run the following command:

```bash
npm install
````

## Running the application

To start the application, run the following command:

```bash
npx tsx src/cli/cli.ts
```

You can use the `-h` or `--help` flag to display the help message and see available options:

```bash
npx tsx src/cli/cli.ts -h
```

## Note

* This is a quick demo version, so there is no authentication, and it has not been optimized for production.
* There is no response mapper in this demo.
* The codebase is kept simple and is not following any specific enterprise patterns like DDD (Domain-Driven Design), etc.
* You can use **Postman** or any HTTP client to test the API.

## API Endpoints (Demo)

### 1. **GET** `/api/users`

This endpoint returns a list of all current users. You can pass the following query parameters:

* **offset**: (number) The number of items to skip (default is 0).
* **size**: (number) The number of items to retrieve (default is 10).

Example request:

```http
GET /api/users?offset=0&size=10
```

### 2. **GET** `/api/users/:id`

This endpoint retrieves the details of a specific user by their **ID**.

Example request:

```http
GET /api/users/1
```

### 3. **DELETE** `/api/users/:id`

This endpoint deletes a specific user by their **ID**.

Example request:

```http
DELETE /api/users/1
```

### 4. **POST** `/api/users`

This endpoint creates a new user. You must send a JSON body with the following structure:

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

**Note**: To comply with REST API standards, you **must** set the `Content-Type` header to `application/json`. The server will reject the request if this header is missing or incorrect.

Example request:

```http
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

### 5. **PUT** `/api/users/:id`

This endpoint updates an existing user by their **ID**. You can update the following fields:

* **name**: (string) The name of the user.
* **email**: (string) The email of the user.

**Note**: The `Content-Type` header must be set to `application/json`.

Example request:

```http
PUT /api/users/1
Content-Type: application/json

{
  "name": "John Doe Updated",
  "email": "john.doe.updated@example.com"
}
```

## Development Notes

### Express handle
* Because express router does not handle async/await function with global error, so to handle async function error, we should have to patch express routers.
* If not patched, nodejs process will crash if function throws error
* Because this is basic example (code only), so it has not been patched
* Currently I am using try catch on each controller to catch errors instead, to avoid nodejs crash
