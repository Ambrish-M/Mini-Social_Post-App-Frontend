import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import AuthLayout from "../layouts/AuthLayout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // use login from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login({ email, password }); // updates user immediately
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthLayout title="Welcome Back">
      {error && <p className="text-danger text-center">{error}</p>}

      <Form onSubmit={handleSubmit}>
        <Form.Control
          className="mb-3"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Form.Control
          className="mb-3"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" className="w-100 mb-3">
          Login
        </Button>
      </Form>

      <hr />

      <p className="text-center mb-0">
        <span className="text-muted">Don’t have an account? </span>
        <span
          className="text-primary fw-semibold"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/signup")}
        >
          Sign up
        </span>
      </p>
    </AuthLayout>
  );
}
