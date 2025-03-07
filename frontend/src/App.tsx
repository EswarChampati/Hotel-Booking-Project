import "./App.css";
import UserLayout from "./layouts/UserLayout";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Register from "./pages/Register";
import { AnimatePresence, motion, Variants } from "framer-motion";
import useValidToken from "./hooks/useValidToken";
import SignIn from "./pages/Signin";
import AddHotel from "./pages/AddHotel";
import { useSelector } from "react-redux";
import { RootState } from "./store";

const pageVariants: Variants = {
  initial: { x: "100%", opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeInOut" },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: { duration: 0.7, ease: "easeInOut" },
  },
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    style={{ position: "absolute", width: "100%" }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();
  useValidToken();
  const isAutheticated = useSelector((state: RootState) => {
    return state.auth.isAuthenticated;
  });

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <UserLayout>Home</UserLayout>
            </PageWrapper>
          }
        />
        {!isAutheticated ? (
          <>
            <Route
              path="/register"
              element={
                <PageWrapper>
                  <UserLayout>
                    <Register />
                  </UserLayout>
                </PageWrapper>
              }
            />
            <Route
              path="/login"
              element={
                <PageWrapper>
                  <UserLayout>
                    <SignIn />
                  </UserLayout>
                </PageWrapper>
              }
            />
          </>
        ) : (
          <>
            <Route
              path="/add-hotel"
              element={
                <PageWrapper>
                  <UserLayout>
                    <AddHotel />
                  </UserLayout>
                </PageWrapper>
              }
            />
          </>
        )}
        {/* <Route
          path="*"
          element={
            <PageWrapper>
              <Navigate to="/" />
            </PageWrapper>
          }
        /> */}
      </Routes>
    </AnimatePresence>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
