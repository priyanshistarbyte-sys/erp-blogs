import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy | ERP-blogs' };

export default function PrivacyPolicyPage() {
  return (
    <div className="privacy-policy-card container">
      <h1 className="privacy-title">Privacy Policy</h1>
      <div className="privacy-meta">Last updated: July 23, 2025</div>
      <section>
        <h2>1. Introduction</h2>
        <p>Welcome to <strong>ERP-blogs</strong>. Your privacy is important to us. This Privacy Policy explains how we collect, use, protect, and share information gathered through our website. By using our website, you agree to the terms outlined here.</p>
      </section>
      <section>
        <h2>2. Information We Collect</h2>
        <ul>
          <li><strong>Personal Information:</strong> Name, email address, or other contact details if you subscribe, comment, or contact us.</li>
          <li><strong>Usage Data:</strong> Browser type, referring pages, time spent, and other analytics automatically collected via cookies or similar technologies.</li>
          <li><strong>Comments and User Content:</strong> Any information you post in comments or send to us directly.</li>
        </ul>
      </section>
      <section>
        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To provide and improve our website, content, and user experience.</li>
          <li>To respond to comments, contact requests, or subscription signups.</li>
          <li>To send you updates or newsletters (only if you opt in).</li>
          <li>To monitor website performance and detect security or technical issues.</li>
        </ul>
      </section>
      <section>
        <h2>4. Cookies &amp; Tracking Technologies</h2>
        <p>We use cookies and similar technologies to analyze traffic and usage patterns, and remember your preferences.</p>
      </section>
      <section>
        <h2>5. Sharing Your Data</h2>
        <ul>
          <li>We do <strong>not</strong> sell, rent, or trade your personal information.</li>
          <li>We may share it with trusted service providers strictly as needed to operate the website.</li>
          <li>Information may be disclosed if required by law or a valid legal request.</li>
        </ul>
      </section>
      <section>
        <h2>6. Data Security</h2>
        <p>All data transmissions are protected with HTTPS encryption and regular security measures are taken to keep your data safe.</p>
      </section>
      <section>
        <h2>7. Third-Party Links</h2>
        <p>Our site may contain links to external websites. We are not responsible for their content or privacy practices.</p>
      </section>
      <section>
        <h2>8. Children&apos;s Privacy</h2>
        <p>Our website is not intended for children under 13. If we learn such data has been collected, we will delete it promptly.</p>
      </section>
      <section>
        <h2>9. Your Rights &amp; Choices</h2>
        <p>Depending on your location, you may have rights to access, update, or delete your personal information. For any data requests, <a href="mailto:info.erptips@gmail.com">contact us</a>.</p>
      </section>
      <section>
        <h2>10. Updates to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>
      </section>
      <section>
        <h2>11. Contact Us</h2>
        <p>If you have any questions, email us at <a href="mailto:info.erptips@gmail.com">info.erptips@gmail.com</a> or use our <a href="/contact-us">contact form</a>.</p>
      </section>
    </div>
  );
}
