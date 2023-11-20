import Container from "react-bootstrap/Container";
import JobSearch from "./JobSearch";
import Navbar from "react-bootstrap/Navbar";
import Stack from "react-bootstrap/esm/Stack";

function App() {
    return (
        <>
            <Navbar
                style={{ background: "#e7e7e7" }}
                fixed="top"
                className="shadow"
            >
                <Container>
                    <Navbar.Brand>
                        <img
                            src="logo256.svg"
                            width="32"
                            height="32"
                            className="me-2"
                            alt=""
                        />
                        Next Jobs
                    </Navbar.Brand>
                    <Navbar.Text>AI-Powered Job Board</Navbar.Text>
                </Container>
            </Navbar>
            <JobSearch />
            <Stack
                direction="horizontal"
                className="justify-content-center text-secondary mb-4"
            >
                <span>
                    (c) 2023{" "}
                    <a
                        href="https://nextops.agency/?utm_source=nextjobs&utm_medium=footer"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Next Operations
                    </a>
                </span>
            </Stack>
        </>
    );
}

export default App;
