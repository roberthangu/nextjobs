import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import FirebaseProvider from "./FirebaseProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorPage from "./ErrorPage";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom";
import JobSearch from "./JobSearch";
import PersonalDataFormView from "./Login";
import Verification, { loader as verificationLoader } from "./Verification";
import Login from "./Login";
import Register from "./Register";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />} errorElement={<ErrorPage />}>
            <Route index element={<JobSearch />} />
            <Route path="login" element={<PersonalDataFormView />} />
            <Route path="verification" element={<Verification />} loader={verificationLoader} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
        </Route>
    )
);

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <StrictMode>
        <FirebaseProvider>
            <RouterProvider router={router} />
        </FirebaseProvider>
    </StrictMode>
);
