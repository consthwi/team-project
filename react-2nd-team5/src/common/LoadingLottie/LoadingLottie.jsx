import React from "react";
import "./LoadingLottie.style.css";
import loadingLottieImage from "../assets/LoadingLottie_x2.json";
import Lottie from "lottie-react";

const LoadingLottie = ({ sectionHeight }) => {
  return (
    // LoadingLottie 컴포넌트 호출 시, sectionHeight 지정, 기본값 100vh
    <div className="loading-lottie" style={{ height: sectionHeight }}>
      <strong>불러오는 중입니다..</strong>
      <Lottie className="lottie-img" animationData={loadingLottieImage} />
    </div>
  );
};

export default LoadingLottie;
