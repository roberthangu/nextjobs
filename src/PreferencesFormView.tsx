import { FormEvent, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
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
        <Form onSubmit={onDetailsSubmitted}>
            <Stack gap={4}>
                <Row xs="1" md="3" className="row-gap-3">
                    <Form.Group
                        as={Col}
                        className="d-flex flex-column justify-items-between"
                    >
                        <Form.Label>
                            🔍 Describe what job you're looking for.
                        </Form.Label>
                        <Form.Control
                            style={{
                                minHeight: "150px"
                            }}
                            className="h-100"
                            as="textarea"
                            placeholder="Product manager in the finance industry."
                            value={desiredJob}
                            onChange={e => setJobEnv(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group
                        as={Col}
                        className="d-flex flex-column justify-items-between"
                    >
                        <Form.Label>
                            💪 Describe yourself / Paste your CV here
                        </Form.Label>
                        <Form.Control
                            style={{
                                minHeight: "150px"
                            }}
                            className="h-100"
                            as="textarea"
                            placeholder="Jon Doe, Experience: 2020 - 2023: ..."
                            value={profile}
                            onChange={e => setCvContents(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group
                        as={Col}
                        className="d-flex flex-column justify-items-between"
                    >
                        <Form.Label>
                            👥 Describe your perfect work environment.
                        </Form.Label>
                        <Form.Control
                            style={{
                                minHeight: "150px"
                            }}
                            className="h-100"
                            as="textarea"
                            placeholder="I value camaraderie, honesty and ..."
                            value={workEnv}
                            onChange={e => setValues(e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Button type="submit" className="mx-auto">
                    ✨ Find My Job!
                </Button>
            </Stack>
        </Form>
    );
}
