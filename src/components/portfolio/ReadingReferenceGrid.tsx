import { BookReferenceCard } from "@/components/cards/BookReferenceCard";
import type { BookReference } from "@/content/books";

export function ReadingReferenceGrid({ books }: { books: BookReference[] }) {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
          <BookReferenceCard key={book.title} book={book} />
        ))}
      </div>
      <p className="mt-6 text-xs leading-6 text-[#A8B2BA]">
        Alguns links desta curadoria podem ser links de afiliado. Isso não altera o valor do produto para você.
      </p>
    </div>
  );
}
