"use client";

import Image from "next/image";
import { BookOpen, ExternalLink } from "lucide-react";
import { useState } from "react";
import type { BookReference } from "@/content/books";

export function BookReferenceCard({ book }: { book: BookReference }) {
  const [hasImageError, setHasImageError] = useState(false);
  const cover = book.coverImage && !hasImageError;
  const card = (
    <article className="book-card group relative h-full overflow-hidden border border-white/10 bg-white/[0.035] p-4 transition duration-300 hover:-translate-y-1 hover:border-[#35F06A]/35 hover:bg-white/[0.055]">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-[#35F06A] to-transparent transition duration-500 group-hover:scale-x-100" />
      <div className="relative aspect-[3/4] overflow-hidden border border-white/10 bg-[#151B20]">
        {cover ? (
          <Image src={book.coverImage!} alt={`Capa do livro ${book.title}, de ${book.author}`} fill sizes="(max-width: 768px) 45vw, 180px" className="object-cover transition duration-500 group-hover:scale-[1.04]" onError={() => setHasImageError(true)} />
        ) : (
          <div className="flex h-full flex-col justify-between bg-[radial-gradient(circle_at_80%_20%,rgba(53,240,106,0.18),transparent_34%),linear-gradient(145deg,#151B20,#050708)] p-4">
            <BookOpen aria-hidden="true" className="h-7 w-7 text-[#35F06A]" />
            <div>
              <p className="text-lg font-semibold leading-tight text-[#F4F7F8]">{book.title}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[#A8B2BA]">{book.author}</p>
            </div>
          </div>
        )}
      </div>
      <div className="pt-5">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#C8F8D2]">{book.category}</p>
        <h3 className="mt-3 text-lg font-semibold leading-snug text-[#F4F7F8]">{book.title}</h3>
        <p className="mt-1 text-sm text-[#A8B2BA]">{book.author}</p>
        {book.description ? <p className="mt-4 text-sm leading-7 text-[#A8B2BA]">{book.description}</p> : null}
        {book.isAffiliateAvailable && book.affiliateUrl ? (
          <span className="book-affiliate mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#C8F8D2] transition group-hover:text-[#35F06A]">
            Ver recomendação <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
          </span>
        ) : null}
      </div>
    </article>
  );

  if (book.isAffiliateAvailable && book.affiliateUrl) {
    return (
      <a href={book.affiliateUrl} target="_blank" rel="noopener noreferrer" className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A]">
        {card}
      </a>
    );
  }

  return card;
}
