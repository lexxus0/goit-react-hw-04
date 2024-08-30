import css from "./ErrorMessage.module.css";
import { selectError } from "../../redux/images/selectors";
import { useSelector } from "react-redux";

const ErrorMessage = ({ isError }) => {
  const error = useSelector(selectError);

  return (
    <div className={css.errorMessage}>
      {isError
        ? `${error}, please try again!`
        : "An unknown error occurred. Please try again!"}{" "}
    </div>
  );
};

export default ErrorMessage;
