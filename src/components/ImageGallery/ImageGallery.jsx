import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { useSelector } from "react-redux";
import { selectImages } from "../../redux/images/selectors";

const ImageGallery = ({ onImgClick }) => {
  const images = useSelector(selectImages);

  return (
    <ul className={css.galleryList}>
      {images.map((image) => (
        <li key={image.id} className={css.galleryItem}>
          <ImageCard
            small={image.urls.small}
            desc={image.description}
            regular={image.urls.regular}
            onClick={onImgClick}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
