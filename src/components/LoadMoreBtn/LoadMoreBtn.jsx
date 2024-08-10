import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ loadMore }) => {
  return (
    <div className={css.loadMoreWrapper}>
      <button className={css.loadMoreBtn} type="button" onClick={loadMore}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
