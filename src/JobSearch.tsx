import { FC, useState } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import Card from "react-bootstrap/esm/Card";
import Stack from "react-bootstrap/esm/Stack";
import Config from "./config";
import { Job } from "./index.d";
import { JobCard } from "./JobCard";
import PreferencesFormView from "./PreferencesFormView";
import { useLogEvent } from "./FirebaseProvider";

interface JobSearchViewProps {
    jobs: Job[];
    showWelcome: boolean;
    onPreferencesSubmitted: (payload: {
        desiredJob: string;
        profile: string;
        workEnv: string;
    }) => Promise<void>;
}

export default function JobSearch() {
    return <JobSearchController view={JobSearchView} />;
}

function JobSearchController(props: { view: FC<JobSearchViewProps> }) {
    const [jobs, setJobs] = useState([] as Job[]);
    const [showWelcome, setShowWelcome] = useState(true);
    const logEvent = useLogEvent();

    const onPreferencesSubmitted = async (p: {
        desiredJob: string;
        profile: string;
        workEnv: string;
    }) => {
        setShowWelcome(false);
        setJobs([]);
        logEvent("job_search", {
            desired_job: p.desiredJob,
            profile: p.profile,
            work_env: p.workEnv
        });
        const res = await fetch(`${Config.BACKEND_URL}/search`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accept: "application/json"
            },
            body: JSON.stringify({
                desiredJob: p.desiredJob,
                profile: p.profile,
                workEnv: p.workEnv
            })
        });
        try {
            const ja = await res.json();
            setJobs(ja);
        } catch (e) {
            const err = e as Error;
            console.error(err.name, err.message);
            setJobs([]);
        }
    };

    return props.view({ jobs, onPreferencesSubmitted, showWelcome });
}

function Placeholder() {
    return (
        <Card>
            <Card.Body className="d-flex justify-content-center align-items-center">
                <span className="me-3">Jobs are loading...</span>
                <Spinner size="sm" />
            </Card.Body>
        </Card>
    );
}

function Welcome() {
    return (
        <Card>
            <Card.Body className="d-flex justify-content-center align-items-center">
                <Stack className="align-items-center" gap={2}>
                    <span>💼</span>
                    <span>Enter details and find your dream job!</span>
                </Stack>
            </Card.Body>
        </Card>
    );
}

function JobSearchView(props: JobSearchViewProps) {
    return (
        <Stack gap={4} className="mb-5">
            <PreferencesFormView onSubmit={props.onPreferencesSubmitted} />
            {props.showWelcome && <Welcome />}
            {!props.showWelcome && props.jobs.length === 0 ? (
                <Placeholder />
            ) : (
                props.jobs.map(job => <JobCard key={job.id} job={job} />)
            )}
        </Stack>
    );
}
