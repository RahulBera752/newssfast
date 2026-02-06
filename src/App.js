import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./componants/Navbar";
import Home from "./componants/Home";
import News from "./componants/News";
import ArticleModal from "./componants/ArticleModal";
import Footer from "./componants/Footer";

/* ✅ Footer Pages */
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import HelpCenter from "./pages/HelpCenter";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Payments from "./pages/Payments";
import Returns from "./pages/Returns";

function AppRoutes({
  searchQuery,
  setSearchQuery,
  openModal,
}) {
  const location = useLocation();

  // ✅ SCROLL TO TOP ON EVERY ROUTE CHANGE
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <Routes location={location} key={location.pathname}>

      {/* Home */}
      <Route
        path="/"
        element={
          <Home
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onArticleClick={openModal}
          />
        }
      />

      {/* Footer Pages */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/help-center" element={<HelpCenter />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/returns" element={<Returns />} />

      {/* Category Route */}
      <Route
        path="/:category"
        element={
          <News
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onArticleClick={openModal}
          />
        }
      />
    </Routes>
  );
}


      

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);

  // Fetch blogs once
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          "https://sample-api-black.vercel.app/api/v1/blogs"
        );
        const data = await res.json();
        setAllBlogs(data.blogs || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchBlogs();
  }, []);

  const openModal = (article) => {
    setSelectedArticle(article);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedArticle(null);
    document.body.style.overflow = "auto";
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          blogs={allBlogs}
        />

<main className="flex-grow-1 app-main">
          <AppRoutes
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            openModal={openModal}
          />
        </main>

        <Footer />

        {selectedArticle && (
          <ArticleModal
            article={selectedArticle}
            onClose={closeModal}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
