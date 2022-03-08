import { useEffect, useState, useContext } from "react";
import axiosInstance from "../axios";
import { useNavigate, Link } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { UserContext } from "../Context/Context";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import AuthNav from "../Common/AuthNav";

function Register() {
  let navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [input, setInput] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [validated, setValidated] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let timer = setTimeout(() => setShowErrorMessage(false), 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [showErrorMessage]);

  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const registerForm = e.currentTarget;
    if (registerForm.checkValidity() === true) {
      axiosInstance
        .post("/auth/register", {
          email: e.target.email.value,
          username: e.target.username.value,
          password: e.target.password.value,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          setUser(decodeToken(response.data.token));
          navigate("/");
        })
        .catch((error) => {
          setShowErrorMessage(!showErrorMessage);
          setErrorMessage(error.response.data.message);
        });
    }
    setValidated(true);
  };

  return (
    <Container fluid>
      <AuthNav />
      <Row>
        <Col className="d-flex flex-column justify-content-center" lg={6}>
          <Col className="ms-auto me-auto mb-4" xs={9} sm={9} lg={9}>
            <h1>Sign up.</h1>
            <p>
              Sign up today to and get free access to popular rooms around the
              globe.
            </p>
          </Col>
          <Form
            className="w-75 me-auto ms-auto"
            noValidate
            validated={validated}
            onSubmit={onSubmit}
          >
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                required
                name="username"
                placeholder="Enter Username"
                label="username"
                onChange={(e) => onChange(e)}
                value={input.username}
              />
              <Form.Control.Feedback type="invalid">
                Username required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Your Email</Form.Label>
              <Form.Control
                type="email"
                required
                name="email"
                placeholder="johnapple@appleseed.com"
                label="email"
                onChange={(e) => onChange(e)}
                value={input.email}
              />
              <Form.Control.Feedback type="invalid">
                Email required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                name="password"
                placeholder="Enter Password"
                label="password"
                onChange={(e) => onChange(e)}
                value={input.password}
              />
              <Form.Control.Feedback type="invalid">
                Password required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3"></Form.Group>
            <Alert variant="danger" show={showErrorMessage}>
              {errorMessage}
            </Alert>
            <Button
              className="w-100 text-center"
              variant="primary"
              type="submit"
            >
              Create account
            </Button>
            <p className="text-center mt-4">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </Form>
        </Col>
        <Col className="HeroImage" lg={6}></Col>
      </Row>
    </Container>
  );
}

export default Register;
