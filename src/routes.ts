import { Outlet, createRootRoute, createRoute } from "@tanstack/react-router";

import { BookDetailsPage } from "./app/library/book-details/BookDetailsPage";
import { BookListPage } from "./app/library/BookListPage";
import { BooksHomePage } from "./app/library/BooksHomePage";
import { ErrorPage } from "./components/ErrorPage";
import { LibraryLayout } from "./components/LibraryLayout";
import { NotFoundPage } from "./components/NotFoundPage";

const rootRoute = createRootRoute({
  component: Outlet,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorPage,
});

const libraryLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "library",
  component: LibraryLayout,
});

const booksRoute = createRoute({
  getParentRoute: () => libraryLayout,
  path: "/books",
  // component: BookListPage,
});

const booksIndexRoute = createRoute({
  getParentRoute: () => booksRoute,
  path: "/",
  component: BookListPage,
});

const bookDetailsRoute = createRoute({
  getParentRoute: () => booksRoute,
  path: "$bookId",
  component: BookDetailsPage,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: BooksHomePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  libraryLayout.addChildren([
    booksRoute.addChildren([bookDetailsRoute, booksIndexRoute]),
  ]),
]);

export { routeTree, rootRoute };
