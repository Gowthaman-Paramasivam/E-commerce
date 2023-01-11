import React, { useState } from "react";
import { Form, Button, Container, Col, Row, InputGroup } from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import { TiTick} from "react-icons/ti"
import { signUp } from "../api"

export const SignUp = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    gender: "",
    password: "",
    confirmPassword: ""
  });

  const [validation, setValidation] = useState(false)

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function validateForm() {
    return formData.userName.length > 0 &&
      formData.password.length > 0 &&
      formData.firstName.length > 0 &&
      formData.gender.length > 0 &&
      formData.confirmPassword.length > 0
  }

  function checkPassword() {
    return formData.password && formData.password === formData.confirmPassword;
  }

  function handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      setValidation(true);
      signUp(formData)
        .then((data) => {
          console.log("data :", data)
          navigate("/")
        })
        .catch((err) => {
          console.log("err", err)
          setFormData({
            userName: "",
            password: ""
          })
          alert("Username already exist")
          setFormData({
            firstName: "",
            lastName: "",
            userName: "",
            gender: "",
            password: "",
            confirmPassword: ""
          })
        })
    }else{
      event.preventDefault();
      event.stopPropagation();
      setValidation(true);
    }
  }

  return (
    <Container className="margin-top-20px">
      <div className="signup-root-div">
        <div className="card-head">Sign Up</div>
        <Form noValidate validated={validation} onSubmit={handleSubmit}>
          <Form.Group controlId="fname">
            <Form.Label>First Name*</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
              pattern="[a-zA-Z]+"
              autoComplete="off"
            />
            <Form.Control.Feedback type="invalid">Name should be alphabets. Numbers and special characters not allowed</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="lname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.lastName}
              pattern="[a-zA-Z]+"
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              autoComplete="off"
            />
            <Form.Control.Feedback type="invalid">Name should be alphabets. Numbers and special characters not allowed</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Gender*</Form.Label>
            <Row>
              <Col>
                <Form.Check
                  type="radio"
                  label="Male"
                  id="Male"
                  name="gender"
                  value="Male"
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                />
              </Col>
              <Col>
                <Form.Check
                  type="radio"
                  label="Female"
                  id="Female"
                  name="gender"
                  value="Female"
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                />
              </Col>
              <Col>
                <Form.Check
                  type="radio"
                  label="Others"
                  id="Others"
                  name="gender"
                  value="Others"
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="username">
            <Form.Label>User Name*</Form.Label>
            <Form.Control
              type="text"
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              autoComplete="off"
              pattern="[a-zA-Z]{4,15}"
              required
            />
            <Form.Control.Feedback type="invalid">Name should be alphabets. Numbers and special characters not allowed</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password*</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                pattern="[a-zA-Z0-9!@#$%^Z&Z*()]{8,}"
                autoComplete="off"
                required
              />
              <InputGroup.Text>
                {
                  showPassword ?
                    <AiOutlineEyeInvisible
                      onClick={() => {
                        setShowPassword(false)
                      }}
                    /> :
                    <AiOutlineEye onClick={() => {
                      setShowPassword(true)
                    }}
                    />
                }</InputGroup.Text>
            </InputGroup>
            <Form.Control.Feedback type="invalid">password should be minimum of 8 character</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="Cpassword">
            <Form.Label>Confirm Password*</Form.Label>
            <InputGroup>
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                autoComplete="off"
                required
              />
              <InputGroup.Text>
                {showConfirmPassword ?
                  <AiOutlineEyeInvisible
                    onClick={() => {
                      setShowConfirmPassword(false)
                    }}
                  /> :
                  <AiOutlineEye onClick={() => {
                    setShowConfirmPassword(true)
                  }}
                  />}</InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Label>{checkPassword() ? <h6 style={{ "color": "green" }}>password match<TiTick/> </h6> : ""}</Form.Label>
          <div className="login-button">
            <Button
              type="submit"
              variant="outline-primary"
              disabled={!validateForm()}
            >
              Register
            </Button>
            <Button
              className="margin-top-20px"
              variant="outline-primary"
              onClick={() => {
                navigate("/")
              }}>
              Back
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default SignUp;