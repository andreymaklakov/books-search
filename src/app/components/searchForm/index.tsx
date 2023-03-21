import React, { ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { AppDispatch } from "../../store/createStore";
import {
  changeSearchField,
  getChoosenBook,
  getSearchField,
  handleSearch,
  resetChoosenBook,
} from "../../store/finder";

import { Book } from "../../../interfaces";

import styles from "./SearchForm.module.scss";

const SearchForm: React.FC = () => {
  const search: string = useSelector(getSearchField());
  const choosenBook: Book | null = useSelector(getChoosenBook());

  const dispatch: AppDispatch = useDispatch();

  const handleChangeSearchField = ({
    target,
  }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (target) {
      dispatch(changeSearchField(target.value));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(handleSearch(false));

    if (choosenBook) {
      dispatch(resetChoosenBook());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        value={search}
        placeholder="Type books name..."
        variant="outlined"
        onChange={handleChangeSearchField}
      />

      <IconButton disabled={!search} className={styles.searchBtn} type="submit">
        <SearchIcon />
      </IconButton>
    </form>
  );
};

export default SearchForm;
