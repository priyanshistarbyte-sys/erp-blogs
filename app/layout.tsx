import type { Metadata } from 'next';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import GptInit from './components/GptInit';

export const metadata: Metadata = {
  title: 'Streamlining Business with Smarter Systems | ERP-blogs',
  description: 'Explore ERP strategies, tools, and implementation tips to automate and grow your business faster with modern ERP systems.',
  keywords: 'Enterprise resource planning, Best ERP for small business, ERP implementation guide, ERP comparison 2025, Cloud-based ERP systems',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon/favicon.ico" />
        <link rel="icon" href="/images/favicon/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/images/favicon/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/images/favicon/apple-touch-icon.png" />
        <meta name="robots" content="index, follow" />
        {/* Preconnect for faster ad loading */}
        <link rel="preconnect" href="https://securepubads.g.doubleclick.net/" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://securepubads.g.doubleclick.net/" />
        {/* Google Publisher Tag */}
        <script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" crossOrigin="anonymous" />
      </head>
      <body>
        <GptInit />
        <div id="page-content">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
