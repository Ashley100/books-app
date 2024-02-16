import { Link } from "@tanstack/react-router";

export function BooksHomePage() {
  return (
    <div className="container">
      <h3>Your Library</h3>
      <Link to="/books">See All Books</Link>
    </div>
  );
}
