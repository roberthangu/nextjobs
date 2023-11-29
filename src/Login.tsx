import { FC } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import PersonalDataFormView, {
    PersonalDataFormViewProps
} from "./PersonalDataFormView";

export default function Login() {
    return <LoginController view={PersonalDataFormView} />;
}

interface LoginControllerProps {
    view: FC<PersonalDataFormViewProps>;
}

function LoginController(props: LoginControllerProps) {
    const auth = getAuth();
    const onSubmit = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };
    return props.view({ type: "login", onSubmit });
}
