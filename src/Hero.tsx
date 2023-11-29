import Card from "react-bootstrap/esm/Card";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

function BenefitsCard(props: { title: string; description: string }) {
    return (
        <Card
            className="rounded-4 h-100"
            style={{
                background: "rgba(45.59, 53.59, 56.41, 0.40)",
                border: "1px #CCCCCC solid",
                backdropFilter: "blur(8px)"
            }}
        >
            <Card.Body>
                <Card.Title className="text-white">{props.title}</Card.Title>
                <Card.Text className="text-white">
                    {props.description}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default function Hero() {
    // change height to 100vh based on breakpoint
    const getHeroHeight = () => {
        const breakpoint = 768;
        const width =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
        return width > breakpoint ? "vh-100" : "";
    }

    return (
        <div
            className={getHeroHeight()}
            style={{
                paddingTop: "20vh",
                paddingBottom: 150,
                background:
                    " linear-gradient(180deg, hsl(194deg 29.41% 20% / 100%) 10%, hsl(0deg 0% 0% / 0%) 79%), url('cover-background.jpg') center/cover"
            }}
        >
            <Container className="d-flex flex-column justify-content-center align-items-center gap-5">
                <h3 className="text-white display-3 text-center">
                    The Job Board that Understands You
                </h3>
                <h4 className="text-white text-center">
                    Go beyond keywords. Our AI understands your aspirations to
                    bring you job opportunities where you can truly thrive.
                </h4>
                <Row xs="1" md="3" className="row-gap-3">
                    <Col>
                        <BenefitsCard
                            title="Tailored Job Matches with Advanced AI"
                            description="Experience job search transformed by AI. Our system analyzes your career aspirations, suggesting roles where you'll thrive."
                        />
                    </Col>
                    <Col>
                        <BenefitsCard
                            title="Streamline Your Search with Smart Filtering"
                            description="No more endless scrolling and walls of text! Our AI extracts key job details, presenting you with concise, relevant opportunities."
                        />
                    </Col>
                    <Col>
                        <BenefitsCard
                            title="Strategize Your Application with AI Insights"
                            description="Learn why you’re a good fit with AI-driven insights for each job. Learn how to position yourself best, boosting your chances of success."
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
