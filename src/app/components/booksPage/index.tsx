import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Book, BookInfo } from "../../../interfaces";

import { AppDispatch } from "../../store/createStore";
import { getChoosenBook, resetChoosenBook } from "../../store/finder";

import Image from "../../../img/noImg.jpg";

import styles from "./BooksPage.module.scss";

const BooksPage = () => {
  const choosenBook: Book | null = useSelector(getChoosenBook());

  const dispatch: AppDispatch = useDispatch();

  if (choosenBook) {
    const bookInfo: BookInfo = choosenBook.volumeInfo;

    const handleBackClick = () => {
      dispatch(resetChoosenBook());
    };

    return (
      <main className={styles.main}>
        <div className={styles.book_cover}>
          <img
            src={bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : Image}
            alt="Book cover"
          />
        </div>

        <div className={styles.book_data}>
          <p
            className={styles.backBtn}
            onClick={handleBackClick}
          >{`< Back to all`}</p>

          {bookInfo.categories && (
            <p className={styles.book_categories}>
              {bookInfo.categories.join("/")}
            </p>
          )}

          <h2>{bookInfo.title}</h2>

          {bookInfo.authors && (
            <p className={styles.book_author}>{bookInfo.authors.join(", ")}</p>
          )}

          <div className={styles.book_description_container}>
            <p>{bookInfo.description}</p>
          </div>
        </div>
      </main>
    );
  }
  return null;
};

export default BooksPage;
