import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useRecipeDataQuery } from "../../../../hooks/useRecipeData";
import "./RandomRecipe.style.css"; // 스타일을 위한 CSS 파일
import LoadingLottie from "../../../../common/LoadingLottie/LoadingLottie";
import { useNavigate } from "react-router-dom";

const RandomRecipe = () => {
  const { data, isLoading, isError } = useRecipeDataQuery(); // 데이터 로드
  const [randomRecipe, setRandomRecipe] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const goMore = () => {
    navigate(`/recipes/${randomRecipe.RCP_NM}`);
  };

  // 랜덤으로 하나의 레시피 선택
  useEffect(() => {
    if (data && data.length > 0) {
      const updateRandomRecipe = () => {
        setIsActive(true);
        const randomIndex = Math.floor(Math.random() * data.length);
        setRandomRecipe(data[randomIndex]);
        setTimeout(function () {
          setIsActive(false);
        }, 8500);
      };

      // 컴포넌트 로드 시 한 번 레시피 선택
      updateRandomRecipe();

      // 9초마다 레시피 변경
      const intervalId = setInterval(updateRandomRecipe, 9000);

      // 컴포넌트가 언마운트될 때 인터벌을 정리
      return () => clearInterval(intervalId);
    }
  }, [data]); // data가 업데이트되면 실행

  if (isLoading) {
    return <LoadingLottie sectionHeight={"300px"} />; // 로딩 상태 처리
  }

  if (isError || !randomRecipe) {
    return <h2>데이터를 불러오지 못했습니다</h2>; // 에러 처리
  }

  return (
    <section className="random-recipe">
      <div className="random-recipe-overlay">
        <img
          src="https://images.unsplash.com/photo-1505935428862-770b6f24f629?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGNvb2tpbmclMjB0YWJsZXxlbnwwfHwwfHx8MA%3D%3D"
          alt="random-recipe-bg"
        />
      </div>
      <div className="random-title-text">오늘의 추천요리!</div>
      <Container className="random-recipe-container">
        <div className="random-recipe-container-wrapper">
          <div
            className={`random-recipe-img ${isActive ? "fade-in" : "fade-out"}`}
          >
            <div className="random-recipe-img-overlay">img overlay</div>
            <img
              src={randomRecipe.ATT_FILE_NO_MAIN}
              alt={randomRecipe.RCP_NM}
            />
          </div>
          <div
            className={`random-recipe-content ${isActive ? "fade-in" : "fade-out"}`}
          >
            <div className="random-recipe-content-overlay">content overlay</div>
            <div className="random-recipe-tag1"># {randomRecipe.RCP_PAT2}</div>
            <h3>{randomRecipe.RCP_NM}</h3>
            <div className="random-recipe-content1">
              <p className="random-recipe-tag2">준비물: </p>
              <p>
                {randomRecipe.RCP_PARTS_DTLS.length < 60
                  ? randomRecipe.RCP_PARTS_DTLS
                  : randomRecipe.RCP_PARTS_DTLS.slice(0, 60) + "..."}
              </p>
            </div>
            <p className="random-recipe-content2">
              {randomRecipe.RCP_NA_TIP.length < 60
                ? randomRecipe.RCP_NA_TIP
                : randomRecipe.RCP_NA_TIP.slice(0, 60) + "..."}
            </p>
            <Button onClick={goMore} className="btn-detail" variant="primary">
              자세히보기 &gt;
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default RandomRecipe;
