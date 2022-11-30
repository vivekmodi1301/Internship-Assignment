import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form, NavLink } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const eye = <FontAwesomeIcon icon={faEye} />;

const AdminLogin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      if (
        emailRef.current.value === "test@test.com" &&
        passwordRef.current.value === "pass@123"
      ) {
        await login(emailRef.current.value, passwordRef.current.value);
        navigate("/admin-panel");
      } else {
        setError("Failed to sign in!");
      }
    } catch {
      setError("Failed to sign in!");
    }

    setLoading(false);
  }
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  function handleLogin() {
    navigate("/login");
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Admin Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required ref={emailRef} />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={passwordShown ? "text" : "password"}
                required
                ref={passwordRef}
                autoComplete="off"
              />
              <i className="showhide" onClick={togglePassword}>
                {eye}
              </i>
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Login
            </Button>
          </Form>
          <div className="w=100 text-center mt-2">
            <NavLink to="/login">Forget Password?</NavLink>
          </div>
        </Card.Body>
      </Card>
      <div className="w=100 text-center mt-2">
        <Button onClick={handleLogin} variant="link">
          Go To Login
        </Button>
      </div>
    </>
  );
};

export default AdminLogin;
