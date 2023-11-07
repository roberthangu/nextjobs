import { FormEvent, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Stack from "react-bootstrap/esm/Stack";


export interface PreferenceFormViewProps {
    onSubmit: (payload: {
        jobEnv: string;
        cvContents: string;
        values: string;
    }) => void;
}



export default function PreferencesFormView(props: PreferenceFormViewProps) {
    const [jobEnv, setJobEnv] = useState("");
    const [cvContents, setCvContents] = useState("");
    const [values, setValues] = useState("");

    const onDetailsSubmitted = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSubmit({ jobEnv, cvContents, values });
    };

    return (
        <Container>
            <Form onSubmit={onDetailsSubmitted}>
                <Stack gap={4}>
                    <Form.Group>
                        <Form.Label>
                            1. Describe your perfect job environment
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="I thrive in a competitive environment..."
                            value={jobEnv}
                            onChange={e => setJobEnv(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>2. Paste your CV contents here</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Jon Doe, Experience: 2020 - 2023: ..."
                            value={cvContents}
                            onChange={e => setCvContents(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            3. Describe your values in the workplace
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="I value camaraderie, honesty and ..."
                            value={values}
                            onChange={e => setValues(e.target.value)} />
                    </Form.Group>
                    <Button type="submit">✨ Find My Job!</Button>
                </Stack>
            </Form>
        </Container>
    );
}

