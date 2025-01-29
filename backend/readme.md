# Backend Build Process

## 1. Setup and Configuration

- Create **`config/db.ts`** for database setup.
- Create **`config/server.ts`** for server setup (a _function_ that returns the `listen` method by taking `app` as the argument).
- Create **`app.ts`** file in the root directory which contains all the app-level things such as `express.json()`, `cors()`, `express.urlencoded({ extended: true })`, and defines a basic `GET` route to check if the server is up or not. Export the `app` instance.
- In **`index.ts`**:
  - Import the database function from **`config/db.ts`**.
  - Import the `startServer` function from **`config/server.ts`**.
  - Import `app` from **`app.ts`** and pass it to `startServer(app)`.
  - Also, set `dotenv.config()` in **`index.ts`**.
- Create **`.env`** and **`.env.sample`** files.

---

## 2. Register Route Creation

### 2.1 Interfaces

- Store all interface-related files in the **`interfaces`** folder. Each file starts with "I", e.g., **`IUser.ts`**.
  - Example fields for `IUser`: `_id`, `email`, `firstName`, `lastName`, and `password`.

### 2.2 Models

- Create a **`models`** folder and add **`User.model.ts`**:
  - Define the schema using the `Schema` generic type of `IUser`.
  - Use the `pre()` middleware to hash the password before saving the document.
  - Create and export the model using the schema and `model()`.

### 2.3 Controllers

- Create a **`controllers/v1`** folder:
  - Add **`signup.controller.ts`**:
    - Import `IUser` and pick fields such as `email`, `firstName`, `lastName`, and `password`.
    - Define a new interface for the request body.
    - Check if the user already exists. If yes, return a response with an error message.
    - If the user does not exist, create the user in the database, generate a JWT token with the user's `_id`, and send it via a cookie.

### 2.4 JWT Configuration

- Create **`jwt.config.ts`** under the **`config`** folder:
  - Create the `jwtconfig` interface containing properties like `secretKey` and `expireIn`.
  - Create the object `jwtConfig` using the interface defined earlier.
  - Create the `generateToken` function that takes `payload` as an object and `options` of type `SignOptions`, and returns the JWT token created via `jwt.sign()` of type `string`.
  - Create the `verifyToken` function that takes a `token` of type `string` and `options` of type `VerifyOptions`, and returns the result of `jwt.verify()`, which is of type `string` or `JwtPayload`.

### 2.5 Validations

- Create a **`validations/v1`** folder and add **`signUp.validator.ts`**:
  - Return the `signUpSchema` created using _Zod_.

### 2.6 Middleware

- Create a **`middleware`** folder and add **`validateUserSignUp.ts`**:
  - This middleware will check the data passed from the user at runtime.

### 2.7 Routes

- Create a **`routes/v1`** folder and add **`auth.ts`**:
  - This file will hold all the user routes.
  - Mount the **`validateUserSignUp.ts`** middleware along with the **`signup.controller.ts`** controller under the `/register` route.
- Mount the user router to **`app.ts`** using `app.use()`.

### 2.8 Constants

- Create a **`constants`** folder containing the following files:
  - **`cookies.ts`**: Contains the `COOKIE_SETTINGS` object, which holds multiple cookie types. For example, create the `authCookie` object which contains properties like `name`, `maxAge`, `httpOnly`, and `secure`.
  - **`errorMessage.ts`**: Holds various error messages such as "User already exists" or "User does not exist."
  - **`httpStatusCode.ts`**: Contains the HTTP status codes.
  - **`jwt.ts`**: Contains two objects:
    - `JWT_ERROR_MESSAGE`: Holds error messages like "Invalid Key."
    - `JWT_CONSTANT`: Contains the `SECRET_KEY` for JWT and `DEFAULT_EXPIRATION`.
  - **`routes.ts`**: Contains the `ROUTES` object, which in turn contains the `API` object, followed by `V1` and `USERS` objects with keys such as `BASE` and `REGISTER`.

---

## 3. SignIn Route Creation

### 3.1 controllers/v1

- Create the **`signin.controller.ts`** for the signin route handler.
- Import the _User_ interface and pick the _email_ and _password_ from the request body.
- Check whether the user is found with the _email_ in **`req.body`**. If not found, return a 401 error.
- Check whether the _password_ matches. If not matched, return a 401 status code.
- Create a cookie and send that cookie as the response along with a 200 status code.

### 3.2 validations/v1

- Create the **`signin.validator.ts`** for validating the _email_ and _password_ using Zod schema.
- Ensure the _password_ is a minimum of 8 characters and a maximum of 16 characters.

### 3.3 constants/

- In **`errormessages.ts`**, add two constants for the minimum and maximum character limits for the _password_.

### 3.4 middlewares

- Create the **`validateUserSignIn.ts`** middleware to check if the **`req.body`** contains both the _email_ and _password_.
- If either is missing, return a 400 status code.

### 3.5 routes/v1

- Create a POST request for the **`/signin`** route.
- Attach the **`validateUserSignIn.ts`** middleware and the **`signin.controller.ts`** handler.

### 3.6 constants/routes

- In the **`ROUTES`** object, for the _users_ key, add the **`SIGNIN`** key with the value **`/signin`**.

### 3.7 app.ts

- add the cors options to the **`app.ts`** in the backend to allow the request from the frontend to the backend.

---

##

### validate route

- modified the users.ts in routes to auth.ts routes casue register and login comes under the authentication.
- created the validateToken.ts file in middlewareto validate the token.
- installed the cookie-parser and its types to easily access the cookie from body instead of from the req.headers.

### logout route

- add the logout in the constants folder under routes.
- create the logout post request in the auth.ts of the routes folder.
