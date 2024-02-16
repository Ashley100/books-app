// eslint-disable-next-line import/no-cycle
import { bookDetailsRoute } from "../../../routes";
import { useBookList } from "../../../state/books";

export function BookDetails() {
  const { bookId } = bookDetailsRoute.useParams();
  const { bookList } = useBookList();

  const book = bookList.find((bookItem) => bookItem.id === Number(bookId));

  if (!book) {
    return <h3>Book not found</h3>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <code>{book.publication_year}</code>
    </div>
  );
}
