import { Navbar, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function AppNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null; 

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Navbar
      bg="white"
      expand="sm"
      className="border-bottom"
      sticky="top"
    >
      <Container>
        <Navbar.Brand
          className="fw-bold text-primary text-truncate"
          style={{ cursor: "pointer", maxWidth: "70%" }}
          onClick={() => navigate("/")}
        >
          Mini-Social Post Application
        </Navbar.Brand>

        <div className="ms-auto d-flex align-items-center gap-2">
          <span className="text-muted d-none d-sm-inline">
            @{user.username}
          </span>

          <Button
            variant="outline-primary"
            size="sm"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}
