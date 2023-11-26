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
import Login from "./Login";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />} errorElement={<ErrorPage />}>
            <Route index element={<JobSearch />} />
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
