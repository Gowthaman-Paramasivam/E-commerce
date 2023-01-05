import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { signIn } from "../api"

import "./style.css";

export const Login = () => {

  const [formData, setFormData] = useState({
    userName: "",
    password: ""
  });

  const [validation, setValidation] = useState(false)

  const [showAlert, setShowAlert] = useState(false)

  const navigate = useNavigate();

  function validateForm() {
    return formData.userName.length > 0 && formData.password.length > 0;
  }

  function handleSubmit(event) {
    const form = event.currentTarget;

    if (form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();

      signIn(formData)
        .then((data) => {
          localStorage.setItem("profile", JSON.stringify(data));
          navigate("/main")
        })
        .catch((err) => {
          console.log("err")
          setFormData({
            userName: "",
            password: ""
          })
          setShowAlert(true)
          setTimeout(() => { setShowAlert(false) }, 3000)
        })
        
    } else {
      event.preventDefault();
      event.stopPropagation();
      setValidation(true);
    }
  }

  return (
    <Container className="margin-top-20px">
      <div className="login-root-div">
        <div className="card-head">Login</div>
        {showAlert &&
          <Alert key="danger" variant="danger">
            Username or password wrong
          </Alert>
        }
        <Form noValidate validated={validation} onSubmit={handleSubmit}>
          <Form.Group controlId="userName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              autoComplete="off"
              required
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              autoComplete="off"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </Form.Group>
          <div className="login-button">
            <Button className="margin-top-20px" type="submit" variant="outline-success" disabled={!validateForm()}>
              Login
            </Button>
          </div>
        </Form>
        <Row className="margin-top-20px">
          <Col>
            Don't have an account?
          </Col>
          <Col className="sign-in-button">
            <Button type="submit" variant="outline-success" onClick={() => {
              navigate("/signup")
            }}>
              SignUp
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Login;