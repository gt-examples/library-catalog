export type Book = {
  slug: string;
  title: string;
  author: string;
  genre: string;
  pages: number;
  available: boolean;
  dueDate: string | null;
  copies: number;
  totalCopies: number;
  year: number;
  isbn: string;
  description: string;
  branch: string;
  shelf: string;
  similarSlugs: string[];
};

export const books: Book[] = [
  {
    slug: "the-great-gatsby",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "fiction",
    pages: 180,
    available: true,
    dueDate: null,
    copies: 3,
    totalCopies: 5,
    year: 1925,
    isbn: "978-0-7432-7356-5",
    description:
      "A portrait of the Jazz Age in all of its decadence and excess, Gatsby captured the spirit of the author's generation and earned itself a permanent place in American mythology. Self-made, self-invented millionaire Jay Gatsby embodies some of Fitzgerald's ideals of romance, richness, and youth. Here, he pursues a distant dream embodied in a single green light across the water.",
    branch: "Main Street Branch",
    shelf: "Fiction, Row A, Shelf 3",
    similarSlugs: ["to-kill-a-mockingbird"],
  },
  {
    slug: "a-brief-history-of-time",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    genre: "science",
    pages: 256,
    available: false,
    dueDate: "2026-03-15",
    copies: 0,
    totalCopies: 2,
    year: 1988,
    isbn: "978-0-553-38016-3",
    description:
      "Stephen Hawking attempts to explain a range of subjects in cosmology, including the Big Bang, black holes, and light cones, to the nonspecialist reader. The book explores fundamental questions about the universe: where it came from, where it is going, and how it will end.",
    branch: "Riverside Branch",
    shelf: "Science, Row B, Shelf 7",
    similarSlugs: ["cosmos", "sapiens"],
  },
  {
    slug: "to-kill-a-mockingbird",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "fiction",
    pages: 281,
    available: true,
    dueDate: null,
    copies: 1,
    totalCopies: 4,
    year: 1960,
    isbn: "978-0-06-112008-4",
    description:
      "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. Through the young eyes of Scout and Jem Finch, Harper Lee explores with exuberant humour the irrationality of adult attitudes to race and class in the Deep South of the 1930s.",
    branch: "Main Street Branch",
    shelf: "Fiction, Row A, Shelf 5",
    similarSlugs: ["the-great-gatsby"],
  },
  {
    slug: "sapiens",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "history",
    pages: 443,
    available: false,
    dueDate: "2026-04-01",
    copies: 0,
    totalCopies: 3,
    year: 2011,
    isbn: "978-0-06-231609-7",
    description:
      "In this bold and provocative book, Yuval Noah Harari explores the ways in which biology and history have defined us, and enhanced our understanding of what it means to be human. From examining the role of evolving humans in the ecosystem to charting the rise of empires, Sapiens integrates history and science.",
    branch: "Hillside Branch",
    shelf: "History, Row C, Shelf 2",
    similarSlugs: ["a-brief-history-of-time", "the-art-of-war"],
  },
  {
    slug: "the-art-of-war",
    title: "The Art of War",
    author: "Sun Tzu",
    genre: "philosophy",
    pages: 68,
    available: true,
    dueDate: null,
    copies: 2,
    totalCopies: 2,
    year: -500,
    isbn: "978-1-59030-227-8",
    description:
      "Written in the fifth century BC, The Art of War is a military treatise that has long transcended its original purpose. Its lessons on strategy, tactics, and leadership have been adopted by business leaders, politicians, and anyone facing competitive challenges. Sun Tzu offers timeless principles of conflict and negotiation.",
    branch: "Main Street Branch",
    shelf: "Philosophy, Row D, Shelf 1",
    similarSlugs: ["sapiens"],
  },
  {
    slug: "cosmos",
    title: "Cosmos",
    author: "Carl Sagan",
    genre: "science",
    pages: 396,
    available: true,
    dueDate: null,
    copies: 4,
    totalCopies: 4,
    year: 1980,
    isbn: "978-0-345-53943-4",
    description:
      "Cosmos traces the origins of knowledge and the scientific method, mixing science and philosophy, and speculates to the future of science. The book covers a broad range of topics, including the origin of life, the human brain, Egyptian hieroglyphics, spacecraft missions, the death of the Sun, the evolution of galaxies, and more.",
    branch: "Riverside Branch",
    shelf: "Science, Row B, Shelf 9",
    similarSlugs: ["a-brief-history-of-time"],
  },
];

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

export const genres = [...new Set(books.map((b) => b.genre))];
