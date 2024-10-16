import React, { useEffect, useState } from "react";
import { useRecipeDataQuery } from "../../hooks/useRecipeData";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./RecipePage.style.css";
import CardComponent from "./components/CardComponent";
import ReactPaginate from "react-paginate";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleBookmark } from "../../redux/reducer/bookmarkReducer";
import { useBookmark } from "../../hooks/useBookmark"; // useBookmark 훅 사용
import SelectMenu from "./components/SelectMenu";
import { useSearchParams } from "react-router-dom";
import LoadingLottie from "../../common/LoadingLottie/LoadingLottie";
const ITEM_PER_PAGE = 12;

const RecipePage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [originalData, setOriginalData] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [query] = useSearchParams();
  const [keyword, setKeyword] = useState(query.get("q") || "");
  const [title, setTitle] = useState("다양한");

  const { bookmarkedRecipes, isBookmarked, toggleBookmark } = useBookmark();
  const { data, isLoading, error } = useRecipeDataQuery();
  console.log("bookmarkedRecipes from RecipePage:", bookmarkedRecipes);

  useEffect(() => {
    if (data) {
      setOriginalData(data);
    }
  }, [data]);

  const handleSortClick = (sortType, newTitle) => {
    if (sort === sortType) {
      setSort("");
      setCurrentPage(0);
      setTitle("다양한");
    } else {
      setSort(sortType);
      setCurrentPage(0);
      setTitle(newTitle);
    }
  };

  const handleSelectChange = (selectedOption) => {
    setFilter(selectedOption ? selectedOption.value : "");
    setSelectValue(selectedOption ? selectedOption.value : "");
    setCurrentPage(0);
  };

  const handleReset = () => {
    setKeyword("");
    setFilter("");
    setSort("");
    setCurrentPage(0);
    setTitle("다양한");
  };

  const searchRecipe = keyword
    ? originalData.filter((recipe) => recipe.RCP_NM.includes(keyword))
    : originalData;

  //필터가 있으면 필터 데이터 없으면 기존 데이터
  const filterRecipe =
    filter.length > 0
      ? searchRecipe.filter((recipe) => recipe.RCP_PAT2.includes(filter))
      : searchRecipe;

  const sortRecipe =
    sort.length > 0 && sort === "INFO_PRO"
      ? [...filterRecipe].sort((a, b) => b[sort] - a[sort])
      : sort.length > 0
        ? [...filterRecipe].sort((a, b) => a[sort] - b[sort])
        : filterRecipe;

  // 필터가 바뀔떄마다 페이지네이션을 1페이지로 이동
  // useEffect(() => {
  //   setCurrentPage(0);
  // }, []);

  if (isLoading) {
    return <LoadingLottie />;
  }

  if (error) {
    return <div>Error loading data</div>;
  }
  // console.log(filterRecipe);

  //제공 데이터에 페이지와 아이템 갯수가 없어서 직접 구현
  // 12개씩 잘라서 랜더링
  //토탈페이지는 필터데이터를 렌더링 갯수로 나눈 수
  const startIndex = currentPage * ITEM_PER_PAGE;
  const endIndex = startIndex + ITEM_PER_PAGE;
  const paginateRecipes = sortRecipe.slice(startIndex, endIndex);
  const totalPage = Math.ceil(sortRecipe.length / ITEM_PER_PAGE);

  return (
    <Container className="recipe-page">
      <Row className="text-wrapper">
        <Col>
          <h1 className="title-text text-center">{title} 한끼 만들기</h1>
        </Col>
      </Row>

      <Row className="mb-2 ">
        <Col className="text-center mobile-button-spacing ">
          <Button
            variant="outline-primary"
            size="lg"
            className="me-2"
            onClick={handleReset}
            style={{
              backgroundColor: sort ? "transparent" : "#ED0C0C",
              color: sort ? "#848484" : "white",
              borderColor: sort ? "#848484" : "#ED0C0C",

              borderRadius: "2rem",
            }}
          >
            전체 보기
          </Button>
          <Button
            variant="outline-primary"
            style={{
              backgroundColor: sort === "INFO_ENG" ? "#ED0C0C" : "transparent",
              color: sort === "INFO_ENG" ? "white" : "#848484",
              borderColor: sort === "INFO_ENG" ? "#ED0C0C" : "#848484",
              borderRadius: "2rem",
            }}
            size="lg"
            className="me-2"
            onClick={() => handleSortClick("INFO_ENG", "저열량")}
          >
            저열량 레시피
          </Button>
          <Button
            variant="outline-primary"
            style={{
              backgroundColor: sort === "INFO_NA" ? "#ED0C0C" : "transparent",
              color: sort === "INFO_NA" ? "white" : "#848484",
              borderColor: sort === "INFO_NA" ? "#ED0C0C" : "#848484",
              borderRadius: "2rem",
            }}
            size="lg"
            className="me-2"
            onClick={() => handleSortClick("INFO_NA", "저염식")}
          >
            저염식 레시피
          </Button>
          <Button
            variant="outline-primary"
            style={{
              backgroundColor: sort === "INFO_PRO" ? "#ED0C0C" : "transparent",
              color: sort === "INFO_PRO" ? "white" : "#848484",
              borderColor: sort === "INFO_PRO" ? "#ED0C0C" : "#848484",
              borderRadius: "2rem",
            }}
            size="lg"
            className="me-2"
            onClick={() => handleSortClick("INFO_PRO", "고단백")}
          >
            고단백 레시피
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-end mb-3">
        <Col xs="auto">
          <SelectMenu
            selectValue={selectValue}
            handleSelectChange={handleSelectChange}
          />
        </Col>
      </Row>
      <Row className="g-3">
        {paginateRecipes &&
          paginateRecipes.map((recipe) => (
            <CardComponent
              key={recipe.RCP_SEQ}
              recipe={recipe}
              isBookmarked={isBookmarked(recipe)}
              handleBookMark={() => toggleBookmark(recipe)}
            />
          ))}
      </Row>
      <Row className="mt-4">
        <Col className="text-center">
          <ReactPaginate
            nextLabel=">"
            onPageChange={(selected) => {
              setCurrentPage(selected.selected);
              window.scrollTo(0, 0);
            }}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            pageCount={totalPage}
            previousLabel="<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="previous"
            previousLinkClassName="previous-link"
            nextClassName="next"
            nextLinkClassName="next-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={currentPage}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default RecipePage;
