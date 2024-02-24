import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { ClerkProvider, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import RideForm from "./pages/RideForm.jsx";
import Rides from "./pages/Rides.jsx";
5;
import { SnackbarProvider } from "notistack";
import Notifications from "./pages/Notifications.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const ClerkWithRoutes = () => {
  const navigate = useNavigate();

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} navigate={navigate}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              <SignedOut>
                <App />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/rideform"
          element={
            <>
              <SignedIn>
                <RideForm />
              </SignedIn>
              <SignedOut>
                <App />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/rides"
          element={
            <>
              <SignedIn>
                <Rides />
              </SignedIn>
              <SignedOut>
                <App />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/notifications"
          element={
            <>
              <SignedIn>
                <Notifications />
              </SignedIn>
              <SignedOut>
                <App />
              </SignedOut>
            </>
          }
        />
        {/* <Route
          path="/payments"
          element={
            <>
              <SignedIn>
                <Payments />
              </SignedIn>
              <SignedOut>
                <App />
              </SignedOut>
            </>
          }
        /> */}
      </Routes>
    </ClerkProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <SnackbarProvider>
    <Router>
      <ClerkWithRoutes />
    </Router>
  </SnackbarProvider>
);
