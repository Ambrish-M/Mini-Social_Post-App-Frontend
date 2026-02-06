import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import AuthLayout from "../layouts/AuthLayout";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup({
        username,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <AuthLayout title="Create Your Account">
      <Form onSubmit={handleSubmit}>
        <Form.Control
          className="mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

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
          Sign Up
        </Button>
      </Form>

      <hr />

      <p className="text-center mb-0">
        <span className="text-muted">
          Already have an account?{" "}
        </span>
        <span
          className="text-primary fw-semibold"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </AuthLayout>
  );
}
