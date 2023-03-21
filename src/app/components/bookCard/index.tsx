import React from "react";
import { useDispatch } from "react-redux";

import { Paper } from "@mui/material";

import { AppDispatch } from "../../store/createStore";
import { chooseBook } from "../../store/finder";

import { Book, BookInfo } from "../../../interfaces";
import Image from "../../../img/noImg.jpg";

import styles from "./BookCard.module.scss";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const bookInfo: BookInfo = book.volumeInfo;

  const dispatch: AppDispatch = useDispatch();

  const handleClick = () => {
    dispatch(chooseBook(book));
  };

  return (
    <Paper className={styles.card} onClick={handleClick} elevation={0}>
      <img
        src={bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : Image}
        alt="Book cover"
      />

      {bookInfo.categories && (
        <p className={styles.category}>{bookInfo.categories[0]}</p>
      )}

      <h3>{bookInfo.title}</h3>

      {bookInfo.authors && (
        <p className={styles.author}>{bookInfo.authors.join(", ")}</p>
      )}
    </Paper>
  );
};

export default BookCard;
