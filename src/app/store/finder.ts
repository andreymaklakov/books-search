import { createSlice } from "@reduxjs/toolkit";

import { AppThunk, RootState } from "./createStore";

import { Book, Books } from "../../interfaces";
import { APIKey, categories } from "../../constants";

interface State {
  category: string;
  sortBy: string;
  searchField: string;
  books: Books | null;
  lastShownBookIndex: number;
  booksLoading: boolean;
  error: boolean;
  choosenBook: Book | null;
}

const initialState: State = {
  category: "0",
  sortBy: "0",
  searchField: "",
  books: null,
  lastShownBookIndex: 0,
  booksLoading: false,
  error: false,
  choosenBook: null,
};

const finderSlice = createSlice({
  name: "finder",
  initialState,
  reducers: {
    categoryChanged(state, action) {
      state.category = action.payload;
    },
    sortByChanged(state, action) {
      state.sortBy = action.payload;
    },
    searchFieldChanged(state, action) {
      state.searchField = action.payload;
    },
    searchHandled(state, action) {
      state.books = action.payload;

      state.lastShownBookIndex = state.lastShownBookIndex + 30;

      state.booksLoading = false;
    },
    showMoreHandled(state, action) {
      if (state.books) {
        state.books.items = [...state.books.items, ...action.payload.items];
      }

      state.lastShownBookIndex = state.lastShownBookIndex + 30;

      state.booksLoading = false;
    },
    lastShownBookIndexReseted(state) {
      state.lastShownBookIndex = 0;
    },
    booksLoading(state) {
      state.booksLoading = true;
    },
    errorRecieved(state) {
      state.error = true;
    },
    errorCleared(state) {
      state.error = false;
    },
    bookChoosen(state, action) {
      state.choosenBook = action.payload;
    },
    choosenBookReseted(state) {
      state.choosenBook = null;
    },
  },
});

const { reducer: finderReducer, actions } = finderSlice;
const {
  categoryChanged,
  sortByChanged,
  searchFieldChanged,
  searchHandled,
  showMoreHandled,
  lastShownBookIndexReseted,
  booksLoading,
  errorRecieved,
  errorCleared,
  bookChoosen,
  choosenBookReseted,
} = actions;

export const changeCategory =
  (value: string): AppThunk =>
  (dispatch): void => {
    dispatch(categoryChanged(value));
  };

export const changeSortBy =
  (value: string): AppThunk =>
  (dispatch): void => {
    dispatch(sortByChanged(value));
  };

export const changeSearchField =
  (value: string): AppThunk =>
  (dispatch): void => {
    dispatch(searchFieldChanged(value));
  };

export const chooseBook =
  (value: Book): AppThunk =>
  (dispatch): void => {
    dispatch(bookChoosen(value));
  };

export const resetChoosenBook =
  (): AppThunk =>
  (dispatch): void => {
    dispatch(choosenBookReseted());
  };

const recieveData =
  (): AppThunk =>
  async (dispatch, getState): Promise<void> => {
    const category = categories.find(
      (_, i) => i === Number(getState().finder.category)
    );
    const subject = category !== "all" ? `+subject:${category}` : "";
    const search = getSearchField()(getState());
    const index = getState().finder.lastShownBookIndex;
    const sort = getState().finder.sortBy;

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${search}${subject}&maxResults=30&startIndex=${index}&&orderBy=${sort}&key=${APIKey}`
      );
      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
      dispatch(errorRecieved());
    }
  };

export const handleSearch =
  (isShowMore: boolean): AppThunk =>
  async (dispatch): Promise<void> => {
    dispatch(errorCleared());

    if (!isShowMore) {
      dispatch(booksLoading());

      dispatch(lastShownBookIndexReseted());
    }

    try {
      const data = await dispatch(recieveData());

      if (!isShowMore) {
        dispatch(searchHandled(data));
      } else if (isShowMore) {
        dispatch(showMoreHandled(data));
      }
    } catch (error) {
      console.error(error);
      dispatch(errorRecieved());
    }
  };

export const handleChangeSelector =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    dispatch(errorCleared());
    dispatch(booksLoading());

    dispatch(lastShownBookIndexReseted());

    try {
      const data = await dispatch(recieveData());

      dispatch(searchHandled(data));
    } catch (error) {
      console.error(error);
      dispatch(errorRecieved());
    }
  };

export const getCategory = () => (state: RootState) => state.finder.category;
export const getSortBy = () => (state: RootState) => state.finder.sortBy;
export const getSearchField = () => (state: RootState) =>
  state.finder.searchField;
export const getBooks = () => (state: RootState) => state.finder.books;
export const getBooksLoading = () => (state: RootState) =>
  state.finder.booksLoading;
export const getError = () => (state: RootState) => state.finder.error;
export const getChoosenBook = () => (state: RootState) =>
  state.finder.choosenBook;

export default finderReducer;
