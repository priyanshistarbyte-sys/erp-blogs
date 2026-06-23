import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { getAllPosts, getPostByUrl } from '../../lib';
import AdSlot from '../../components/AdSlot';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.url }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostByUrl(slug);
  if (!post) return {};
  return { title: `${post.title} | ERP-blogs`, description: post.short_desc };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostByUrl(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const others = allPosts.filter((p) => p.url !== slug);
  const seed = slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const related = [...others].sort((a, b) => {
    const ha = (seed * a.url.length) % 997;
    const hb = (seed * b.url.length) % 997;
    return ha - hb;
  }).slice(0, 5);

  return (
    <>
      {/* <Suspense fallback={null}>
        <ReelsSection />
      </Suspense> */}

      <AdSlot slot="ad1" />

      <div className="blog-main-layout container" style={{ marginTop: '2rem' }}>
        <section className="blog-detail-content">
          <article className="blog-article">
            <header className="blog-header">
              <div className="blog-meta">
                {post.category && <span className="blog-category">{post.category}</span>}
                <span className="blog-date">{post.date}</span>
              </div>
              <h1 className="blog-title">{post.title}</h1>
              <Image
                className="blog-hero"
                src={`/blog_img/${post.url}.webp`}
                alt={`${post.title} Hero Image`}
                width={800}
                height={370}
                style={{ width: '100%', maxHeight: 370, objectFit: 'cover', borderRadius: 10 }}
              />
            </header>
            <AdSlot slot="ad2" />
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.desc }}
            />
          </article>

          <section className="blog-comments">
            <h2 className="comments-title">Comments <span className="comments-count">(3)</span></h2>
            <form className="comment-form">
              <Image className="comment-avatar" src="/images/12.jpg" alt="Your avatar" width={42} height={42} />
              <textarea className="comment-input" name="comment" placeholder="Leave a comment..." required />
              <button type="submit" className="comment-submit">Post Comment</button>
            </form>
            <div className="comments-list">
              {[
                { img: '/images/34.jpg', name: 'Alan Hill', time: '1 hour ago', text: 'This design is beautiful and super readable! Thanks for sharing your tips.' },
                { img: '/images/43.jpg', name: 'Priya Singh', time: '2 hours ago', text: 'Love the sidebar layout and sticky related posts – looks awesome on my phone.' },
                { img: '/images/88.jpg', name: 'Jorge M.', time: '5 hours ago', text: 'Could you do a post about integrating a real commenting system? This preview is inspiring!' },
              ].map((c) => (
                <article key={c.name} className="comment">
                  <Image className="comment-avatar" src={c.img} alt={c.name} width={40} height={40} />
                  <div className="comment-body">
                    <div className="comment-meta">
                      <span className="comment-author">{c.name}</span>
                      <span className="comment-date">{c.time}</span>
                    </div>
                    <div className="comment-text">{c.text}</div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>

        <aside className="related-blogs">
          <h2 className="related-title">Related Blogs</h2>
          <div className="related-list" style={{ flexDirection: 'column' }}>
            {related.map((rp) => (
              <article key={rp.url} className="related-card">
                <Link href={`/blog/${rp.url}`}>
                  <Image
                    src={`/blog_img/${rp.url}.webp`}
                    alt={rp.title}
                    width={250}
                    height={124}
                    style={{ width: '100%', height: 124, objectFit: 'cover' }}
                  />
                  <div className="related-content">
                    <span className="related-link">{rp.title}</span>
                    <span className="related-meta">By Admin •</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}
