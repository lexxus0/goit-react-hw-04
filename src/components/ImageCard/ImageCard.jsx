const ImageCard = ({ small, regular, desc, onClick }) => {
  const handleClick = () => {
    onClick(regular);
  };

  return (
    <div>
      <img
        width="335"
        height="210"
        src={small}
        alt={desc}
        onClick={handleClick}
      />
    </div>
  );
};

export default ImageCard;
