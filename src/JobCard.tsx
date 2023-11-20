import Badge from "react-bootstrap/esm/Badge";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Stack from "react-bootstrap/esm/Stack";
import { Job } from "./index.d";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import {
    faBriefcase,
    faCalendarDays,
    faListCheck,
    faUsers
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/esm/Modal";
import { FC, useState } from "react";
import { useLogEvent } from "./FirebaseProvider";

function RoleDetailsView(props: {
    role: string;
    similarity: number;
    company: string;
    compIndShort: string; // Payments enablement
    location: string;
    workType: string; // remote
    employment: string; // permament
    yearsExperience: number; // 4
    jobLevel: string; // Senior Level
    pay?: string; // 30000
    companySize: string; // 1001 - 5000 employees
    benefits: string[]; // ["Competitive salary", "Stock options", "Global induction"]
}) {
    return (
        <Stack className="gap-4">
            <Stack className="gap-1">
                <p className="m-0">
                    <span className="fw-semibold">{props.company}</span> (
                    {props.compIndShort})
                </p>
                <Row xs={1} lg={2} direction="horizontal">
                    <Col>
                        <span>{props.location}</span>
                    </Col>
                    <Col>
                        <Row xs="auto" className="gx-1">
                            <Col>
                                <Badge bg="primary" className="text-uppercase">
                                    {props.workType}
                                </Badge>
                            </Col>
                            <Col>
                                <Badge bg="primary" className="text-uppercase">
                                    {props.employment}
                                </Badge>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <span className="text-secondary">
                    Experience {props.yearsExperience} ∙ Level {props.jobLevel}{" "}
                    ∙ Pay {props.pay}
                </span>
            </Stack>
            <Stack gap={1}>
                <Stack direction="horizontal" className="gap-2">
                    <FontAwesomeIcon icon={faUsers} />
                    <span>{props.companySize}</span>
                </Stack>
                <Row xs="auto" className="gx-1 gy-1">
                    {props.benefits.map(b => (
                        <Col key={b}>
                            <Badge bg="success">{b}</Badge>
                        </Col>
                    ))}
                </Row>
            </Stack>
        </Stack>
    );
}

function CompanyDetailsView(props: {
    compFocusShort: string;
    roleActivitiesShort: string;
    roleReqsShort: string;
    stackDirection: "horizontal" | "vertical";
}) {
    return (
        <Stack direction={props.stackDirection} className="gap-3">
            <Stack direction="horizontal" gap={4}>
                <div
                    style={{ width: "30px", height: "30px" }}
                    className="text-center"
                >
                    <FontAwesomeIcon icon={faBuilding} className="fs-2" />
                </div>
                <p className="m-0">
                    <span className="fw-semibold">Company</span>:{" "}
                    {props.compFocusShort}
                </p>
            </Stack>
            <Stack direction="horizontal" gap={4}>
                <div
                    style={{ width: "30px", height: "30px" }}
                    className="text-center"
                >
                    <FontAwesomeIcon
                        icon={faBriefcase}
                        className="fs-2 text-center"
                    />
                </div>
                <p className="m-0">
                    <span className="fw-semibold">Role</span>:{" "}
                    {props.roleActivitiesShort}
                </p>
            </Stack>
            <Stack direction="horizontal" gap={4}>
                <div
                    style={{ width: "30px", height: "30px" }}
                    className="text-center"
                >
                    <FontAwesomeIcon icon={faListCheck} className="fs-2" />
                </div>
                <p className="m-0">
                    <span className="fw-semibold">Requirements</span>:{" "}
                    {props.roleReqsShort}
                </p>
            </Stack>
        </Stack>
    );
}

function PersonalizationView(props: {
    commonalities: string;
    positioning: string;
}) {
    console.log(
        "commonalities:",
        props.commonalities,
        "positioning:",
        props.positioning
    );
    return (
        <Row className="text-bg-secondary px-3 px-sm-4 py-4 mx-0">
            <Col xs={12} md={6} className="px-0 pe-md-3">
                <h5>Why am I a good fit?</h5>
                <p>{props.commonalities}</p>
            </Col>
            <Col xs={12} md={6} className="px-0 ps-md-3">
                <h5>How can I best position myself for this job?</h5>
                <p>{props.positioning}</p>
            </Col>
        </Row>
    );
}

export function JobCard(props: { job: Job }) {
    return <JobCardController view={JobCardView} {...props} />;
}

function JobCardController(props: { view: FC<JobCardViewProps>; job: Job }) {
    const logEvent = useLogEvent();

    const onHideJobDetails: OnHideJobDetailsType = button => {
        logEvent("hide_job_details", {
            button,
            job_id: props.job.id,
            job_title: props.job.role
        });
    };
    const onClickApply: OnClickType = button => {
        logEvent("job_apply", {
            button,
            job_id: props.job.id,
            job_title: props.job.role
        });
    };
    const onShowJobDetails = () => {
        logEvent("job_show_details", {
            job_id: props.job.id,
            job_title: props.job.role
        });
    };

    return props.view({
        job: props.job,
        onHideJobDetails: onHideJobDetails,
        onClickApply,
        onShowJobDetails
    });
}

type OnHideJobDetailsType = (button: "cross" | "close") => void;
type OnClickType = (target: "details_modal" | "job_card") => void;

interface JobCardViewProps {
    job: Job;
    onHideJobDetails: OnHideJobDetailsType;
    onClickApply: OnClickType;
    onShowJobDetails: () => void;
}

function JobDetailsModalView(props: {
    role: string;
    jobDescription: string;
    originalPostingUrl: string;
    show: boolean;
    onHideJobDetails: OnHideJobDetailsType;
    onClickApply: OnClickType;
}) {
    return (
        <Modal show={props.show} onHide={() => props.onHideJobDetails("cross")}>
            <Modal.Header closeButton>
                <Modal.Title>{props.role}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Job Details</h5>
                <p>{props.jobDescription}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => props.onHideJobDetails("close")}
                >
                    Close
                </Button>
                <Button
                    variant="primary"
                    href={props.originalPostingUrl}
                    onClick={() => props.onClickApply("details_modal")}
                    target="_blank"
                    rel="noreferrer"
                >
                    Apply
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export function JobCardView(props: JobCardViewProps) {
    const { job } = props;
    const [showJobDesc, setShowJobDesc] = useState(false);
    return (
        <>
            <Card className="shadow">
                <Stack>
                    <Row className="pt-3 px-3 px-sm-4">
                        <Col
                            xs={{ span: 12, order: 2 }}
                            sm={{ span: 7, order: 1 }}
                            md={{ span: 5, order: 1 }}
                            lg={3}
                        >
                            <h4 className="fw-semibold">{job.role}</h4>
                        </Col>
                        <Col
                            xs={{ span: 12, order: 1 }}
                            sm={{ span: 5, order: 2 }}
                            md={{ span: 7, order: 2 }}
                            lg={7}
                        >
                            <span className="fw-semibold text-danger">
                                🔥 {(job.similarity * 100).toPrecision(3)}{" "}
                                Similarity
                            </span>
                        </Col>
                    </Row>
                    <Row
                        xs={1}
                        md={2}
                        className="pb-4 px-3 px-sm-4 pb-5 pb-sm-4 g-5"
                    >
                        <Col>
                            <RoleDetailsView {...job} />
                        </Col>
                        <Col>
                            <CompanyDetailsView
                                {...job}
                                stackDirection="vertical"
                            />
                        </Col>
                    </Row>
                    <PersonalizationView
                        commonalities={job.commonalities}
                        positioning={job.positioning}
                    />
                </Stack>
                <Row className="p-3 px-sm-4 align-items-center gx-2">
                    <Col xs={12} sm={6} className="mb-2 my-sm-0">
                        <FontAwesomeIcon
                            icon={faCalendarDays}
                            className="fs-5 me-2"
                        />
                        {new Date(job.postedAt).toLocaleDateString()}
                    </Col>
                    <Col xs={12} sm={3} className="my-1 my-sm-0">
                        <Button
                            variant="outline-primary"
                            className="w-100"
                            onClick={() => {
                                setShowJobDesc(true);
                                props.onShowJobDetails();
                            }}
                        >
                            Learn More
                        </Button>
                    </Col>
                    <Col xs={12} sm={3} className="my-1 my-sm-0">
                        <Button
                            className="w-100"
                            href={job.originalPostingUrl}
                            target="_blank"
                        >
                            Apply
                        </Button>
                    </Col>
                </Row>
            </Card>
            <JobDetailsModalView
                {...job}
                onHideJobDetails={button => {
                    setShowJobDesc(false);
                    props.onHideJobDetails(button);
                }}
                onClickApply={props.onClickApply}
                show={showJobDesc}
            />
        </>
    );
}
