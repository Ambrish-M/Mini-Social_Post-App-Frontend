import { useEffect, useRef, useState } from "react";
import { Card, Form, Button, Spinner } from "react-bootstrap";
import api from "../services/api";

export default function CreatePost({ onPostCreated }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB");
      return;
    }

    if (preview) URL.revokeObjectURL(preview);

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    if (preview) URL.revokeObjectURL(preview);
    setImage(null);
    setPreview("");
    if (fileRef.current) fileRef.current.value = "";
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!text.trim() && !image) return;

    const formData = new FormData();
    if (text.trim()) formData.append("text", text.trim());
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      const res = await api.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Optimistically add the new post
      onPostCreated?.(res.data);

      // Reset form
      setText("");
      removeImage();
    } catch (err) {
      console.error("Create post error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-4 shadow-sm rounded-4">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="What's on your mind?"
            className="mb-2 rounded-3"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={loading}
          />
          {preview && (
            <div
              className="mb-3 d-flex justify-content-center align-items-center rounded-3"
              style={{
                backgroundColor: "#f8f9fa",
                maxHeight: "600px",
                overflow: "hidden",
              }}
            >
              <img
                src={preview}
                alt="preview"
                className="img-fluid rounded-3"
                style={{
                  maxHeight: "600px",
                  objectFit: "contain",
                  width: "100%",
                }}
              />


              <Button
                size="sm"
                variant="danger"
                className="position-absolute top-0 end-0 m-2 rounded-circle"
                onClick={removeImage}
                disabled={loading}
              >
                ✕
              </Button>
            </div>
          )}

          <div className="d-flex flex-column flex-sm-row gap-2 align-items-center">
            <Form.Control
              type="file"
              accept="image/*"
              ref={fileRef}
              onChange={handleImageChange}
              disabled={loading}
            />
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="ms-sm-auto px-4 rounded-pill"
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Posting…
                </>
              ) : (
                "Post"
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
