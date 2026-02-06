import React, { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const CATEGORIES = ["technology", "design", "lifestyle"];

const Navbar = ({ searchQuery, setSearchQuery, blogs = [] }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const q = searchQuery.toLowerCase().trim();

  // 🔍 SEARCH SUGGESTIONS
  const suggestions = useMemo(() => {
    if (!q) return [];

    return blogs
      .filter((b) => {
        const text = `
          ${b.title}
          ${b.description}
          ${b.content}
          ${b.content_text}
          ${b.category}
        `.toLowerCase();
        return text.includes(q);
      })
      .slice(0, 5);
  }, [q, blogs]);

  // ✅ SEARCH BUTTON HANDLER (FINAL FIX)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!q) return;

    // exact category search
    if (CATEGORIES.includes(q)) {
      navigate(`/${q}`);
    } else {
      // 🔥 ALWAYS SEARCH FROM HOME
      navigate("/");
    }

    setShowSuggestions(false);
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* LOGO */}
        <NavLink
  className="navbar-brand fw-bold"
  to="/"
  onClick={() => {
    setSearchQuery("");        // ✅ clear search
    setShowSuggestions(false); // ✅ hide suggestions
    window.scrollTo({ top: 0, behavior: "smooth" }); // ✅ UX polish
  }}
>
  NewsFast
</NavLink>


        {/* TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* NAV LINKS */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {CATEGORIES.map((cat) => (
              <li className="nav-item" key={cat}>
                <NavLink
                  to={`/${cat}`}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active fw-bold" : ""}`
                  }
                  onClick={() => setSearchQuery("")} // ✅ clear search
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* SEARCH */}
          <form
            className="d-flex position-relative"
            onSubmit={handleSubmit}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search by title, description, content, category..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onBlur={() =>
                setTimeout(() => setShowSuggestions(false), 150)
              }
            />

            <button
              className="btn btn-success"
              type="submit"
              disabled={!q}
            >
              Search
            </button>

            {/* 🔽 SUGGESTIONS */}
            {showSuggestions && q && suggestions.length > 0 && (
              <div
                className="list-group position-absolute w-100 shadow"
                style={{ top: "100%", zIndex: 2000 }}
              >
                {suggestions.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    className="list-group-item list-group-item-action"
                    onClick={() => {
                      setSearchQuery(b.title);
                      navigate("/");          // 🔥 FORCE HOME SEARCH
                      setShowSuggestions(false);
                    }}
                  >
                    <strong>{b.title}</strong>
                    <br />
                    <small className="text-muted">
                      Category: {b.category}
                    </small>
                  </button>
                ))}
              </div>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
