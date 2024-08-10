import { LineWave } from "react-loader-spinner";

const Loader = () => {
  const loaderStyles = {
    display: "flex",
    justifyContent: "center",
    height: "100vh",
    width: "100%",
  };

  return (
    <LineWave
      visible={true}
      height="100"
      width="100"
      color="#4fa94d"
      ariaLabel="line-wave-loading"
      wrapperStyle={loaderStyles}
      wrapperClass=""
      firstLineColor=""
      middleLineColor=""
      lastLineColor=""
    />
  );
};

export default Loader;
