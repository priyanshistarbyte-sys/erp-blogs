import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Cookie Policy (EU) | ERP-blogs' };

export default function CookiePolicyPage() {
  return (
    <div className="privacy-policy-card container">
      <h1 className="privacy-title">Cookie Policy (EU)</h1>
      <section>
        <h2>1. Introduction</h2>
        <p>This Cookie Policy explains how ERP-blogs uses cookies on our website. By using our website, you agree to the use of cookies as described in this policy.</p>
      </section>
      <section>
        <h2>2. What are cookies?</h2>
        <p>Cookies are small text files that websites place on your computer or mobile device when you visit them. They help websites remember information about your visit.</p>
      </section>
      <section>
        <h2>3. What are scripts?</h2>
        <p>A script is a piece of program code that makes the website function properly and interactively. This code is executed on our server or on your device.</p>
      </section>
      <section>
        <h2>4. What is a web beacon?</h2>
        <p>A web beacon is a small, invisible piece of text or image on a website used to monitor traffic. Web beacons help websites understand how users interact with their pages.</p>
      </section>
      <section>
        <h2>5. Cookies</h2>
        <p>We use both functional and analytical cookies to optimize your experience on our website. Some cookies require your consent.</p>
      </section>
      <section>
        <h2>6. Placed cookies</h2>
        <ul>
          <li>Functional cookies: Necessary for the website to function properly.</li>
          <li>Analytical cookies: Used to gain insight into website usage.</li>
          <li>Marketing cookies: Used to track users and display personalized ads.</li>
        </ul>
      </section>
      <section>
        <h2>7. Consent</h2>
        <p>When you visit our website for the first time, we will show you a pop-up with an explanation about cookies. Once you click on &quot;Accept&quot;, you consent to us using all cookies.</p>
      </section>
      <section>
        <h2>8. Enabling/disabling and deleting cookies</h2>
        <p>You can use your internet browser to delete cookies automatically or manually. You can also specify that certain cookies may not be placed.</p>
      </section>
      <section>
        <h2>9. Your rights with respect to personal data</h2>
        <p>You have the following rights regarding your personal data:</p>
        <ul>
          <li>Right to access your data</li>
          <li>Right to rectification</li>
          <li>Right to restrict processing</li>
          <li>Right to object</li>
          <li>Right to data portability</li>
        </ul>
      </section>
      <section>
        <h2>10. Contact details</h2>
        <p>For questions about our Cookie Policy, please <a href="/contact-us">contact us</a> or email <a href="mailto:info.erptips@gmail.com">info.erptips@gmail.com</a>.</p>
      </section>
    </div>
  );
}
