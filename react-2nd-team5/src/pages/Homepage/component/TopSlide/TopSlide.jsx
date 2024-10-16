import React from "react";
import { useRecipeDataQuery } from "../../../../hooks/useRecipeData";
import { Alert } from "bootstrap";
import { responsiveTop } from "../../../../constants/responsiveTop";
import HomePageTopSlider from "../../../../common/Slider/HomePageTopSlider";
import LoadingLottie from "../../../../common/LoadingLottie/LoadingLottie";

const TopSlide = () => {
  const { data, isError, error, isLoading } = useRecipeDataQuery();
  if (isLoading) {
    return <LoadingLottie sectionHeight={"300px"} />;
  }
  if (isError) {
    return <Alert varient="danger">{error.message}</Alert>;
  }

  console.log(data);
  return <HomePageTopSlider data={data} responsiveTop={responsiveTop} />;
};

export default TopSlide;
