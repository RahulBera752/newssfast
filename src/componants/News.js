import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsItem from "./NwesItem";
import Spinner from "./Spinner";

const News = ({ searchQuery, onArticleClick }) => {
  const { category } = useParams();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = `NewsFast – ${category}`;

    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `https://newsdata.io/api/1/news?apikey=pub_e559087845e6452eb2c1f17fc8eec447&country=in&language=en&category=${category}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch news");
        }

        const data = await res.json();

        console.log(data);

        // guarantee array
        setBlogs(Array.isArray(data.results) ? data.results : []);
      } catch (err) {
        console.error(err);
        setError("Unable to load articles. Please try again.");
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [category]);

  const q = searchQuery?.toLowerCase().trim();

  const filteredBlogs = Array.isArray(blogs)
    ? q
      ? blogs.filter((b) => {
          const text = `
            ${b.title || ""}
            ${b.description || ""}
            ${b.content || ""}
            ${(b.category || []).join(" ")}
          `.toLowerCase();

          return text.includes(q);
        })
      : blogs
    : [];

  return (
    <section
      className="container"
      style={{
        marginTop: "120px",
        marginBottom: "120px",
      }}
    >
      <h2
        className="text-center mb-4 fw-bold text-capitalize"
        style={{
          color: "#e5e7eb",
          letterSpacing: "0.6px",
          textShadow: "0 6px 20px rgba(0,0,0,0.45)",
        }}
      >
        {category} Articles
      </h2>

      {q && !loading && (
        <p className="text-center text-muted mb-4">
          {filteredBlogs.length} result
          {filteredBlogs.length !== 1 && "s"} found for "{searchQuery}"
        </p>
      )}

      {loading && <Spinner />}

      {error && (
        <p className="text-center text-danger fs-5">
          {error}
        </p>
      )}

      {!loading && !error && q && filteredBlogs.length === 0 && (
        <p className="text-center text-warning fs-5">
          No results found
        </p>
      )}

      {!loading &&
        !error &&
        filteredBlogs.length === 0 &&
        !q && (
          <p className="text-center text-warning fs-5">
            No articles available
          </p>
        )}

      <div className="row">
        {Array.isArray(filteredBlogs) &&
          filteredBlogs.map((blog, index) => (
            <div className="col-md-4 mb-4" key={blog.article_id || index}>
              <NewsItem
                article={blog}
                onArticleClick={onArticleClick}
              />
            </div>
          ))}
      </div>
    </section>
  );
};

export default News;