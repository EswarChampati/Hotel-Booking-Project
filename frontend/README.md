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
