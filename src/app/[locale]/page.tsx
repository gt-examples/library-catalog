import { T, Num } from "gt-next";
import { getGT } from "gt-next/server";
import { LocaleSelector } from "gt-next";
import { books, genres } from "@/data/books";
import GenreFilter from "@/components/GenreFilter";

const totalBooks = books.length;
const availableCount = books.filter((b) => b.available).length;
const checkedOutCount = books.filter((b) => !b.available).length;
const genreCount = new Set(books.map((b) => b.genre)).size;

export default async function Home() {
  const gt = await getGT();

  const genreLabels: Record<string, string> = {
    fiction: gt("Fiction"),
    science: gt("Science"),
    history: gt("History"),
    philosophy: gt("Philosophy"),
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
            <h1 className="text-sm font-semibold text-neutral-100">
              {gt("Library Catalog")}
            </h1>
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
        <T>
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-100 mb-3">
              Public Library Catalog
            </h2>
            <p className="text-base text-neutral-400 max-w-2xl leading-relaxed">
              Browse our collection of books. Check availability, due dates, and
              find your next read.
            </p>
          </div>
        </T>

        <div className="mb-8">
          <T>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
                <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">
                  Total Books
                </p>
                <p className="text-2xl font-semibold text-neutral-100">
                  <Num>{totalBooks}</Num>
                </p>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
                <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">
                  Available
                </p>
                <p className="text-2xl font-semibold text-emerald-400">
                  <Num>{availableCount}</Num>
                </p>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
                <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">
                  Checked Out
                </p>
                <p className="text-2xl font-semibold text-amber-400">
                  <Num>{checkedOutCount}</Num>
                </p>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
                <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">
                  Genres
                </p>
                <p className="text-2xl font-semibold text-neutral-100">
                  <Num>{genreCount}</Num>
                </p>
              </div>
            </div>
          </T>
        </div>

        <GenreFilter
          books={books}
          genres={genres}
          genreLabels={genreLabels}
          allLabel={gt("All")}
          searchPlaceholder={gt("Search by title or author...")}
        />

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
