import { FormEvent, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Stack from "react-bootstrap/esm/Stack";

export default function PreferencesFormView(props: {
    onSubmit: (payload: {
        desiredJob: string;
        profile: string;
        workEnv: string;
    }) => Promise<void>;
}) {
    const [desiredJob, setJobEnv] = useState("");
    const [profile, setCvContents] = useState("");
    const [workEnv, setValues] = useState("");

    const onDetailsSubmitted = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await props.onSubmit({ desiredJob, profile, workEnv });
    };

    return (
        <Container>
            <Form onSubmit={onDetailsSubmitted}>
                <Stack gap={4}>
                    <Form.Group>
                        <Form.Label>
                            1. Describe what job you're looking for.
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Product manager in the finance industry."
                            value={desiredJob}
                            onChange={e => setJobEnv(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            2. Describe yourself / Paste your CV here
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Jon Doe, Experience: 2020 - 2023: ..."
                            value={profile}
                            onChange={e => setCvContents(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            3. Describe your perfect work environment.
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="I value camaraderie, honesty and ..."
                            value={workEnv}
                            onChange={e => setValues(e.target.value)}
                        />
                    </Form.Group>
                    <Button type="submit">✨ Find My Job!</Button>
                </Stack>
            </Form>
        </Container>
    );
}
