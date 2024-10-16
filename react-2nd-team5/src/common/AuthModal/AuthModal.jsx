import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./AuthModal.style.css";
import { Button } from "react-bootstrap";

const AuthModal = ({ isOpen, setIsOpen, menuList, toggleMenu }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Redux 상태에서 isLoggedIn 값을 가져옴
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
    setIsOpen(false);
  };

  const notWorked = () => {
    alert("작업 중입니다");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isMobile) return null;

  return (
    <div className={`modal-layer ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <div
          onClick={toggleMenu}
          className={`btn-modal-close ${isOpen ? "open" : ""}`}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        {console.log(user)}
        {/* 로그인 상태에 따라 guest 또는 auth 내용을 렌더링 */}
        {isLoggedIn ? (
          <div className="modal-content-top auth">
            <div className="greeting">Welcome</div>
            <p>반갑습니다</p>
            <p>
              요리왕 <span>{user?.userId}</span>님
            </p>
          </div>
        ) : (
          <div className="modal-content-top guest">
            <p>안녕하세요</p>
            <p>
              <strong>로그인</strong> 후 이용하세요
            </p>
            <Button onClick={goToLogin} className="btn-modal-login">
              로그인
            </Button>
          </div>
        )}

        <ul className={`modal-nav`}>
          <li className={`modal-nav-menu ${isOpen ? "active" : ""}`}>
            <Link
              to="/recipes"
              onClick={() => setIsOpen(false)} // 페이지 이동 시 모달 닫기
            >
              {menuList[0]}
            </Link>
          </li>
          <li
            onClick={notWorked}
            className={`modal-nav-menu ${isOpen ? "active" : ""}`}
          >
            <Link
              onClick={() => setIsOpen(false)} // 페이지 이동 시 모달 닫기
            >
              {menuList[1]}
            </Link>
          </li>
          <li
            onClick={notWorked}
            className={`modal-nav-menu ${isOpen ? "active" : ""}`}
          >
            <Link
              onClick={() => setIsOpen(false)} // 페이지 이동 시 모달 닫기
            >
              {menuList[2]}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AuthModal;
