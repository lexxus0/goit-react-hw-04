import css from "./ErrorMessage.module.css";

const ErrorMessage = ({ isError }) => {
  return (
    <div className={css.errorMessage}>
      {isError
        ? `${isError}, please try again!`
        : "An unknown error occurred. Please try again!"}{" "}
    </div>
  );
};

export default ErrorMessage;
