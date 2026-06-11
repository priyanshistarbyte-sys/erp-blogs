import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from './lib';
import AdSlot from './components/AdSlot';

const homePosts = [
  { url: 'how-to-find-the-best-18-wheeler-accident-attorney-for-your-case', category: 'Legal Services', desc: 'Injured in an 18-wheeler crash? Discover how to choose the best 18 wheeler accident attorney or law firm near you to max...' },
  { url: 'compare-auto-and-home-insurance-bundles-to-save-big-in-2025', category: 'Insurance', desc: 'Looking to save? Compare auto and home insurance bundles online! Get car and homeowners insurance quotes instantly and f...' },
  { url: 'top-picks-for-affordable-erp-software-in-2025', category: 'ERP Software', desc: 'Discover the best affordable ERP software options for your business in 2025. Compare features, pricing, and benefits to...' },
  { url: 'top-10-debt-consolidation-loan-companies-to-slash-your-debt-in-2025', category: 'Debt Management', desc: 'Discover the top 10 debt consolidation loan companies to cut debt fast. Compare rates, terms & save with the best option...' },
  { url: 'best-crm-for-financial-advisors-top-picks-for-2025', category: 'CRM Software', desc: 'Discover the best CRM for financial advisors to streamline client management and boost productivity in 2025. Compare top...' },
  { url: 'top-truck-accident-lawyer-secrets-to-winning-your-commercial-truck-crash-case', category: 'Legal Services', desc: 'Need a truck accident lawyer? Learn expert tips from top commercial truck crash attorneys to win your case. Find the bes...' },
  { url: 'car-insurance-quotes-compare-rates-and-find-the-best-deal-now', category: 'Insurance', desc: 'Shop car insurance quotes, compare rates, and save! Discover car insurance rate quotes comparison tools to get the cheap...' },
  { url: 'best-debt-relief-companies-escape-credit-card-debt-for-good', category: 'Debt Management', desc: 'Explore the best debt relief companies to erase credit card debt. Get expert picks, reviews & start your debt-free life...' },
  { url: 'best-cloud-based-erp-software-which-one-wins-in-2025', category: 'ERP Software', desc: 'Explore the best cloud based ERP software for seamless business operations. Get expert reviews, pricing, and features to...' },
  { url: 'crm-software-for-insurance-brokers-maximize-leads-and-sales', category: 'CRM Software', desc: 'Explore the top CRM software for insurance brokers to manage leads and automate workflows. Find the perfect insurance le...' },
  { url: 'best-crm-for-email-automation-tools-to-skyrocket-your-campaigns', category: 'CRM Software', desc: 'Looking for the best CRM for email automation? Compare HubSpot, Zoho CRM, and more to supercharge your email marketing w...' },
  { url: 'best-document-automation-software-for-law-firms-boost-efficiency-now', category: 'ERP Software', desc: 'Find the best document automation software for law firms to streamline workflows. Compare top tools, pricing, and benefi...' },
  { url: 'home-and-auto-insurance-quotes-get-the-best-online-rates-today', category: 'Insurance', desc: 'Need affordable coverage? Get home and auto insurance quotes online fast! Compare multiple car insurance quotes at once...' },
  { url: 'why-you-need-an-18-wheeler-injury-lawyer-after-a-big-rig-crash', category: 'Legal Services', desc: 'After an 18-wheeler wreck, an experienced 18 wheeler injury lawyer can fight for you. Explore how accident injury attorn...' },
  { url: 'crm-integration-with-erp-the-ultimate-guide-for-enterprises', category: 'CRM Software', desc: 'Learn how CRM integration with ERP can transform your business. Explore enterprise CRM software and ERP CRM implementati...' },
  { url: 'hiring-a-car-accident-attorney-vs-a-commercial-truck-accident-law-firm-whats-the-difference', category: 'Legal Services', desc: 'Confused about hiring a car accident attorney or a commercial truck accident law firm? Learn the key differences and why...' },
  { url: 'best-business-debt-consolidation-loans-to-save-your-company-cash', category: 'Debt Management', desc: 'Find the best business debt consolidation loans to lower costs & boost cash flow. Compare top lenders for your business...' },
  { url: 'best-erp-for-small-manufacturing-business-top-systems-revealed', category: 'ERP Software', desc: 'Uncover the best ERP for small manufacturing business needs. Compare leading systems, costs, and features to optimize pr...' },
  { url: 'best-credit-card-debt-consolidation-programs-for-bad-credit', category: 'Debt Management', desc: 'Struggling with bad credit? See the best credit card debt consolidation programs to reduce debt fast. Start saving today...' },
];

export default function HomePage() {
  const allPosts = getAllPosts();

  return (
    <>
      <AdSlot slot="ad1" />
      <section className="featured container">
        <Image
          src="/blog_img/mastering-erp.webp"
          alt="Featured Post"
          width={480}
          height={260}
          style={{ width: '46%', minWidth: 180, maxHeight: 260, objectFit: 'cover', borderRadius: '18px 0 0 18px' }}
        />
        <div className="featured-content">
          <h2>🔥 Featured: Mastering ERP Implementation</h2>
          <p>Unlock the key phases of ERP success — from planning to deployment. Real-world tips, checklists, and expert insights for smooth transitions.</p>
          <Link href="/" className="read-more">Read Featured</Link>
        </div>
      </section>

      <AdSlot slot="ad2" />
      <section className="recent-posts container">
        {homePosts.map((item) => {
          const post = allPosts.find((p) => p.url === item.url);
          const title = post?.title ?? item.url;
          return (
            <article key={item.url} className="post-card">
              <Link href={`/blog/${item.url}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <span className="tag web">{item.category}</span>
                <Image
                  src={`/blog_img/${item.url}.webp`}
                  alt={`${title} Thumbnail`}
                  width={400}
                  height={174}
                  style={{ height: 174, objectFit: 'cover', width: '100%' }}
                />
                <div className="post-content">
                  <h3><span className="post-title-link">{title}</span></h3>
                  <p>{item.desc}</p>
                  <span className="post-meta">By Admin</span>
                </div>
              </Link>
            </article>
          );
        })}
      </section>
    </>
  );
}
