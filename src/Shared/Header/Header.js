import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const Header = () => {
  const { user, providerLogin, logOut } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    providerLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((err) => console.log(err));
  };
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="mb-2">
      <Container>
        <Navbar.Brand>
          <Link to="/">Task Management</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link>
              {user?.uid ? (
                <>
                  <span> {user?.displayName}</span>
                  <Button variant="light" onClick={handleLogOut}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            </Nav.Link>
            <Nav.Link>
              <Link Link to="/add/task">
                Add Task
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link Link to="/mytask">
                My Task
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <button onClick={handleGoogleSignIn} class="btn btn-info btn-sm">
        Google
      </button>
    </Navbar>
  );
};

export default Header;
