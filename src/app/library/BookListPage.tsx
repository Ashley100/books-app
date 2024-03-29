import "./styles/index.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../../components/ui/form/Button";
import { Input } from "../../components/ui/form/Input";
import { Menu, MenuItem } from "../../components/ui/menu/Menu";
import {
  Modal,
  ModalProvider,
  useModal,
  useModalContext,
} from "../../components/ui/modal/Modal";
import { useBookList } from "../../state/books";
import { Book } from "../../state/models/book";

type FormValues = Omit<Book, "id">;

function UpsertBookModal({ book }: { book?: Book }) {
  const modal = useModalContext();

  const { create, update } = useBookList();

  const form = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(
      z.object({
        title: z.string().min(3).max(255),
        author: z.string().min(3).max(255),
        publication_year: z.coerce.number().int().gte(1995).lte(2024),
      }),
    ),
    defaultValues: {
      title: book?.title ?? "",
      author: book?.author ?? "",
      publication_year: book?.publication_year ?? "",
    },
  });

  const onSubmit = async (formValues: FormValues) => {
    try {
      if (book) {
        await update({ bookId: book.id, payload: formValues });
      } else {
        await create(formValues);
      }
    } catch (error) {
      console.log("Something went wrong!", error);
    } finally {
      modal.modalDisclosure.onClose();
    }
  };

  useEffect(() => {
    modal.setModalProps((prevState) => ({
      ...prevState,
      onPrimaryButtonClick: form.handleSubmit(onSubmit),
      primaryButtonEnabled: form.formState.isValid,
    }));
  }, [form.formState.isValid, form.handleSubmit]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <p className="label">Title</p>
      <Input {...form.register("title")} />
      {form.formState.errors.title && (
        <p className="text-red">This field is required</p>
      )}
      <p className="label">Author</p>
      <Input {...form.register("author", { required: true })} />
      {form.formState.errors.author && <p>This field is required</p>}
      <p className="label">Publication date</p>
      <Input {...form.register("publication_year", { required: true })} />
      {form.formState.errors.publication_year && (
        <p className="text-red">Should 4 digits</p>
      )}
    </form>
  );
}

function BookCard({ book }: { book: Book }) {
  const modal = useModal();

  const { remove } = useBookList();

  const handleDelete = async () => {
    try {
      await remove(book.id);
    } catch (error) {
      console.log("Something went wrong!", error);
    }
  };

  const menuItems: MenuItem[] = [
    { label: "Update", onClick: () => modal.modalDisclosure.onOpen() },
    { label: "Delete", onClick: () => handleDelete() },
  ];

  return (
    <>
      <ModalProvider {...modal}>
        <Modal
          title="Update Book"
          primaryButtonLabel="Save"
          {...modal.modalProps}
          {...modal.modalDisclosure}
        >
          <UpsertBookModal book={book} />
        </Modal>
      </ModalProvider>
      <div key={book.id} className="book-card">
        <Link to="/books/$bookId" params={{ bookId: String(book.id) }}>
          <h3>{book.title}</h3>
        </Link>
        <h4>By {book.author}</h4>
        <p>{book.publication_year}</p>
        <Menu items={menuItems} />
      </div>
    </>
  );
}

export function BookListPage() {
  const modal = useModal();

  const { bookList } = useBookList();

  return (
    <>
      <ModalProvider {...modal}>
        <Modal
          title="Create Book"
          primaryButtonLabel="Create Book"
          {...modal.modalProps}
          {...modal.modalDisclosure}
        >
          <UpsertBookModal />
        </Modal>
      </ModalProvider>
      <div className="flex justify-between align-center mb-24">
        <h3>Book List</h3>
        <Button onClick={() => modal.modalDisclosure.onOpen()}>Create</Button>
      </div>
      <div className="book-list">
        {bookList.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </>
  );
}
