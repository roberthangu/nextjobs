import { createContext, useContext, useState } from "react";
import { initializeApp } from "firebase/app";
import { Auth, getAuth, User } from "firebase/auth";
import { Analytics, getAnalytics, logEvent } from "firebase/analytics";

import * as firebaseConfig from "./firebase-config.json";
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const AnalyticsContext = createContext<Analytics | null>(null);
const AuthContext = createContext<Auth | null>(null);
const UserContext = createContext<User | null>(null);

export default function FirebaseProvider(props: { children: JSX.Element }) {
    // TODO If you get an error about initialising Firebase twice, initialise
    // the Firebase app here with a useMemo.
    const [user, setUser] = useState<User | null>(null);
    auth.onAuthStateChanged(user => setUser(user));

    return (
        <AnalyticsContext.Provider value={analytics}>
            <AuthContext.Provider value={auth}>
                <UserContext.Provider value={user}>
                    {props.children}
                </UserContext.Provider>
            </AuthContext.Provider>
        </AnalyticsContext.Provider>
    );
}

export function useCurrentUser() {
    // The null-check here doesn't make sense because the user can be null
    // before proper initialisation of Auth
    return useContext(UserContext);
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth called outside of AuthContext");
    }
    return context;
}

/**
 * Returns a function logging an event to Analytics
 */
export function useLogEvent() {
    const analytics = useContext(AnalyticsContext);
    if (!analytics) {
        throw new Error("useAnalytics called outside of AnalyticsContext");
    }
    return (
        name: string,
        params: { [k: string]: string | number | object }
    ) => {
        logEvent(analytics, name, params);
    };
}
