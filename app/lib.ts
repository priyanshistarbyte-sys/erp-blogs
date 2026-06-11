import { BlogPost } from './types';
import data from './data.json';

export function getAllPosts(): BlogPost[] {
  return data as BlogPost[];
}

export function getPostByUrl(url: string): BlogPost | undefined {
  return (data as BlogPost[]).find((p) => p.url === url);
}

export function getRelatedPosts(currentUrl: string, count = 5): BlogPost[] {
  const others = (data as BlogPost[]).filter((p) => p.url !== currentUrl);
  // shuffle
  for (let i = others.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [others[i], others[j]] = [others[j], others[i]];
  }
  return others.slice(0, count);
}
