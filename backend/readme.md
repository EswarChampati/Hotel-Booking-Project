# **Backend Build Process**

## 1. **Setup and Configuration**

- Create **`config/db.ts`** for database setup.
- Create **`config/server.ts`** for server setup, returning the `listen` method by taking `app` as an argument.
- Create **`app.ts`** for app-level configurations:
  - Middleware: `express.json()`, `cors()`, `express.urlencoded({ extended: true })`.
  - A basic `GET` route to check server status.
  - Export the `app` instance.
- In **`index.ts`**:
  - Import database setup from **`config/db.ts`**.
  - Import `startServer` function from **`config/server.ts`**.
  - Import `app` from **`app.ts`** and pass it to `startServer(app)`.
  - Load environment variables with `dotenv.config()`.
- Create **`.env`** and **`.env.sample`** files.

---

## 2. **Authentication - Register Route**

### 2.1 **Interfaces**

- Store all interfaces in **`interfaces`** (e.g., `IUser.ts` with `_id`, `email`, `firstName`, `lastName`, `password`).

### 2.2 **Models**

- Create a **`models`** folder with **`User.model.ts`**:
  - Define schema using the `Schema` generic type of `IUser`.
  - Hash password using `pre()` middleware.
  - Export the model.

### 2.3 **Controllers**

- Create **`controllers/v1/signup.controller.ts`**:
  - Validate request body fields.
  - Check if user exists, return error if true.
  - Otherwise, create a new user and generate a JWT token.

### 2.4 **JWT Configuration**

- Create **`config/jwt.config.ts`**:
  - Define `jwtConfig` interface and settings.
  - Implement `generateToken` and `verifyToken` functions.

### 2.5 **Validations**

- Create **`validations/v1/signUp.validator.ts`** using **Zod**.

### 2.6 **Middleware**

- Create **`middleware/validateUserSignUp.ts`** to validate request data.

### 2.7 **Routes**

- Create **`routes/v1/auth.ts`**:
  - Register route with `validateUserSignUp` middleware and `signup.controller.ts`.

### 2.8 **Constants**

- Create **`constants`**:
  - **`cookies.ts`**: Cookie settings.
  - **`errorMessage.ts`**: Error messages.
  - **`httpStatusCode.ts`**: HTTP status codes.
  - **`jwt.ts`**: JWT configurations.
  - **`routes.ts`**: API route definitions.

---

## 3. **Authentication - SignIn Route**

### 3.1 **Controllers**

- Create **`controllers/v1/signin.controller.ts`**:
  - Validate request body.
  - Check if user exists, validate password.
  - Generate JWT token and send it in a cookie.

### 3.2 **Validations**

- Create **`validations/v1/signIn.validator.ts`** using **Zod**.

### 3.3 **Middleware**

- Create **`middleware/validateUserSignIn.ts`**.

### 3.4 **Routes**

- Add `/signin` route in **`routes/v1/auth.ts`**.

### 3.5 **Constants**

- Add `SIGNIN` key in **`routes.ts`** under `USERS`.

### 3.6 **CORS Configuration**

- Update **`app.ts`** to allow frontend requests.

---

## 4. **Token Validation and Logout**

### 4.1 **Middleware**

- Create **`middleware/validateToken.ts`** to verify JWT tokens.

### 4.2 **Routes**

- Add `/logout` route in **`routes/v1/auth.ts`**.

### 4.3 **Enhancements**

- Modify sign-in response to include `firstName` and `lastName`.

---

## 5. **Testing**

### 5.1 **Setup**

- Install:
  - `mongodb-memory-server`, `vitest`, `supertest`, `@types/supertest`
- Create **`vitest.config.ts`** with `setupFiles`.
- Create **`tests/setup.ts`**.
- Create **`tests/config`** folder:
  - Functions: `connectDb`, `clearConnections`, `dropDb`.

### 5.2 **Unit Testing**

- **Models**: `UserModel`.
- **Validations**: `signIn`, `signUp` validation.
- **Middlewares**: `validateSignIn`, `validateSignUp`, `validateToken`.
- **Controllers**: `signup`, `signin`.

### 5.3 **Integration Testing**

- Create **`.env.test`** for JWT.
- Test `/register`, `/signin`, `/logout`, `/validate-token` routes.

### 5.4. **E2E testing**

- Create **`.env.e2e`** for end-to-end testing.
- Install `cross-env`.
- Modify `dotenv.config()` in `index.ts` based on scripts.

---
