import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { FormEvent, useState } from "react";
import Stack from "react-bootstrap/esm/Stack";
import { Link } from "react-router-dom";

export interface PersonalDataFormViewProps {
    type: "login" | "register";
    onSubmit: (
        email: string,
        password: string,
        fullName?: string
    ) => Promise<void>;
}

function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function PersonalDataFormView(props: PersonalDataFormViewProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [fullName, setFullName] = useState<string | undefined>(undefined);
    const [checkedValidity, setCheckedValidity] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!event.currentTarget.checkValidity()) {
            setCheckedValidity(true);
            return;
        }
        setError("");
        try {
            await props.onSubmit(email, password, fullName);
        } catch (error) {
            const typedError = error as Error;
            setError(typedError.message);
        }
    };
    return (
        <Form onSubmit={handleSubmit} noValidate validated={checkedValidity}
        style={{
            paddingTop: "10vh",
        }}>
            <Stack gap={2} className="align-items-center">
                <Form.Group>
                    <Form.Label>Email*</Form.Label>
                    <Form.Control
                        className="mb-2 shadow-sm"
                        type="email"
                        required={true}
                        value={email}
                        autoComplete="email"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid email address
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className={props.type === "login" ? "d-none" : ""}>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        className="mb-2 shadow-sm"
                        type="text"
                        value={fullName}
                        autoComplete="fullName"
                        onChange={e => setFullName(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter your full name
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password*</Form.Label>
                    <Form.Control
                        className="mb-2 shadow-sm"
                        type="password"
                        required={true}
                        autoComplete="current-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a password
                    </Form.Control.Feedback>
                </Form.Group>
                <Button className="mb-2 shadow-sm" type="submit">{capitalize(props.type)}</Button>
                {props.type === "login" && <Link className="text-secondary" to="/register">Register</Link>}
                {error && <p>{error}</p>}
            </Stack>
        </Form>
    );
}
