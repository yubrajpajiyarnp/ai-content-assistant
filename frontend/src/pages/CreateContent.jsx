import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CreateContent() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
      if (type === "success") {
        navigate("/");
      }
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setError("Title and Content Body are required.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    try {
      await API.post("/content", {
        title: title.trim(),
        body: body.trim(),
        tags: tags.trim(),
      });

      showToast("Content created successfully!");
      setTitle("");
      setBody("");
      setTags("");
    } catch (error) {
      console.error(error);
      showToast("Failed to create content.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container animate-fade-in" style={{ maxWidth: "700px" }}>
      {toast && (
        <div className="toast-container">
          <div className={`toast toast-${toast.type}`}>
            {toast.type === "success" ? "✓" : "✗"} {toast.message}
          </div>
        </div>
      )}

      <div className="page-header" style={{ textAlign: "center", marginBottom: "24px" }}>
        <h1>Create Content</h1>
        <p>Draft a new piece of content manually for your library.</p>
      </div>

      <div className="glass-panel" style={{ padding: "32px" }}>
        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{ color: "var(--danger)", marginBottom: "16px", fontSize: "0.9rem" }}>
              ⚠️ {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="content-title">Title</label>
            <input
              id="content-title"
              type="text"
              className="form-control"
              placeholder="e.g., 5 Tips for Better SEO"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content-body">Content Body</label>
            <textarea
              id="content-body"
              className="form-control"
              placeholder="Write your article, blog post, or update here..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows="10"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content-tags">Tags (comma-separated)</label>
            <input
              id="content-tags"
              type="text"
              className="form-control"
              placeholder="e.g., SEO, Writing, Marketing"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "32px" }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/")}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`btn btn-primary ${isSubmitting ? "btn-disabled" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Content"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default CreateContent;