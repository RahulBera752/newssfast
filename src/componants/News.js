import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsItem from "./NwesItem";
import Spinner from "./Spinner";

const News = ({ searchQuery, onArticleClick }) => {
  const { category } = useParams();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `NewsFast – ${category}`;

    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `https://newsdata.io/api/1/news?apikey=pub_14e993d63a8045c284641f99eba3d175&country=in&language=en&category=${category}`
        );

        const data = await res.json();

        console.log(data);

        setBlogs(data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [category]);

  const q = searchQuery?.toLowerCase().trim();

  const filteredBlogs = q
    ? blogs.filter((b) => {
        const text = `
          ${b.title || ""}
          ${b.description || ""}
          ${b.content || ""}
          ${b.category || ""}
        `.toLowerCase();

        return text.includes(q);
      })
    : blogs;

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

      {/* RESULT COUNT */}
      {q && !loading && (
        <p className="text-center text-muted mb-4">
          {filteredBlogs.length} result
          {filteredBlogs.length !== 1 && "s"} found for "{searchQuery}"
        </p>
      )}

      {loading && <Spinner />}

      {/* NO RESULTS */}
      {!loading && q && filteredBlogs.length === 0 && (
        <p className="text-center text-danger fs-5">
          No results found
        </p>
      )}

      {/* ARTICLES */}
      <div className="row">
        {filteredBlogs.map((blog, index) => (
          <div className="col-md-4 mb-4" key={index}>
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