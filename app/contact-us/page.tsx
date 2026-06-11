import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Contact Us | ERP-blogs' };

export default function ContactPage() {
  return (
    <div className="contact-wrapper container">
      <section className="contact-card">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-lead">We love hearing from fellow creators! Use the form or reach out directly&mdash;we&apos;ll get back to you within 1 business day.</p>
        <form className="contact-form" autoComplete="off">
          <div className="form-row">
            <input type="text" id="name" name="name" placeholder=" " required autoComplete="name" />
            <label htmlFor="name">Name</label>
          </div>
          <div className="form-row">
            <input type="email" id="email" name="email" placeholder=" " required autoComplete="email" />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-row">
            <textarea id="msg" name="msg" rows={4} minLength={8} placeholder=" " required></textarea>
            <label htmlFor="msg">How can we help you?</label>
          </div>
          <button type="submit" className="contact-submit" disabled title="Demo only. Form disabled">Send Message</button>
        </form>
        <div className="contact-extra">
          <div className="contact-detail">
            <span className="contact-icon">📧</span>
            <a href="mailto:info.erptips@gmail.com">info.erptips@gmail.com</a>
          </div>
          <div className="contact-detail">
            <span className="contact-icon">🐦</span>
            <a href="#">ERP-blogs</a>
          </div>
          <div className="contact-detail">
            <span className="contact-icon">🌐</span>
            <a href="#">Join Community</a>
          </div>
        </div>
      </section>
    </div>
  );
}
