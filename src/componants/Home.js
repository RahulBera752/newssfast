import React, { useEffect, useState } from "react";
import NewsItem from "./NwesItem";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

/* 🔤 TYPEWRITER */
const useTypewriter = (text, speed = 80) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;

    setDisplayText("");

    const interval = setInterval(() => {
      setDisplayText((prev) => prev + text.charAt(index));

      index++;

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayText;
};

const Home = ({
  searchQuery,
  setSearchQuery,
  onArticleClick,
}) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const typedText = useTypewriter(
    "Stay Updated with NewsFast",
    90
  );

  useEffect(() => {
    document.title = "NewsFast – Home";

    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `https://newsdata.io/api/1/news?apikey=pub_14e993d63a8045c284641f99eba3d175&country=in&language=en`
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
  }, []);

  const q = searchQuery?.toLowerCase().trim();

  const matchesSearch = (b) => {
    if (!q) return true;

    const text = `
      ${b.title || ""}
      ${b.description || ""}
      ${b.content || ""}
      ${b.category || ""}
    `.toLowerCase();

    return text.includes(q);
  };

  const filteredBlogs = q
    ? blogs.filter(matchesSearch)
    : blogs.slice(0, 12);

  const suggestedBlogs = blogs.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section
        className="text-light text-center py-5 mt-5"
        style={{
          background:
            "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        }}
      >
        <div className="container">
          <h1
            className="display-5 fw-bold mb-3"
            style={{
              minHeight: "72px",
              letterSpacing: "0.8px",
            }}
          >
            {typedText}
            <span className="typing-cursor">|</span>
          </h1>

          <p className="lead opacity-75 mb-4">
            Technology • Business • Sports
          </p>

          {/* CATEGORY BUTTONS */}
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            {["technology", "business", "sports"].map(
              (cat) => (
                <button
                  key={cat}
                  className="btn btn-outline-light rounded-pill px-4"
                  onClick={() => {
                    setSearchQuery("");
                    navigate(`/${cat}`);
                  }}
                >
                  {cat.toUpperCase()}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="container my-5">
        <h2
          className="text-center mb-3 fw-bold"
          style={{
            color: "#e5e7eb",
            letterSpacing: "0.5px",
            textShadow:
              "0 4px 20px rgba(0,0,0,0.6)",
          }}
        >
          {q ? "Search Results" : "Latest Articles"}
        </h2>

        {q && !loading && (
          <p className="text-center text-muted mb-4">
            {filteredBlogs.length} result
            {filteredBlogs.length !== 1 &&
              "s"}{" "}
            found for "{searchQuery}"
          </p>
        )}

        {loading && <Spinner />}

        {/* NO RESULTS */}
        {!loading &&
          q &&
          filteredBlogs.length === 0 && (
            <div className="text-center">
              <p className="text-danger fs-5">
                No results found for "
                {searchQuery}"
              </p>

              <p className="fw-semibold mt-3">
                You can try:
              </p>

              <div className="d-flex justify-content-center gap-3 mb-4">
                {[
                  "technology",
                  "business",
                  "sports",
                ].map((cat) => (
                  <button
                    key={cat}
                    className="btn btn-outline-primary rounded-pill px-4"
                    onClick={() => {
                      setSearchQuery("");
                      navigate(`/${cat}`);
                    }}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>

              <h5 className="mb-4">
                Popular Articles
              </h5>

              <div className="row justify-content-center">
                {suggestedBlogs.map(
                  (blog, index) => (
                    <div
                      className="col-md-4 mb-4"
                      key={index}
                    >
                      <NewsItem
                        article={blog}
                        onArticleClick={
                          onArticleClick
                        }
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          )}

        {/* ARTICLES */}
        <div className="row">
          {filteredBlogs.map((blog, index) => (
            <div
              className="col-md-4 mb-4"
              key={index}
            >
              <NewsItem
                article={blog}
                onArticleClick={onArticleClick}
              />
            </div>
          ))}
        </div>
      </section>

      {/* CURSOR */}
      <style>{`
        .typing-cursor {
          display: inline-block;
          margin-left: 6px;
          animation: blink 1s infinite;
          font-weight: 300;
          opacity: 0.9;
        }

        @keyframes blink {
          0%, 50%, 100% {
            opacity: 1;
          }

          25%, 75% {
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default Home;