import { Navbar, Nav, Container } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context/auth-context";

export default function TopNavbar() {
  const authContext = useContext(AuthContext);

  const logOut = () => {
    authContext.logOut();
  };

  const notLoggedInLinks = (
    <Nav className="me-auto">
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/signup">Sign Up</Nav.Link>
    </Nav>
  );

  const loggedInLinks = (
    <>
      <Navbar.Brand href="/home">JPH visual</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/posts">My Posts</Nav.Link>
        <Nav.Link href="/albums">My Albums</Nav.Link>
        <Nav.Link href="/todos">My Todos</Nav.Link>
        <Nav.Link href="/logout" onClick={logOut}>
          Logout
        </Nav.Link>
      </Nav>
    </>
  );

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {authContext.user ? loggedInLinks : notLoggedInLinks}
      </Container>
    </Navbar>
  );
}
