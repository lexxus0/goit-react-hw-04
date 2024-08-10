import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

import { useState } from "react";

const ImageGallery = ({ images, onImgClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  return (
    <ul className={css.galleryList}>
      {images.map((image, index) => (
        <li
          key={image.id}
          className={css.galleryItem}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.6 : 1,
            transform: hoveredIndex === index ? "scale(1.1)" : "scale(1)",
          }}
        >
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
