import React, { useEffect } from "react";

const ArticleModal = ({ article, onClose }) => {
  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("modal-backdrop")) {
      onClose();
    }
  };

  // SAFE date formatter
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date)
      ? "N/A"
      : date.toLocaleDateString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
  };

  // Category display
  const getCategoryDisplayName = (category) => {
    switch (category?.toLowerCase()) {
      case "lifestyle":
        return "Lifestyle";
      case "design":
        return "Design";
      case "technology":
        return "Technology";
      default:
        return category || "General";
    }
  };

  if (!article) return null;

  // ✅ IMAGE FALLBACK LOGIC (FIXED)
  const articleImage =
    article.image ||
    article.image_url ||
    article.urlToImage ||
    article.thumbnail ||
    null;

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      style={styles.backdrop}
    >
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <span style={styles.categoryBadge}>
            {getCategoryDisplayName(article.category)}
          </span>
          <button onClick={onClose} style={styles.closeButton}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={styles.body}>
          {/* ✅ IMAGE NOW SHOWS */}
          {articleImage && (
            <img
              src={articleImage}
              alt={article.title}
              style={styles.image}
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://images.unsplash.com/photo-1522252234503-e356532cafd5";
              }}
            />
          )}

          <h2 style={styles.title}>{article.title}</h2>

          {/* Meta */}
          <div style={styles.meta}>
            <div>
              <b>By:</b> {article.author || "Admin"}
            </div>
            <div>
              <b>Published:</b>{" "}
              {formatDate(article.publishedAt || article.createdAt)}
            </div>
            {article.category && (
              <div>
                <b>Category:</b>{" "}
                {getCategoryDisplayName(article.category)}
              </div>
            )}
          </div>

          {/* Description */}
          {article.description && (
            <>
              <h4>Description</h4>
              <p style={styles.description}>{article.description}</p>
            </>
          )}

          {/* Content */}
          <h4>Full Content</h4>
          <div style={styles.content}>
            {article.content_text ||
              article.content ||
              article.description ||
              "No content available."}
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <button onClick={onClose} style={styles.secondaryButton}>
            Close
          </button>
          <button
            style={styles.primaryButton}
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: article.title,
                  text: article.description,
                  url: window.location.href,
                });
              }
            }}
          >
            Share Article
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.85)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
    padding: 20,
  },
  modal: {
    background: "#fff",
    borderRadius: 14,
    width: "100%",
    maxWidth: 820,
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px 24px",
    background: "#f8f9fa",
    borderBottom: "1px solid #ddd",
  },
  categoryBadge: {
    background: "linear-gradient(135deg, #0d6efd, #0b5ed7)",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 600,
  },
  closeButton: {
    border: "none",
    background: "none",
    fontSize: 22,
    cursor: "pointer",
  },
  body: {
    padding: 24,
    overflowY: "auto",
  },
  image: {
    width: "100%",
    height: 380,
    objectFit: "cover",
    borderRadius: 10,
    marginBottom: 22,
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 16,
  },
  meta: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
    background: "#f1f3f5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 14,
  },
  description: {
    fontSize: 17,
    lineHeight: 1.6,
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 1.7,
    whiteSpace: "pre-line",
    background: "#f8f9fa",
    padding: 16,
    borderRadius: 8,
  },
  footer: {
    padding: 16,
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
    borderTop: "1px solid #ddd",
    background: "#f8f9fa",
  },
  secondaryButton: {
    padding: "8px 18px",
    background: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  primaryButton: {
    padding: "8px 18px",
    background: "#0d6efd",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
};

export default ArticleModal;
