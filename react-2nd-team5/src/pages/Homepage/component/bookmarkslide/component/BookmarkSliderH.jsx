import React from "react";
import BookmarkCardList from "./BookmarkCardList";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../../../../../constants/responsive";
import NoFindPage from "../../../../../common/nofindpage/NoFindPage";
import BookmarkNotSliderCard from "./BookmarkNotSliderCard";
import { Card, Col, Container, Row } from "react-bootstrap";
import "./Bookmarkcomponent.Style.css";
const BookmarkSliderH = ({ guestBookmarks }) => {
  const hasData = Array.isArray(guestBookmarks) && guestBookmarks.length > 0;

  return (
    <div>
      {hasData ? (
        guestBookmarks.length > 4 ? ( // 데이터 개수가 3개 초과일 때 Carousel 사용
          <Carousel
            infinite={true}
            centerMode={true}
            itemClass="recipe-slider p-1"
            containerClass="carousel-container2"
            responsive={responsive}
          >
            {guestBookmarks.map((guestmark, index) => (
              <BookmarkCardList guestBookmarks={guestmark} key={index} />
            ))}
          </Carousel>
        ) : (
          // 데이터 개수가 3개 이하일 때 카드 형태로 보여주기
          <Container
            className="bookmark-card-container card_list"
            // style={{ display: "flex" }}
          >
            {guestBookmarks.map((guestmark, index) => (
              <BookmarkNotSliderCard guestBookmarks={guestmark} key={index} />
            ))}
          </Container>
        )
      ) : (
        <p>
          <NoFindPage />
        </p>
      )}
    </div>
  );
};

export default BookmarkSliderH;
