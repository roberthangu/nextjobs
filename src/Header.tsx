import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import { NavLink } from "react-router-dom";

export default function HeaderView() {
    return (
        <Navbar
        style={{
                background: "hsl(192deg 9.8% 20% / 70%)",
                backdropFilter: "blur(8px)"
        }}
            fixed="top"
            className="shadow-sm"
        >
            <Container>
                <Navbar.Brand as={NavLink} to="/" className="text-white">
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
                            className="text-center fs-6 text-white"
                        >
                            Login
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    );
}
