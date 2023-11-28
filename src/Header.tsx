import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import { NavLink } from "react-router-dom";

export default function HeaderView() {
    return (
        <Navbar
            style={{ background: "#f7f7f7" }}
            fixed="top"
            className="shadow-sm"
        >
            <Container>
                <Navbar.Brand as={NavLink} to="/">
                    <img
                        src="logo256.svg"
                        width="32"
                        height="32"
                        className="me-2"
                        alt=""
                    />
                    Next Jobs
                </Navbar.Brand>
                <Nav>
                    <Nav.Item>
                        <Nav.Link
                            as={NavLink}
                            to="/login"
                            className="text-center fs-6"
                        >
                            Login
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    );
}
