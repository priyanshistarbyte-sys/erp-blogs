import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="container footer-main">
        <section className="footer-about">
          <div className="footer-logo-group">
            <span className="footer-logo-icon">📝</span>
            <span className="footer-logo">ERP-blogs</span>
          </div>
          <p className="footer-about-text">
            Explore ERP strategies, tools, and implementation tips to automate and grow your business faster with modern ERP systems.
          </p>
        </section>
        <nav className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/about-us">About us</Link></li>
            <li><Link href="/contact-us">Contact us</Link></li>
          </ul>
        </nav>
        <nav className="footer-policy">
          <h4>Policies</h4>
          <ul>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms-of-service">Terms &amp; Conditions</Link></li>
            <li><Link href="/cookie-policy-eu">Cookie Policy (EU)</Link></li>
            <li><Link href="/disclaimer">Disclaimer</Link></li>
          </ul>
        </nav>
      </div>
      <div className="container footer-bottom">
        <p>&copy; 2025 ERP-blogs.</p>
      </div>
    </footer>
  );
}
