import css from "./SearchBar.module.css";
import { Field, Form, Formik } from "formik";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { Toaster, toast } from "react-hot-toast";

const SearchBar = ({ onSearch }) => {
  return (
    <header className={css.searchHead}>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <Formik
        initialValues={{ searchedValue: "" }}
        onSubmit={(values, actions) => {
          const trimmedValue = values.searchedValue.trim();

          if (trimmedValue === "") {
            toast.error("Please enter a value to search images!");
            return;
          }
          onSearch(trimmedValue);
          actions.resetForm();
        }}
      >
        <Form className={css.searchForm}>
          <Field
            className={css.searchField}
            type="text"
            name="searchedValue"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button className={css.searchBtn} type="submit">
            <HiMiniMagnifyingGlass className={css.magnifyGlass} />
          </button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
