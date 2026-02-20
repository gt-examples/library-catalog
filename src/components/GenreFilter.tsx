"use client";

import { useState } from "react";
import { T, Var, Num } from "gt-next";
import Link from "next/link";

type BookDisplay = {
  slug: string;
  title: string;
  author: string;
  genre: string;
  pages: number;
  available: boolean;
  dueDate: string | null;
  copies: number;
  totalCopies: number;
};

const genreColors: Record<string, string> = {
  fiction: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  science: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  history: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  philosophy: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

function AvailableBadge() {
  return (
    <T>
      <span className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        Available
      </span>
    </T>
  );
}

function CheckedOutBadge({ dueDate }: { dueDate: string | null }) {
  return (
    <div>
      <T>
        <span className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-medium bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          Checked Out
        </span>
      </T>
      {dueDate && (
        <T>
          <p className="text-neutral-500 text-xs">
            Due: <Var>{dueDate}</Var>
          </p>
        </T>
      )}
    </div>
  );
}

export default function GenreFilter({
  books,
  genres,
  genreLabels,
  allLabel,
  searchPlaceholder,
}: {
  books: BookDisplay[];
  genres: string[];
  genreLabels: Record<string, string>;
  allLabel: string;
  searchPlaceholder: string;
}) {
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = books.filter((book) => {
    const matchesGenre = !activeGenre || book.genre === activeGenre;
    const matchesSearch =
      !search ||
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={searchPlaceholder}
          className="bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 text-sm text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-600 flex-1"
        />
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveGenre(null)}
            className={`text-xs font-medium px-3 py-1.5 rounded border transition-colors ${
              !activeGenre
                ? "bg-neutral-100 text-neutral-900 border-neutral-100"
                : "bg-neutral-900 text-neutral-400 border-neutral-700 hover:border-neutral-500"
            }`}
          >
            {allLabel}
          </button>
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() =>
                setActiveGenre(activeGenre === genre ? null : genre)
              }
              className={`text-xs font-medium px-3 py-1.5 rounded border transition-colors ${
                activeGenre === genre
                  ? "bg-neutral-100 text-neutral-900 border-neutral-100"
                  : `${genreColors[genre] || "bg-neutral-800 text-neutral-400 border-neutral-700"} hover:opacity-80`
              }`}
            >
              {genreLabels[genre] || genre}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((book) => (
          <Link
            key={book.slug}
            href={`/book/${book.slug}`}
            className="block bg-neutral-900 border border-neutral-800 rounded-lg p-5 hover:border-neutral-600 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1.5">
                  <h3 className="text-base font-semibold text-neutral-100 truncate">
                    {book.title}
                  </h3>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded border ${genreColors[book.genre] || "bg-neutral-800 text-neutral-400 border-neutral-700"}`}
                  >
                    {genreLabels[book.genre] || book.genre}
                  </span>
                </div>
                <p className="text-sm text-neutral-500">{book.author}</p>
              </div>
              <div className="flex items-center gap-6 text-sm shrink-0">
                <T>
                  <div className="text-right">
                    <p className="text-neutral-500 text-xs mb-0.5">Pages</p>
                    <p className="text-neutral-300 font-medium">
                      <Num>{book.pages}</Num>
                    </p>
                  </div>
                </T>
                <T>
                  <div className="text-right">
                    <p className="text-neutral-500 text-xs mb-0.5">Copies</p>
                    <p className="text-neutral-300 font-medium">
                      <Var>{book.copies}</Var> / <Var>{book.totalCopies}</Var>
                    </p>
                  </div>
                </T>
                <div className="text-right min-w-[90px]">
                  {book.available ? (
                    <AvailableBadge />
                  ) : (
                    <CheckedOutBadge dueDate={book.dueDate} />
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <T>
            <div className="text-center py-12 text-neutral-500">
              <p>No books found matching your search.</p>
            </div>
          </T>
        )}
      </div>
    </div>
  );
}
