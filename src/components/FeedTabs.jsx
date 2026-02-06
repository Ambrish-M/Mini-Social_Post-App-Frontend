import { Nav } from "react-bootstrap";

export default function FeedTabs({ activeTab, onChange }) {
  const baseStyle = {
    backgroundColor: "#fff",
    transition: "all 0.25s ease",
    border: "1px solid #0d6efd",
  };

  const activeStyle = {
    backgroundColor: "#0d6efd",
    color: "#fff",
    transform: "scale(1.05)",
  };

  return (
    <Nav
      activeKey={activeTab}
      onSelect={(key) => onChange(key)}
      className="mb-3 gap-2 d-flex"
      style={{ justifyContent: "flex-end" }}
    >
      {[
        { key: "all", label: "All Posts" },
        { key: "liked", label: "Likes on My Posts" },
        { key: "commented", label: "Comments on My Posts" },
      ].map((tab) => (
        <Nav.Item key={tab.key}>
          <Nav.Link
            eventKey={tab.key}
            style={{
              ...baseStyle,
              ...(activeTab === tab.key ? activeStyle : {}),
            }}
            className="rounded-pill px-3 fw-semibold"
          >
            {tab.label}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}
