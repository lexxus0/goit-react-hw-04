import { requestImagesBySearchValue } from "./services/images-api.js";
import { useEffect, useState, useRef } from "react";

import SearchBar from "./components/SearchBar/SearchBar.jsx";
import Loader from "./components/Loader/Loader.jsx";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";
import ImageModal from "./components/ImageModal/ImageModal.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";

const App = () => {
  const [searchValue, setSearchValue] = useState(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [settedImage, setSettedImage] = useState("");
  const [page, setPage] = useState(1);
  const galleryRef = useRef(null);

  useEffect(() => {
    if (!searchValue) return;

    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const data = await requestImagesBySearchValue(searchValue, page);
        setImages((prevImages) => [...prevImages, ...data.results]);
      } catch (e) {
        setIsError(e.message);
      } finally {
        setIsLoading(false);
        if (galleryRef.current && page > 1) {
          setTimeout(() => {
            const imgElements = galleryRef.current.querySelectorAll("li");
            if (imgElements.length > 0) {
              const imgH = imgElements[imgElements.length - 1].clientHeight;
              window.scrollBy({ top: imgH * 2, behavior: "smooth" });
            }
          }, 100);
        }
      }
    };

    fetchImages();
  }, [searchValue, page]);

  const onSearch = (searchedValue) => {
    setSearchValue(searchedValue);
    setImages([]);
    setPage(1);
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
      {isError && <ErrorMessage isError={isError} />}
      {isLoading && page === 1 && <Loader />}
      <div ref={galleryRef}>
        <ImageGallery images={images} onImgClick={onOpenModal} />
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
