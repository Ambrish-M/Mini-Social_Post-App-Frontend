import { Container, Card } from "react-bootstrap";

export default function AuthLayout({ title, children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa", // soft gray background
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container>
        <Card
          className="mx-auto shadow-sm border-0"
          style={{ maxWidth: 420 }}
        >
          <Card.Body className="p-4">
            <h4 className="text-center text-primary fw-bold mb-4">
              {title}
            </h4>

            {children}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
