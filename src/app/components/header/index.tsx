import React from "react";
import { useSelector } from "react-redux";

import {
  changeCategory,
  changeSortBy,
  getCategory,
  getSortBy,
} from "../../store/finder";

import { categories, sorting } from "../../../constants";

import SearchForm from "../searchForm";
import SelectForm from "../selectForm";

import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const category: string = useSelector(getCategory());
  const sort: string = useSelector(getSortBy());

  return (
    <header className={styles.header}>
      <h1>Search for books</h1>

      <SearchForm />

      <div className={styles.selectFields_container}>
        <div className={styles.selectField_container}>
          <p>Categories</p>

          <SelectForm
            value={category}
            onChange={changeCategory}
            items={categories}
          />
        </div>

        <div className={styles.selectField_container}>
          <p>Sorting by</p>

          <SelectForm value={sort} onChange={changeSortBy} items={sorting} />
        </div>
      </div>
    </header>
  );
};

export default Header;
