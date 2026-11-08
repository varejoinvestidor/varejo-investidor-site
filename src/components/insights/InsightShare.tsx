"use client";

import type { InsightPost } from "../../data/insights/types";

type Props = {
  post: InsightPost;
  url: string;
  label: string;
};

export function InsightShare({ post, url, label }: Props) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(post.title);

  const items = [
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { name: "X", href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { name: "WhatsApp", href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
  ];

  return (
    <div className="insight-share">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">{label}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gold/[0.22] bg-paper/[0.04] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-paper/[0.72] transition hover:border-gold hover:text-gold"
          >
            {item.name}
          </a>
        ))}
      </div>
    </div>
  );
}
