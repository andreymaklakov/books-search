import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@mui/material";

import { AppDispatch } from "../../store/createStore";
import {
  getBooks,
  getBooksLoading,
  getError,
  handleSearch,
} from "../../store/finder";

import BookCard from "../bookCard";
import Loader from "../loader";

import { Books } from "../../../interfaces";

import styles from "./Main.module.scss";

const Main: React.FC = () => {
  const books: Books | null = useSelector(getBooks());
  const booksLoading: boolean = useSelector(getBooksLoading());
  const error: boolean = useSelector(getError());

  const dispatch: AppDispatch = useDispatch();

  const handleShowMoreBooks = () => {
    dispatch(handleSearch(true));
  };

  if (!error) {
    return (
      <main className={styles.main}>
        {books && (
          <h4>
            Found {books ? books.totalItems : 0} result
            {books?.totalItems === 1 ? "" : "s"}
          </h4>
        )}

        {!booksLoading ? (
          <div className={styles.books_container}>
            {books &&
              books.items &&
              books.items.map((book, i) => <BookCard key={i} book={book} />)}
          </div>
        ) : (
          <Loader />
        )}

        {books && books.totalItems > 30 && !booksLoading && (
          <Button onClick={handleShowMoreBooks}>Show more</Button>
        )}
      </main>
    );
  }
  return <h1>We have some problems please try later</h1>;
};

export default Main;
