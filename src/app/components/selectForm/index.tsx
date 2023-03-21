import React from "react";

import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, AppThunk } from "../../store/createStore";
import {
  getBooks,
  getChoosenBook,
  handleChangeSelector,
  resetChoosenBook,
} from "../../store/finder";

import { Book, Books } from "../../../interfaces";

import styles from "./SelectForm.module.scss";

interface SelectFormProps {
  items: string[];
  value: string;
  onChange: (value: string) => AppThunk;
}

const SelectForm: React.FC<SelectFormProps> = ({ items, value, onChange }) => {
  const books: Books | null = useSelector(getBooks());
  const choosenBook: Book | null = useSelector(getChoosenBook());

  const dispatch: AppDispatch = useDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(onChange(event.target.value as string));

    if (books) {
      dispatch(handleChangeSelector());

      if (choosenBook) {
        dispatch(resetChoosenBook());
      }
    }
  };

  return (
    <Select
      className={styles.selectField}
      value={value}
      onChange={handleChange}
    >
      {items.map((item, i) => (
        <MenuItem key={i} value={i}>
          {item}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectForm;
