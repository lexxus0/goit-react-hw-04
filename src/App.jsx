import { fetchImages } from "./redux/images/operations.js";
import { useEffect, useState, useRef } from "react";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import Loader from "./components/Loader/Loader.jsx";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";
import ImageModal from "./components/ImageModal/ImageModal.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";
import {
  selectImages,
  selectError,
  selectIsLoading,
} from "./redux/images/selectors.js";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const images = useSelector(selectImages);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  const [searchValue, setSearchValue] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [settedImage, setSettedImage] = useState("");
  const [page, setPage] = useState(1);
  const galleryRef = useRef(null);

  useEffect(() => {
    if (!searchValue) return;

    dispatch(fetchImages({ query: searchValue, page }));
  }, [searchValue, page, dispatch]);

  const onSearch = (searchedValue) => {
    setSearchValue(searchedValue);
    setPage(1);
    dispatch(fetchImages({ query: searchedValue, page: 1 }));
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const onOpenModal = (small) => {
    setSettedImage(small);
    setModalIsOpen(true);
  };

  const onCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <SearchBar onSearch={onSearch} />
      {error && <ErrorMessage />}
      {isLoading && page === 1 && <Loader />}
      <div ref={galleryRef}>
        <ImageGallery onImgClick={onOpenModal} />
      </div>
      {isLoading && page > 1 && <Loader />}
      {images.length > 0 && !isLoading && <LoadMoreBtn loadMore={loadMore} />}
      <ImageModal
        isOpen={modalIsOpen}
        onClose={onCloseModal}
        small={settedImage}
      />
    </div>
  );
};

export default App;
