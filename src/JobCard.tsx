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

function RoleDetails(props: {
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
                <Stack direction="horizontal" className="gap-2">
                    <span>{props.location}</span>
                    <Badge bg="primary" className="text-uppercase">
                        {props.workType}
                    </Badge>
                    <Badge bg="primary" className="text-uppercase">
                        {props.employment}
                    </Badge>
                </Stack>
                <span className="text-secondary">
                    {props.yearsExperience} years experience ∙ {props.jobLevel}{" "}
                    ∙ {props.pay}
                </span>
            </Stack>
            <Stack gap={1}>
                <Stack direction="horizontal" className="gap-2">
                    <FontAwesomeIcon icon={faUsers} />
                    <span>{props.companySize}</span>
                </Stack>
                <Row xs="auto" className="gx-1 gy-1">
                    {props.benefits.map(b => (
                        <Col>
                        <Badge bg="success">{b}</Badge>
                        </Col>
                    ))}
                </Row>
            </Stack>
        </Stack>
    );
}

function CompanyDetails(props: {
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

function Personalization(props: {
    commonalities: string;
    positioning: string;
}) {
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

interface JobCardViewProps {
    job: Job;
}

export function JobCardView(props: JobCardViewProps) {
    const { job } = props;
    return (
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
                            🔥 {(job.similarity * 100).toPrecision(3)} Similarity
                        </span>
                    </Col>
                </Row>
                <Row
                    xs={1}
                    md={2}
                    className="pb-4 px-3 px-sm-4 pb-5 pb-sm-4 g-5"
                >
                    <Col>
                        <RoleDetails {...job} />
                    </Col>
                    <Col>
                        <CompanyDetails {...job} stackDirection="vertical" />
                    </Col>
                </Row>
                <Personalization
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
                    <Button variant="outline-primary" className="w-100">
                        Learn More
                    </Button>
                </Col>
                <Col xs={12} sm={3} className="my-1 my-sm-0">
                    <Button className="w-100">Apply</Button>
                </Col>
            </Row>
        </Card>
    );
}
