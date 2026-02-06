import { useState } from "react";
import { Card, Button, Form, Badge } from "react-bootstrap";
import api from "../services/api";

export default function PostCard({ post, onUpdate, activeTab }) {
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);



  const handleLike = async () => {
    try {
      setLoading(true);
      const res = await api.put(`/posts/${post._id}/like`);
      onUpdate(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      setLoading(true);
      const res = await api.post(`/posts/${post._id}/comment`, {
        text: commentText,
      });
      setCommentText("");
      onUpdate(res.data); // update post instantly
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  /* RENDER  */

  return (
    <Card className="mb-4 border-0 shadow-sm rounded-4">
      <Card.Body>
        {/* Author */}
        <div className="d-flex align-items-center mb-2">
          <div className="fw-bold text-primary fs-6">
            @{post.username}
          </div>
        </div>

        {/* Content */}
        {post.text && (
          <Card.Text className="fs-6 text-dark">
            {post.text}
          </Card.Text>
        )}

        {post.image && (
          <div
            className="my-3 d-flex justify-content-center align-items-center rounded-3"
            style={{
              backgroundColor: "#f8f9fa",
              maxHeight: "600px",
              overflow: "hidden",
            }}
          >
            <img
              src={post.image}
              alt="post"
              className="img-fluid rounded-3"
              style={{
                maxHeight: "600px",
                objectFit: "contain",
                width: "100%",
              }}
            />
          </div>
        )}


        {/* ACTION BAR  */}
        {activeTab === "all" && (
          <>
            <div className="d-flex align-items-center gap-4 mt-3">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={handleLike}
                disabled={loading}
                className="rounded-pill px-3"
              >
                👍 Like · {post.likes.length}
              </Button>

              <span className="text-muted small">
                💬 {post.comments.length} comments
              </span>
            </div>

            <Form onSubmit={handleComment} className="mt-3">
              <Form.Control
                size="sm"
                placeholder="Write a thoughtful comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="rounded-pill px-3"
              />
            </Form>
          </>
        )}

        {/*  LIKES TAB */}
        {activeTab === "liked" && post.likes.length > 0 && (
          <div className="mt-3">
            <div className="text-muted small mb-1">
              ❤️ People who liked this
            </div>
            <div className="d-flex flex-wrap gap-2">
              {post.likes.map((l, i) => (
                <Badge
                  key={i}
                  bg="light"
                  text="dark"
                  className="px-3 py-2 rounded-pill shadow-sm"
                >
                  @{l.username}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* COMMENTS TAB  */}
        {activeTab === "commented" &&
          post.comments.length > 0 && (
            <div className="mt-3">
              <div className="text-muted small mb-2">
                💬 Conversation
              </div>

              {post.comments.map((c, i) => (
                <div
                  key={i}
                  className="mb-2 p-3 bg-light rounded-4"
                >
                  <div className="fw-semibold text-primary small">
                    @{c.username}
                  </div>
                  <div className="small text-dark">
                    {c.text}
                  </div>
                </div>
              ))}
            </div>
          )}
      </Card.Body>
    </Card>

  );
}
