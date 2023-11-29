import { sendEmailVerification, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useAuth, useCurrentUser } from "./FirebaseProvider";

export function loader(data: { params: { email?: string } }) {
    return data.params.email || null;
}

export default function Verification() {
    const email = useLoaderData() as string | null;
    const auth = useAuth();
    const user = useCurrentUser();

    useEffect(() => {
        console.log("current user", user);
        if (!email || email.length == 0) {
            return;
        }
        if (user) {
            sendEmailVerification(user);
        }
        signOut(auth);
    }, [auth, email]);

    if (!email || email.length == 0) {
        return <p>Nothing to see here</p>;
    }
    return (
        <>
            <h4>Verification pending</h4>
            <p>
                An email with a verification link has been sent to{" "}
                {email}
            </p>
        </>
    );
}
