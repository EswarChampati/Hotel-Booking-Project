# Frontend build process

1.  - Create frontend folder using the npm create vite@latest.
    - Remove the app.css file and remove the content in the index.css and config the tailwind for the project.
    - Set up the framer motion.
    - Create the components,layouts,pages folder in the src.
    - Install the react-router-dom and types of react-router-dom.
    - Install the framer-motion to our application.
    - Create the Header component with the SignIn and register buton using the AnimateBUtton component.
    - Create the AnimateButtom component which takes the signin, register as children and to which are the route, do the prop validation also.
    - Create the ToggleTheme by adding the two SVGs in the assests and implement the dark mode.
    - Create the custom Hook useTheme (for which return type is necessary) which creates the dark mode and also try to add the dark class in the tailwind.config and store the theme in the local storage for persistence and return the isDarkMode and also themeChangeHandler.
    - Create the footer Component using the framer motion staggerChildren.
    - Create the Layout folder and create the userLayout component which takes the children to add in between header and footer component.
    - Configure the Layout Component in the App.tsx file.
    - create the common classes in for dark mode in the index.css file.

2.  - create the register.tsx file in the pages. configure the register component to the /register route in the Header.tsx and also app.tsx
    - install the react hook form and develop the form.
    - to reduce the side of the register component in the pages divide it into the multiple components like inputFeild.tsx and passwordFeild.tsx which is for the inputs feilds and the password field. Do the prop validation using the typescript.
    - create the wrapepr component in the App.ts becasue that component is specifc to that routes in app so place it there itslef. it is used for the smother transitions between the pages.
    - create the types folder and in the create the user.d.ts file which is the declarative type which export the registerFormData type for the useForm hook in the Register.ts component.
    - create the apiClient.ts in the src which sends the request to the backend. it is command for every backend request.
    - create the services folder and in the create the userService.ts which sends to the request to the user route in the backend. userService.ts contains the createUser function which is response for calling the register route via api-client.ts file.
    - created the animations folder in that storing the variants for each component. delayChild.Variants.ts file import in the Register.tsx and footer.tsx similarly for the fadeTopButtom.variants.ts

- install the react query library. wrap the app with the queryClientProvider with props as client.
