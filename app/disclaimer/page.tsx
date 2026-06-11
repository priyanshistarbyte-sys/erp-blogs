import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Disclaimer | ERP-blogs' };

export default function DisclaimerPage() {
  return (
    <div className="privacy-policy-card container">
      <h1 className="privacy-title">Disclaimer</h1>
      <section>
        <h2>1. Introduction</h2>
        <p>Welcome to ERP-blogs! The information provided on this website is for general informational purposes only. All content on this site is provided in good faith, however, we make no representation or warranty of any kind regarding its accuracy, adequacy, validity, reliability, availability, or completeness.</p>
      </section>
      <section>
        <h2>2. External Links Disclaimer</h2>
        <p>Our website may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.</p>
      </section>
      <section>
        <h2>3. Affiliate Disclaimer</h2>
        <p>Some of the links on this website may be affiliate links. This means we may earn a small commission if you click on the link and make a purchase. This comes at no additional cost to you.</p>
      </section>
      <section>
        <h2>4. Professional Advice Disclaimer</h2>
        <p>The information provided on this website is not intended to be a substitute for professional advice. Always seek the advice of qualified professionals regarding any questions you may have.</p>
      </section>
      <section>
        <h2>5. Limitation of Liability</h2>
        <p>Under no circumstance shall ERP-blogs have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site.</p>
        <p>If you have any questions or require more information about our disclaimer, please contact us at <a href="mailto:info.erptips@gmail.com">info.erptips@gmail.com</a>.</p>
      </section>
    </div>
  );
}
