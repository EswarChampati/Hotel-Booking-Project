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
