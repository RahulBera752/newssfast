import React from "react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1522252234503-e356532cafd5";

const NewsItem = ({ article, onArticleClick }) => {
  if (!article) return null;

  const {
    title,
    description,
    image_url,
    source_id,
    pubDate,
    category,
    link,
  } = article;

  const validImage =
    image_url && image_url.startsWith("http")
      ? image_url
      : FALLBACK_IMAGE;

  return (
    <div
      className="premium-card h-100"
      onClick={() =>
        link
          ? window.open(link, "_blank")
          : onArticleClick(article)
      }
      style={{ cursor: "pointer" }}
    >
      {/* CATEGORY */}
      <span className="premium-badge">
        {Array.isArray(category)
          ? category[0]
          : category || "NEWS"}
      </span>

      {/* IMAGE */}
      <img
        src={validImage}
        alt={title}
        className="premium-img"
        onError={(e) => {
          e.target.src = FALLBACK_IMAGE;
        }}
      />

      {/* BODY */}
      <div className="premium-body">
        <h5>{title}</h5>

        <p>
          {description
            ? description.slice(0, 100) + "..."
            : "Latest breaking news update."}
        </p>

        <small>
          {source_id || "News Source"}

          {pubDate &&
            ` • ${new Date(pubDate).toDateString()}`}
        </small>

        <button className="premium-btn">
          Read More
        </button>
      </div>
    </div>
  );
};

export default NewsItem;