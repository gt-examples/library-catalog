import { T, Var, Num } from "gt-next";
import { getGT } from "gt-next/server";
import { LocaleSelector } from "gt-next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { books, getBookBySlug } from "@/data/books";
import type { Metadata } from "next";

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return {};
  return {
    title: `${book.title} | General Translation`,
    description: book.description.slice(0, 160),
  };
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  const gt = await getGT();

  const genreLabels: Record<string, string> = {
    fiction: gt("Fiction"),
    science: gt("Science"),
    history: gt("History"),
    philosophy: gt("Philosophy"),
  };

  const descriptions: Record<string, string> = {
    "the-great-gatsby": gt("A portrait of the Jazz Age in all of its decadence and excess, Gatsby captured the spirit of the author's generation and earned itself a permanent place in American mythology. Self-made, self-invented millionaire Jay Gatsby embodies some of Fitzgerald's ideals of romance, richness, and youth. Here, he pursues a distant dream embodied in a single green light across the water."),
    "a-brief-history-of-time": gt("Stephen Hawking attempts to explain a range of subjects in cosmology, including the Big Bang, black holes, and light cones, to the nonspecialist reader. The book explores fundamental questions about the universe: where it came from, where it is going, and how it will end."),
    "to-kill-a-mockingbird": gt("The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. Through the young eyes of Scout and Jem Finch, Harper Lee explores with exuberant humour the irrationality of adult attitudes to race and class in the Deep South of the 1930s."),
    "sapiens": gt("In this bold and provocative book, Yuval Noah Harari explores the ways in which biology and history have defined us, and enhanced our understanding of what it means to be human. From examining the role of evolving humans in the ecosystem to charting the rise of empires, Sapiens integrates history and science."),
    "the-art-of-war": gt("Written in the fifth century BC, The Art of War is a military treatise that has long transcended its original purpose. Its lessons on strategy, tactics, and leadership have been adopted by business leaders, politicians, and anyone facing competitive challenges. Sun Tzu offers timeless principles of conflict and negotiation."),
    "cosmos": gt("Cosmos traces the origins of knowledge and the scientific method, mixing science and philosophy, and speculates to the future of science. The book covers a broad range of topics, including the origin of life, the human brain, Egyptian hieroglyphics, spacecraft missions, the death of the Sun, the evolution of galaxies, and more."),
  };

  const branchLabels: Record<string, string> = {
    "Main Street Branch": gt("Main Street Branch"),
    "Riverside Branch": gt("Riverside Branch"),
    "Hillside Branch": gt("Hillside Branch"),
  };

  const shelfLabels: Record<string, string> = {
    "Fiction, Row A, Shelf 3": gt("Fiction, Row A, Shelf 3"),
    "Science, Row B, Shelf 7": gt("Science, Row B, Shelf 7"),
    "Fiction, Row A, Shelf 5": gt("Fiction, Row A, Shelf 5"),
    "History, Row C, Shelf 2": gt("History, Row C, Shelf 2"),
    "Philosophy, Row D, Shelf 1": gt("Philosophy, Row D, Shelf 1"),
    "Science, Row B, Shelf 9": gt("Science, Row B, Shelf 9"),
  };

  const yearLabels: Record<number, string> = {
    1925: "1925",
    1988: "1988",
    1960: "1960",
    2011: "2011",
    [-500]: gt("500 BC"),
    1980: "1980",
  };

  const similar = book.similarSlugs
    .map((s) => getBookBySlug(s))
    .filter(Boolean);

  const genreColors: Record<string, string> = {
    fiction: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    science: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    history: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    philosophy: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  };

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-200">
      <header className="border-b border-neutral-800 bg-neutral-950">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="https://generaltranslation.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-neutral-400 hover:text-neutral-200 transition-colors"
            >
              General Translation
            </a>
            <span className="text-neutral-700">/</span>
            <Link
              href="/"
              className="text-sm font-semibold text-neutral-400 hover:text-neutral-200 transition-colors"
            >
              {gt("Library Catalog")}
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/gt-examples/library-catalog"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-200 transition-colors"
              aria-label="View on GitHub"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <LocaleSelector />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-300 transition-colors mb-8"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {gt("Back to catalog")}
        </Link>

        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-semibold text-neutral-100">
                  {book.title}
                </h1>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded border ${genreColors[book.genre] || "bg-neutral-800 text-neutral-400 border-neutral-700"}`}
                >
                  {genreLabels[book.genre] || book.genre}
                </span>
              </div>
              <p className="text-neutral-400">{book.author}</p>
            </div>
            <div className="shrink-0">
              {book.available ? (
                <T>
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 text-sm font-medium bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Available
                  </span>
                </T>
              ) : (
                <div>
                  <T>
                    <span className="inline-flex items-center gap-1.5 text-amber-400 text-sm font-medium bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded mb-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      Checked Out
                    </span>
                  </T>
                  {book.dueDate && (
                    <T>
                      <p className="text-neutral-500 text-xs mt-1">
                        Due: <Var>{book.dueDate}</Var>
                      </p>
                    </T>
                  )}
                </div>
              )}
            </div>
          </div>

          <p className="text-neutral-300 leading-relaxed mb-8">
            {descriptions[book.slug] || book.description}
          </p>

          <T>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-4">
                <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">
                  Pages
                </p>
                <p className="text-lg font-semibold text-neutral-100">
                  <Num>{book.pages}</Num>
                </p>
              </div>
              <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-4">
                <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">
                  Published
                </p>
                <p className="text-lg font-semibold text-neutral-100">
                  <Var>{yearLabels[book.year] || String(book.year)}</Var>
                </p>
              </div>
              <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-4">
                <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">
                  Copies
                </p>
                <p className="text-lg font-semibold text-neutral-100">
                  <Var>{book.copies}</Var> / <Var>{book.totalCopies}</Var>
                </p>
              </div>
              <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-4">
                <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">
                  ISBN
                </p>
                <p className="text-sm font-mono font-semibold text-neutral-100">
                  <Var>{book.isbn}</Var>
                </p>
              </div>
            </div>
          </T>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <T>
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <h2 className="text-sm font-semibold text-neutral-100 uppercase tracking-wide mb-4">
                Branch Information
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-neutral-500 mb-0.5">Location</p>
                  <p className="text-sm text-neutral-300">
                    <Var>{branchLabels[book.branch] || book.branch}</Var>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 mb-0.5">Shelf</p>
                  <p className="text-sm text-neutral-300">
                    <Var>{shelfLabels[book.shelf] || book.shelf}</Var>
                  </p>
                </div>
              </div>
            </div>
          </T>

          {book.available ? (
            <T>
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                <h2 className="text-sm font-semibold text-neutral-100 uppercase tracking-wide mb-4">
                  Place a Hold
                </h2>
                <p className="text-sm text-neutral-400 mb-4">
                  This book is currently available. Reserve a copy to pick up at
                  your preferred branch.
                </p>
                <button className="w-full bg-neutral-100 text-neutral-900 text-sm font-medium py-2.5 rounded-lg hover:bg-neutral-200 transition-colors">
                  Reserve This Book
                </button>
              </div>
            </T>
          ) : (
            <T>
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                <h2 className="text-sm font-semibold text-neutral-100 uppercase tracking-wide mb-4">
                  Join Waitlist
                </h2>
                <p className="text-sm text-neutral-400 mb-4">
                  All copies are currently checked out. Join the waitlist to be
                  notified when a copy becomes available.
                </p>
                <button className="w-full bg-neutral-100 text-neutral-900 text-sm font-medium py-2.5 rounded-lg hover:bg-neutral-200 transition-colors">
                  Join Waitlist
                </button>
              </div>
            </T>
          )}
        </div>

        {similar.length > 0 && (
          <div>
            <T>
              <h2 className="text-lg font-semibold text-neutral-100 mb-4">
                Similar Titles
              </h2>
            </T>
            <div className="space-y-3">
              {similar.map((s) =>
                s ? (
                  <Link
                    key={s.slug}
                    href={`/book/${s.slug}`}
                    className="block bg-neutral-900 border border-neutral-800 rounded-lg p-4 hover:border-neutral-600 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-neutral-100">
                          {s.title}
                        </h3>
                        <p className="text-xs text-neutral-500">{s.author}</p>
                      </div>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded border ${genreColors[s.genre] || "bg-neutral-800 text-neutral-400 border-neutral-700"}`}
                      >
                        {genreLabels[s.genre] || s.genre}
                      </span>
                    </div>
                  </Link>
                ) : null
              )}
            </div>
          </div>
        )}

        <T>
          <div className="mt-12 pt-8 border-t border-neutral-800">
            <p className="text-xs text-neutral-600 text-center">
              This is an example application built with General Translation to
              demonstrate internationalization. Book data is fictional.
            </p>
          </div>
        </T>
      </main>
    </div>
  );
}
