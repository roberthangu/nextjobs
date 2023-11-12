import Container from "react-bootstrap/Container";
import JobSearch from "./JobSearch";
import Navbar from "react-bootstrap/Navbar";

function App() {
    return (
        <>
            <Navbar style={{ background: "#e7e7e7" }} fixed="top" className="shadow">
                <Container>
                    <Navbar.Brand>Next Jobs</Navbar.Brand>
                    <Navbar.Text>AI-Powered Job Board</Navbar.Text>
                </Container>
            </Navbar>
            <Container style={{ marginTop: "100px" }}>
                <JobSearch />
            </Container>
            <Navbar
                style={{ background: "#e7e7e7", height: "40px" }}
                fixed="bottom"
            >
                <Container>
                    <Navbar.Text>
                        (c) 2023{" "}
                        <a href="https://nextops.agency/?utm_source=nextjobs&utm_medium=footer">
                            Next Operations
                        </a>
                    </Navbar.Text>
                </Container>
            </Navbar>
        </>
    );
}

export default App;
