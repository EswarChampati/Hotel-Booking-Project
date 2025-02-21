# **End-to-End Testing Setup**

## first e2e testing

#### **1. Initial Setup**

- Create an `e2e-tests` folder.
- Install Playwright:
  ```sh
  npx playwright install
  ```
  Choose:
  - TypeScript
  - `tests` folder
  - No GitHub Actions
  - Provide the browsers
- Install the Playwright Test extension for VS Code.
- Remove the default code in `example.spec.ts`, rename it to `auth.spec.ts`, and delete the `tests-examples` folder.

#### **2. UI Test Setup**

- Create a `UI` folder inside `e2e-tests`.
- Inside `UI`, create:
  - `homepage.spec.ts` – Check if the home page is rendered properly.
  - `navigation.spec.ts` – Verify that navigation works correctly for all links.
- Insert a document into the MongoDB test database by copying data from the development database.
- Modify error messages for registration fields and the Sign-in page to ensure consistency for testing.

#### **3. Authentication Tests**

###### **Login Tests (`login.spec.ts`)**

- Verify successful login.
- Ensure login is not allowed when fields are empty.
- Check login failure with invalid credentials (wrong password).
- Test the password hide/show functionality.

###### **Logout Tests (`logout.spec.ts`)**

- Verify successful logout.

###### **Register Tests (`register.spec.ts`)**

- Ensure a user is created successfully.
- Prevent registration if any input field is empty.
- Prevent registration if passwords do not match.
