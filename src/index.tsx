import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import FirebaseProvider from "./FirebaseProvider";

import "bootstrap/dist/css/bootstrap.min.css";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <StrictMode>
        <FirebaseProvider>
            <App />
        </FirebaseProvider>
    </StrictMode>
);
