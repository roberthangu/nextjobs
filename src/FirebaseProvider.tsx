import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { Analytics, getAnalytics, logEvent } from "firebase/analytics";

import * as firebaseConfig from "./firebase-config.json";
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const AnalyticsContext = createContext<Analytics | null>(null);

export default function FirebaseProvider(props: { children: JSX.Element }) {
    // TODO If you get an error about initialising Firebase twice, initialise
    // the Firebase app here with a useMemo.
    return (
        <AnalyticsContext.Provider value={analytics}>
            {props.children}
        </AnalyticsContext.Provider>
    );
}

function useAnalytics() {
    const context = useContext(AnalyticsContext);
    if (!context) {
        throw new Error("useAnalytics called outside of AnalyticsContext");
    }
    return context;
}

/**
 * Returns a function logging an event to Analytics
 */
export function useLogEvent() {
    const analytics = useAnalytics();

    return (
        name: string,
        params: { [k: string]: string | number | object }
    ) => {
        logEvent(analytics, name, params);
    };
}
