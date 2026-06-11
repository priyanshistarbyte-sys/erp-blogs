import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'About Us | ERP-blogs' };

export default function AboutPage() {
  return (
    <div className="about-main container" style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}>
      <section className="about-hero-card">
        <div className="about-logo-group">
          <span className="logo-icon">📝</span>
          <h1 className="logo">ERP-blogs</h1>
        </div>
        <p className="about-hero-lead">
          <strong>ERP-blogs</strong> is a creative hub for modern web designers, developers, and storytellers. Our goal:{' '}
          <strong>inspire your next digital breakthrough</strong> with practical guides, honest reviews, and lively community discussions.
        </p>
      </section>

      <section className="about-section">
        <h2 className="about-title">Our Mission</h2>
        <p>
          We believe every creator deserves <span className="about-highlight">beautiful, accessible, and authentic web experiences</span>.<br />
          Our tutorials, resources, and stories help you embrace the magic of UI/UX, design best practices, and tech trends—on every device.
        </p>
      </section>

      <section className="about-values-wrap">
        <h2 className="about-title">Our Values</h2>
        <ul className="about-values-list">
          <li><strong>Clarity:</strong> Design and writing that make sense and empower.</li>
          <li><strong>Inclusivity:</strong> Everything on ERP-blogs is accessible to all—no exceptions.</li>
          <li><strong>Learning Together:</strong> We grow as a community, sharing mistakes and wins.</li>
          <li><strong>Authenticity:</strong> Real voices, honest feedback, real people.</li>
        </ul>
      </section>

      <section className="about-contact">
        <h2 className="about-title">Connect With Us</h2>
        <p className="about-contact-invite">Got a question? Want to collaborate? Reach out anytime&mdash;we love meeting new creators!</p>
        <ul className="about-contact-list">
          <li><span className="contact-icon">✉️</span> <a href="mailto:info.erptips@gmail.com">info.erptips@gmail.com</a></li>
          <li><span className="contact-icon">🐦</span> <a href="#">@ ERP-blogs</a></li>
          <li><span className="contact-icon">🌐</span> <a href="#">Join our Community</a></li>
        </ul>
      </section>
    </div>
  );
}
