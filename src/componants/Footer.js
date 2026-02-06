import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="text-white pt-5 pb-4 mt-5"
      style={{
        background: "linear-gradient(180deg, #020617, #0f172a)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="container">
        <div className="row">

          {/* Brand */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h2 className="fw-bold mb-3" style={{ fontSize: 28 }}>
              NewsFast
            </h2>
            <p style={{ fontSize: 14, color: "#9ca3af" }}>
              Fast, trusted & modern news platform.
            </p>
          </div>

          {/* ABOUT */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="fw-semibold mb-3">ABOUT</h5>
            <ul className="list-unstyled">
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
            </ul>
          </div>

          {/* HELP */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="fw-semibold mb-3">HELP</h5>
            <ul className="list-unstyled">
              <li><Link to="/payments" className="footer-link">Payments</Link></li>
              <li><Link to="/returns" className="footer-link">Cancellation & Returns</Link></li>
              <li><Link to="/faq" className="footer-link">FAQ</Link></li>
            </ul>
          </div>

          {/* POLICY */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="fw-semibold mb-3">CONSUMER POLICY</h5>
            <ul className="list-unstyled">
              <li><Link to="/returns" className="footer-link">Return Policy</Link></li>
              <li><Link to="/terms" className="footer-link">Terms Of Use</Link></li>
              <li><Link to="/privacy" className="footer-link">Privacy</Link></li>
            </ul>
          </div>

          {/* SOCIAL (NO <a> TAGS NOW) */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="fw-semibold mb-3">SOCIAL</h5>

            <div className="d-flex mb-4">
              <span className="me-3 social-icon"><FaFacebookF /></span>
              <span className="me-3 social-icon"><FaInstagram /></span>
              <span className="me-3 social-icon"><FaTwitter /></span>
              <span className="social-icon"><FaYoutube /></span>
            </div>

            <h6 className="fw-semibold mb-2">Mail Us</h6>
            <p style={{ fontSize: 13, color: "#9ca3af" }}>newsfast@gmail.com</p>
            <p style={{ fontSize: 13, color: "#9ca3af" }}>033-98654422</p>
          </div>
        </div>

        <div className="row mt-4 pt-3 border-top border-secondary">
          <div className="col-md-8">
            <p style={{ fontSize: 13, color: "#9ca3af" }}>
              © 2026 NewsFast.com
            </p>
          </div>
          <div className="col-md-4 text-md-end">
            <Link to="/help-center" className="footer-link">Help Center</Link>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link {
          color: #9ca3af;
          text-decoration: none;
          transition: 0.2s;
        }
        .footer-link:hover {
          color: #fff;
          padding-left: 4px;
        }
        .social-icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          color: #e5e7eb;
          transition: 0.25s;
          cursor: pointer;
        }
        .social-icon:hover {
          background: rgba(255,255,255,0.2);
          transform: translateY(-2px);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
