import React from "react";
import "./NewSliderCard.style.css";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
import { RxBookmark, RxBookmarkFilled } from "react-icons/rx";
import { useBookmark } from "../../hooks/useBookmark";

const SliderCard = ({ recipeitem }) => {
  const { isBookmarked, toggleBookmark } = useBookmark();
  const navigate = useNavigate();

  const godetail = () => {
    navigate(`/recipes/${recipeitem?.RCP_NM}`);
  };

  return (
    <Row xs={1} md={2} className="g-4">
      <Col>
        <Card className="slidercard_url">
          <Card.Img
            variant="top"
            src={recipeitem?.ATT_FILE_NO_MAIN}
            className="card_img"
            onClick={godetail}
          />
          <Card.Body>
            <div className="card-body-content">
              <div className="slidercard_rcp_nm" onClick={godetail}>
                <div className="recipeitem">{recipeitem?.RCP_WAY2}</div>
                <div>{recipeitem?.RCP_NM}</div>
              </div>
              <div>
                {isBookmarked(recipeitem) ? (
                  <RxBookmarkFilled
                    className="bookmark-icon-inSlidercard"
                    size="2rem"
                    onClick={() => toggleBookmark(recipeitem)}
                  />
                ) : (
                  <RxBookmark
                    className="bookmark-icon-inSlidercard"
                    size="2rem"
                    onClick={() => toggleBookmark(recipeitem)}
                  />
                )}
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default SliderCard;
