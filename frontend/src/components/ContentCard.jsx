import { Link } from "react-router-dom";

function ContentCard({ item, onDelete }) {
  // Parse tags if they exist. We handle comma-separated string, array or JSON string formats safely
  let tagsList = [];
  if (item.tags) {
    if (typeof item.tags === "string") {
      try {
        const parsed = JSON.parse(item.tags);
        tagsList = Array.isArray(parsed) ? parsed : [item.tags];
      } catch {
        tagsList = item.tags.split(",").map(t => t.trim()).filter(Boolean);
      }
    } else if (Array.isArray(item.tags)) {
      tagsList = item.tags;
    }
  }

  // Format created date nicely
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      // Fallback for invalid SQLite timestamp strings
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <article className="content-card glass-panel animate-fade-in">
      <div className="content-card-header">
        <h2 className="content-card-title">{item.title}</h2>
      </div>

      <p className="content-card-body">{item.body}</p>

      <div className="content-card-meta">
        {tagsList.length > 0 && (
          <div className="tag-list">
            {tagsList.map((tag, idx) => (
              <span key={idx} className="tag-badge">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="content-card-footer">
          <time className="card-date" dateTime={item.created_at}>
            {formatDate(item.created_at)}
          </time>

          <div className="card-actions">
            <Link 
              to={`/edit/${item.id}`} 
              className="btn btn-secondary btn-sm"
              title="Edit Content"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit
            </Link>
            
            <button 
              onClick={() => onDelete(item.id)}
              className="btn btn-danger btn-sm"
              title="Delete Content"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ContentCard;
