import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms & Conditions | ERP-blogs' };

export default function TermsPage() {
  return (
    <div className="privacy-policy-card container">
      <h1 className="privacy-title">Terms &amp; Conditions</h1>
      <div className="privacy-meta">Last updated: July 23, 2025</div>
      <section>
        <h2>1. Introduction</h2>
        <p>Welcome to <strong>ERP-blogs</strong>. By using our website, you agree to comply with these terms and conditions. Please read them carefully.</p>
      </section>
      <section>
        <h2>2. Website Use</h2>
        <ul>
          <li>ERP-blogs provides content for personal, non-commercial use. You may not reproduce, distribute, or use material for commercial purposes without our written permission.</li>
          <li>You agree not to misuse or interfere with the website&apos;s operation or security.</li>
        </ul>
      </section>
      <section>
        <h2>3. User Content</h2>
        <ul>
          <li>When submitting comments, you agree they are your own and do not violate any law or third-party rights.</li>
          <li>We may, at our discretion, remove any content deemed offensive, spammy, unlawful, or non-compliant with our community standards.</li>
        </ul>
      </section>
      <section>
        <h2>4. Intellectual Property</h2>
        <p>All content (text, design, graphics, logo, etc.) is the property of ERP-blogs or its content providers. You may not use or copy it beyond personal use except as explicitly authorized by us.</p>
      </section>
      <section>
        <h2>5. Links to Other Websites</h2>
        <p>Our site may contain links to third-party websites. We are not responsible for their content, availability, or practices.</p>
      </section>
      <section>
        <h2>6. Limitation of Liability</h2>
        <p>ERP-blogs and its team are not liable for any damages, direct or indirect, arising from your use of the website. Content is provided &quot;as is&quot; without warranties of any kind.</p>
      </section>
      <section>
        <h2>7. Changes to Terms</h2>
        <p>We may revise these terms from time to time. Please check this page regularly for updates.</p>
      </section>
      <section>
        <h2>8. Governing Law</h2>
        <p>These terms shall be governed by the laws of your country of residence, without regard to conflict of law provisions.</p>
      </section>
      <section>
        <h2>9. Contact</h2>
        <p>If you have any questions, <a href="/contact-us">contact us</a> or email <a href="mailto:info.erptips@gmail.com">info.erptips@gmail.com</a>.</p>
      </section>
    </div>
  );
}
