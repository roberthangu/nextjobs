import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/esm/Stack";
import { Outlet } from "react-router-dom";
import HeaderView from "./Header";

export default function App() {
    return (
        <>
            <HeaderView />
            <Container style={{ marginTop: "100px" }}>
                <Outlet />
            </Container>
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
