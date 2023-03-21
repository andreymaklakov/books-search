import React from "react";
import { useSelector } from "react-redux";

import { getChoosenBook } from "./store/finder";
import { Book } from "../interfaces";

import Header from "./components/header";
import Main from "./components/main";
import BooksPage from "./components/booksPage";

function App() {
  const choosenBook: Book | null = useSelector(getChoosenBook());

  return (
    <div>
      <Header />

      {choosenBook ? <BooksPage /> : <Main />}
    </div>
  );
}

export default App;
