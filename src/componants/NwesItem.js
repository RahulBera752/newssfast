import React from "react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1522252234503-e356532cafd5";

const NewsItem = ({ article, onArticleClick }) => {
  if (!article) return null;

  const {
    title,
    description,
    image,
    author,
    createdAt,
    category,
  } = article;

  const validImage =
    image && image.startsWith("http") ? image : FALLBACK_IMAGE;

  return (
    <div
      className="premium-card h-100"
      onClick={() => onArticleClick(article)}
    >
      {/* CATEGORY */}
      <span className="premium-badge">
        {category}
      </span>

      <img
        src={validImage}
        alt={title}
        className="premium-img"
        onError={(e) => (e.target.src = FALLBACK_IMAGE)}
      />

      <div className="premium-body">
        <h5>{title}</h5>
        <p>{description?.slice(0, 100)}...</p>

        <small>
          By {author || "Admin"}{" "}
          {createdAt && `• ${new Date(createdAt).toDateString()}`}
        </small>

        <button className="premium-btn">
          Read More
        </button>
      </div>
    </div>
  );
};

export default NewsItem;
