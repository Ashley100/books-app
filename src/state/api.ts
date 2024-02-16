// import { MOCK_DB } from "../lib/utils/constants";
import { Book } from "./models/book";

export const MOCK_DB: Book[] = [
  {
    id: 0,
    author: "John",
    title: "Book #1",
    publication_year: "2024",
  },
  {
    id: 1,
    author: "Piter",
    title: "Book #2",
    publication_year: "2022",
  },
  {
    id: 2,
    author: "Soma",
    title: "Book #3",
    publication_year: "2023",
  },
  {
    id: 3,
    author: "Maya",
    title: "Book #4",
    publication_year: "2021",
  },
];

const books = {
  async getAll() {
    return MOCK_DB;
  },

  async create(newBook: Omit<Book, "id">) {
    const newId = MOCK_DB.length ? MOCK_DB[MOCK_DB.length - 1].id + 1 : 0;
    const createBook: Book = { ...newBook, id: newId };
    MOCK_DB.push(createBook);
    return createBook;
  },

  async update(id: number, payload: Partial<Book>) {
    const bookIndex = MOCK_DB.findIndex((book) => book.id === id);
    if (bookIndex > -1) {
      // This won't work because we can't reassign imported values
      MOCK_DB[bookIndex] = { ...MOCK_DB[bookIndex], ...payload };
      return true;
    }
    return false;
  },

  async delete(id: number) {
    const bookIndex = MOCK_DB.findIndex((book) => book.id === id);
    if (bookIndex > -1) {
      MOCK_DB.splice(bookIndex, 1);
      return true;
    }
    return false;
  },
};

export const api = { books };
