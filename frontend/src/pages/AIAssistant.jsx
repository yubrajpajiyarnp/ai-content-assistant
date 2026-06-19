import { useState } from "react";
import API from "../services/api";

function AIAssistant() {
  const [content, setContent] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  
  // States for the Save Modal
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveTitle, setSaveTitle] = useState("");
  const [saveTags, setSaveTags] = useState("");
  const [saving, setSaving] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    showToast("Copied to clipboard!");
  };

  const improveContent = async () => {
    if (!content.trim()) {
      showToast("Please enter some content to improve.", "error");
      return;
    }
    try {
      setLoading(true);
      setResult("");
      const response = await API.post("/ai/improve", {
        content,
      });
      setResult(response.data.improvedContent || "No response received.");
      showToast("Content improved!");
    } catch (error) {
      console.error(error);
      showToast("Error generating improved content.", "error");
    } finally {
      setLoading(false);
    }
  };

  const generateSEO = async () => {
    if (!content.trim()) {
      showToast("Please enter some content for SEO metadata.", "error");
      return;
    }
    try {
      setLoading(true);
      setResult("");
      const response = await API.post("/ai/seo-meta", {
        content,
      });
      setResult(response.data.seo || "No response received.");
      showToast("SEO Metadata generated!");
    } catch (error) {
      console.error(error);
      showToast("Error generating SEO tags.", "error");
    } finally {
      setLoading(false);
    }
  };

  const generateIdeas = async () => {
    if (!content.trim()) {
      showToast("Please enter a topic to generate ideas.", "error");
      return;
    }
    try {
      setLoading(true);
      setResult("");
      const response = await API.post("/ai/ideas", {
        topic: content,
      });
      setResult(response.data.ideas || "No response received.");
      showToast("Ideas generated!");
    } catch (error) {
      console.error(error);
      showToast("Error generating ideas.", "error");
    } finally {
      setLoading(false);
    }
  };

  const saveToContentHub = async (e) => {
    e.preventDefault();
    if (!saveTitle.trim()) {
      showToast("Title is required.", "error");
      return;
    }
    try {
      setSaving(true);
      await API.post("/content", {
        title: saveTitle.trim(),
        body: result,
        tags: saveTags.trim(),
      });
      showToast("Saved to Content Hub successfully!");
      setShowSaveModal(false);
      setSaveTitle("");
      setSaveTags("");
    } catch (error) {
      console.error(error);
      showToast("Failed to save content.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="container animate-fade-in">
      {/* Toast Alert */}
      {toast && (
        <div className="toast-container">
          <div className={`toast toast-${toast.type}`}>
            {toast.type === "success" ? "✓" : "✗"} {toast.message}
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="page-header">
        <h1>AI Assistant</h1>
        <p>Use local AI to write, rewrite, format, and generate ideas.</p>
      </div>

      <div className="ai-layout">
        
        {/* Left column: input and controls */}
        <section className="ai-controls">
          <div className="glass-panel" style={{ padding: "24px" }}>
            <div className="form-group">
              <label htmlFor="ai-input">Your Input (Topic, Idea, or Content)</label>
              <textarea
                id="ai-input"
                className="form-control"
                rows="12"
                placeholder="Enter some text or a topic to begin..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ resize: "vertical" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button onClick={improveContent} className={`btn btn-primary ${loading ? "btn-disabled" : ""}`} disabled={loading}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Improve Writing
              </button>

              <button onClick={generateSEO} className={`btn btn-secondary ${loading ? "btn-disabled" : ""}`} disabled={loading}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Generate SEO Meta
              </button>

              <button onClick={generateIdeas} className={`btn btn-secondary ${loading ? "btn-disabled" : ""}`} disabled={loading}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 113.536 0V21h2v-2.242a5 5 0 013.536 0z" />
                </svg>
                Brainstorm Ideas
              </button>
            </div>
          </div>
        </section>

        {/* Right column: results screen */}
        <section className="glass-panel ai-output-container">
          <div className="ai-output-header">
            <h3>AI Response</h3>
            {result && !loading && (
              <div style={{ display: "flex", gap: "8px" }}>
                <button className="btn btn-secondary btn-sm" onClick={handleCopy}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy
                </button>
                <button className="btn btn-success btn-sm" onClick={() => setShowSaveModal(true)}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Save to Hub
                </button>
              </div>
            )}
          </div>

          <div className="ai-output-body">
            {loading ? (
              <div className="skeleton-wrapper" style={{ padding: "12px 0" }}>
                <div className="skeleton-line"></div>
                <div className="skeleton-line medium"></div>
                <div className="skeleton-line short"></div>
                <div className="skeleton-line" style={{ marginTop: "12px" }}></div>
                <div className="skeleton-line medium"></div>
              </div>
            ) : result ? (
              result
            ) : (
              <div className="ai-output-placeholder">
                <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.904-4.452L18 21l4.5-9-4.5-9-1.096 2.193L9 3l.813 5.096L5 9l4.813 6.904z" />
                </svg>
                <p>AI output will be displayed here.</p>
                <p style={{ fontSize: "0.85rem", marginTop: "4px" }}>Enter input and choose an assistant tool on the left to start.</p>
              </div>
            )}
          </div>
        </section>

      </div>

      {/* Save to Hub Modal */}
      {showSaveModal && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel">
            <h2 style={{ marginBottom: "16px" }}>Save AI Output to Content Hub</h2>
            <form onSubmit={saveToContentHub}>
              
              <div className="form-group">
                <label htmlFor="modal-title">Content Title</label>
                <input
                  id="modal-title"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Generated Content Strategy"
                  value={saveTitle}
                  onChange={(e) => setSaveTitle(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label htmlFor="modal-tags">Tags (comma-separated)</label>
                <input
                  id="modal-tags"
                  type="text"
                  className="form-control"
                  placeholder="e.g. AI-Generated, Blog, SEO"
                  value={saveTags}
                  onChange={(e) => setSaveTags(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "24px" }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowSaveModal(false)}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`btn btn-success ${saving ? "btn-disabled" : ""}`}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Confirm Save"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default AIAssistant;