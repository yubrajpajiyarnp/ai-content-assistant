import { useEffect, useState } from "react";
import API from "../services/api";
import ContentCard from "../components/ContentCard";
import { Link } from "react-router-dom";

function Dashboard() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [toast, setToast] = useState(null);

  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function fetchContents() {
    try {
      setLoading(true);
      const response = await API.get("/content");
      setContents(response.data);
    } catch (error) {
      console.error(error);
      showToast("Error loading content list.", "error");
    } finally {
      setLoading(false);
    }
  }

  async function deleteContent(id) {
    if (!window.confirm("Are you sure you want to delete this content?")) return;
    try {
      await API.delete(`/content/${id}`);
      showToast("Content deleted successfully.");
      fetchContents(); // Refresh list after delete
    } catch (error) {
      console.error(error);
      showToast("Failed to delete content.", "error");
    }
  }

  useEffect(() => {
    let active = true;
    API.get("/content")
      .then((response) => {
        if (active) {
          setContents(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        if (active) {
          showToast("Error loading content list.", "error");
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  // Extract all unique tags
  const allTags = Array.from(
    new Set(
      contents
        .flatMap((item) => {
          if (!item.tags) return [];
          return item.tags.split(",").map((t) => t.trim()).filter(Boolean);
        })
    )
  );

  // Filter logic
  const filteredContents = contents.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.body.toLowerCase().includes(searchQuery.toLowerCase());

    const itemTags = item.tags
      ? item.tags.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean)
      : [];
    const matchesTag = !selectedTag || itemTags.includes(selectedTag.toLowerCase());

    return matchesSearch && matchesTag;
  });

  return (
    <main className="container">
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
        <h1>Content Hub</h1>
        <p>Manage, edit, and filter your generated content assets.</p>
      </div>

      {/* Stats Cards Row */}
      <section className="stats-container">
        <div className="glass-panel stat-box">
          <div className="stat-value">{contents.length}</div>
          <div className="stat-label">Total Articles</div>
        </div>
        <div className="glass-panel stat-box">
          <div className="stat-value">{allTags.length}</div>
          <div className="stat-label">Unique Tags</div>
        </div>
        <div className="glass-panel stat-box">
          <div className="stat-value" style={{ fontSize: "1.1rem", paddingTop: "12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {contents[0] ? contents[0].title : "None"}
          </div>
          <div className="stat-label">Latest Content</div>
        </div>
      </section>

      {/* Grid wrapper */}
      <div className="dashboard-grid">
        
        {/* Sidebar filters */}
        <aside className="sidebar-panel">
          <div className="glass-panel filters-bar" style={{ flexDirection: "column", alignItems: "stretch" }}>
            <h3 style={{ marginBottom: "12px" }}>Filters</h3>
            
            <div className="form-group">
              <label htmlFor="search">Search Content</label>
              <input
                id="search"
                type="text"
                className="form-control"
                placeholder="Search title, body..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="tag-filter">Filter by Tag</label>
              <select
                id="tag-filter"
                className="form-control"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
              >
                <option value="">All Tags</option>
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>
                    #{tag}
                  </option>
                ))}
              </select>
            </div>

            <Link to="/create" className="btn btn-primary" style={{ marginTop: "8px" }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Create New Content
            </Link>
          </div>
        </aside>

        {/* Content list grid */}
        <section className="main-content-panel">
          {loading ? (
            <div className="glass-panel" style={{ padding: "40px", textAlign: "center" }}>
              <div className="skeleton-wrapper">
                <div className="skeleton-title"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line medium"></div>
                <div className="skeleton-line short"></div>
              </div>
            </div>
          ) : filteredContents.length === 0 ? (
            <div className="glass-panel" style={{ padding: "60px 40px", textAlign: "center" }}>
              <svg width="48" height="48" fill="none" stroke="var(--text-muted)" strokeWidth="2" viewBox="0 0 24 24" style={{ margin: "0 auto 16px" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0V9a2 2 0 00-2-2H6a2 2 0 00-2 2v4m16 0h-1.5m-13.5 0H4" />
              </svg>
              <h3>No content found</h3>
              <p style={{ marginTop: "8px", marginBottom: "20px" }}>
                {contents.length === 0 
                  ? "You haven't created any content yet. Start by writing or using the AI assistant!" 
                  : "No items match your search or tag filter selections."}
              </p>
              {contents.length > 0 && (
                <button 
                  onClick={() => { setSearchQuery(""); setSelectedTag(""); }}
                  className="btn btn-secondary"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="card-grid">
              {filteredContents.map((item) => (
                <ContentCard
                  key={item.id}
                  item={item}
                  onDelete={deleteContent}
                />
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}

export default Dashboard;