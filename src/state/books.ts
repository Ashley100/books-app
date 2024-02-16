import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { MOCK_DB } from "../lib/utils/constants";
import { api } from "./api";
import { Book } from "./models/book";

const STATE_TYPES = {
  BOOK_LIST: "books_list",
};

export const useBookList = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery<Book[]>({
    queryKey: [STATE_TYPES.BOOK_LIST],
    queryFn: () => api.books.getAll(),
    initialData: MOCK_DB,
  });

  const create = (payload: Omit<Book, "id">) => api.books.create(payload);
  const { mutateAsync: createMutateAsync } = useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STATE_TYPES.BOOK_LIST] });
    },
  });

  const update = ({
    bookId,
    payload,
  }: {
    bookId: Book["id"];
    payload: Partial<Book>;
  }) => api.books.update(bookId, payload);
  const { mutateAsync: updateMutateAsync } = useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STATE_TYPES.BOOK_LIST] });
    },
  });

  const remove = (bookId: Book["id"]) => api.books.delete(bookId);
  const { mutateAsync: removeMutateAsync } = useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STATE_TYPES.BOOK_LIST] });
    },
  });

  return {
    bookList: data,
    create: createMutateAsync,
    update: updateMutateAsync,
    remove: removeMutateAsync,
  };
};
