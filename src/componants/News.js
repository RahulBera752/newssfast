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
          "https://sample-api-black.vercel.app/api/v1/blogs"
        );
        const data = await res.json();

        const categoryBlogs =
          data.blogs?.filter(
            (b) =>
              b.category?.toLowerCase() ===
              category.toLowerCase()
          ) || [];

        setBlogs(categoryBlogs);
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
        const text =
          `${b.title} ${b.description} ${b.content_text} ${b.content}`.toLowerCase();
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

      <div className="row">
        {filteredBlogs.map((blog) => (
          <div className="col-md-4 mb-4" key={blog.id}>
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
