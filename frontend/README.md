# **Frontend Build Process**

### 1. **Initial Setup**:

- Create frontend folder using the **`npm create vite@latest`**.
- Remove the **`app.css`** file and remove the content in the **`index.css`** and configure **Tailwind** for the project.
- Set up **Framer Motion**.
- Create the **`components`**, **`layouts`**, **`pages`** folder in the **`src`**.
- Install **`react-router-dom`** and types of **`react-router-dom`**.
- Install **`framer-motion`** to our application.
- Create the **`Header`** component with the **`SignIn`** and **`Register`** buttons using the **`AnimateButton`** component.
- Create the **`AnimateButton`** component which takes **`signin`**, **`register`** as children and routes them. Also, do the **prop validation**.
- Create the **`ToggleTheme`** by adding the two **SVGs** in the **`assets`** and implement **dark mode**.
- Create the custom hook **`useTheme`** (with return type) which creates dark mode and also adds the dark class in **`tailwind.config`** and store the theme in **local storage** for persistence. It should return **`isDarkMode`** and **`themeChangeHandler`**.
- Create the **`Footer`** Component using **Framer Motion** **staggerChildren**.
- Create the **`Layout`** folder and create the **`userLayout`** component which takes the children to add between the **`Header`** and **`Footer`** components.
- Configure the **Layout Component** in the **`App.tsx`** file.
- Create the common classes for dark mode in the **`index.css`** file.

---

### 2. **Register Component Setup**:

- Create the **`register.tsx`** file in the **`pages`**. Configure the **register** component to the **`/register`** route in the **`Header.tsx`** and also in **`App.tsx`**.
- Install **`react-hook-form`** and develop the form.
- To reduce the size of the **register** component in the pages, divide it into multiple components like **`inputField.tsx`** and **`passwordField.tsx`**, which handle input fields and the password field. Do **prop validation** using **`TypeScript`**.
- Create the **`Wrapper`** component in the **`App.tsx`** because that component is specific to the routes in **`App`**. It is used for smoother transitions between pages.
- Create the **`types`** folder and in it, create the **`user.d.ts`** file which declares the type **`registerFormData`** for the **`useForm`** hook in the **Register.ts** component.
- Create the **`apiClient.ts`** in the **`src`** which sends the request to the backend. This is the command for every backend request.
- Create the **`services`** folder and in it, create the **`userService.ts`** which sends requests to the auth route in the backend. **`userService.ts`** contains the **`createUser`** function, which is responsible for calling the register route via **`apiClient.ts`** file.
- Create the **`animations`** folder and store variants for each component like **`delayChild.Variants.ts`** and import them in **Register.tsx** and **Footer.tsx**. Similarly for **`fadeTopBottom.variants.ts`**.

- Install the **`react-query`** library. Wrap the app with the **`QueryClientProvider`** with the **`client`** as a prop.
- Use the **`useMutation`** function that takes the **`createUser`** function as an argument, which is inside the **`userService`** file.

---

### 3. **Redux Setup**:

- Install the **`react-redux`** and **`redux toolkit`** and also the **`react-redux`** types.
- Create the **`store`** folder which contains all the redux store contents.
- Create the **`slice`** folder which contains all the slices of the redux store. Create the **`toastSlice.ts`** file which is used to create the slice with **`message`**, **`visible`**, and **`type`**.
- Create the **`rootReducer.ts`** file in the store which is used to create the root reducer by combining all the reducers from their respective slices.
- Create the **`index.ts`** file in the store which is used to create the store by taking the **`rootReducer`** and export that store along with the return type of the type of **`store.getState`** (to mention the type of state inside the **`useSelector`**) and also return the type of **`store.dispatch`** to use the **`useDispatch`** function.
- Provide the store to the app by wrapping it in the **`main.tsx`**.
- Create the **Toast.tsx** component which renders the message for 5 seconds. After that, a **setTimeout** callback is executed, which dispatches the action so that **`visible`** will be **`false`** and **Toast.tsx** will return **null**. **`useEffect`** is used to check whether the **Toast** Component should render anything based on the **`visible`** state.
- Render the **Toast** component in the **`main.tsx`**.

---

### 4. validate route for token authentication

- Rename **`userServices`** to **`authServices`**, as the file handles authentication-related operations.
- Create **`authSlice.ts`** in the **`slices`** folder for authentication and include it in **`rootReducer.ts`**.
- Add a **`validToken`** function in **`authServices.ts`**, which validates the token via an API call.
- Create a custom hook to call **`validToken`**. Use **`useEffect`** to initiate the request and dispatch the result.
- Call the custom hook in **`App.tsx`**.
- Dispatch an action in the **onSuccess** callback of **`useMutation`** to hide the **register** and **login** options when a user is created.

---

### 5. Signin component, logout, adding the events for navigating the pages

- Create the signIn componnet in pages using the useForm hook and route in app.ts
- In auth service create the login function which is used to call the backend Signin route.
- Update the props of the animatedButton to have the onClick handler.
- Create the lagout in the services/authServices.ts file and handle the data in api-client.ts with the empty object.
- Create the useLagout customHook in the hooks folder that returns the onClick handle for that AnimatedButton.
- Add the autFoucs prop to the InputField which is used to autofoucs email feild in the Signin.tsx and firstname in the Register.tsx
- Created the useAuthMutation custom hook in the hooks which return the mutation function which is returned by the useMutation().
- Installed the react-icons and change the toggleTheme.tsx component and also implemented the password shown ability.
- Modified the authSlice that when login we need to pass the userName also and similarly modify the dispatch in useAuthDispatch() and create the key userName in the localStorage and add the userName.
-

### **6. Testing Setup**:

- Install **`vitest`**, **`@testing-library/react`**, **`@testing-library/jest-dom`**, **`jsdom`**.
- Configure `vitest.config.ts` to use **Istanbul** for test coverage.
- Create `__tests__/` in `src/`:
  - **unit/** (Unit tests)
  - **integration/** (Integration tests)
  - **setup.ts** (Runs before each test suite, configured in `vitest.config.ts`).

#### **Unit Testing**:

##### **Component Testing**:

- `AnimatedButton`
- `Footer`
- `ToggleTheme.tsx` (added `data-testid`)
- `InputField`
- `PasswordField`
- `Header`
- `Toast` (added `data-testid`)

##### **Redux Testing**:

- `authSlice`
- `toastSlice`

#### **Services Testing**:

- `authServices.ts` (fully tested)

##### **Hooks Testing**:

- `useLogout`
- `useTheme` (modified to sync theme across tabs using `eventListener`)
- `useAuthMutation`
- `useValidToken`

##### **Layouts Testing**:

- `UserLayout`

#### **Integration Testing**:

- `Register.tsx`
- `SignIn.tsx`

## 6.deployments

#### **6.1. Build Command Verification**

- Ensure the `package.json` contains the correct build command for the project.

#### **6.2. Exclude Tests from Build**

- Create `tsconfig.build.json` and configure it to:
  - Extend `tsconfig.json`
  - Exclude the `tests` folder
- Update the `package.json` build script to use `tsconfig.build.json`.

#### **6.3. Backend Base URL Configuration**

- Modify `api-client.ts`:
  - Set the backend base URL as an empty string (`""`) since both the frontend and backend will be served from the same URL.

#### **6.4. Rebuild Frontend**

- Since `api-client.ts` has been modified, rebuild the frontend using:
  ```sh
  npm run build
  ```
