import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FC } from "react";
import { useAuth } from "./FirebaseProvider";
import PersonalDataFormView, {
    PersonalDataFormViewProps
} from "./PersonalDataFormView";

export default function Register() {
    return <RegisterController view={PersonalDataFormView} />;
}

interface RegisterControllerProps {
    view: FC<PersonalDataFormViewProps>;
}

function RegisterController(props: RegisterControllerProps) {
    const auth = useAuth();
    const onSubmit = async (
        email: string,
        password: string,
        fullName?: string
    ) => {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        if (user) {
            await updateProfile(user, { displayName: fullName });
        }
    };
    return props.view({ type: "register", onSubmit });
}
