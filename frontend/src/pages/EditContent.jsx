import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function EditContent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
      if (type === "success") {
        navigate("/");
      }
    }, 1500);
  }



  useEffect(() => {
    let active = true;
    API.get(`/content/${id}`)
      .then((response) => {
        if (active && response.data) {
          setTitle(response.data.title || "");
          setBody(response.data.body || "");
          setTags(response.data.tags || "");
          setLoading(false);
        } else if (active) {
          showToast("Content not found.", "error");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        if (active) {
          showToast("Error loading content details.", "error");
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setError("Title and Content Body are required.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    try {
      await API.put(`/content/${id}`, {
        title: title.trim(),
        body: body.trim(),
        tags: tags.trim(),
      });

      showToast("Content updated successfully!");
    } catch (err) {
      console.error(err);
      showToast("Failed to update content.", "error");
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
        <h1>Edit Content</h1>
        <p>Modify existing content and update the library.</p>
      </div>

      <div className="glass-panel" style={{ padding: "32px" }}>
        {loading ? (
          <div className="skeleton-wrapper">
            <div className="skeleton-title" style={{ width: "30%" }}></div>
            <div className="skeleton-line" style={{ height: "40px" }}></div>
            <div className="skeleton-title" style={{ width: "30%", marginTop: "16px" }}></div>
            <div className="skeleton-line" style={{ height: "120px" }}></div>
            <div className="skeleton-title" style={{ width: "30%", marginTop: "16px" }}></div>
            <div className="skeleton-line" style={{ height: "40px" }}></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ color: "var(--danger)", marginBottom: "16px", fontSize: "0.9rem" }}>
                ⚠️ {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="edit-title">Title</label>
              <input
                id="edit-title"
                type="text"
                className="form-control"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-body">Content Body</label>
              <textarea
                id="edit-body"
                className="form-control"
                placeholder="Content Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows="10"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-tags">Tags (comma-separated)</label>
              <input
                id="edit-tags"
                type="text"
                className="form-control"
                placeholder="Tags"
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
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}

export default EditContent;