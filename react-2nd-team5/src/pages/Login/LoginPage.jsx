import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/reducer/authReducer";
import { useNavigate, useLocation } from "react-router-dom";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import "./LoginPage.style.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    if (userId === "" || password === "") {
      alert("유저네임과 비밀번호를 모두 입력하세요.");
      return;
    }

    const userData = { userId, password };
    dispatch(login(userData));
    navigate(from, { replace: true });
  };

  return (
    <div className="login-background">
      <Container
        fluid
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Row>
          <Col>
            <h3 className="title">로그인</h3>

            <div className="login-box">
              <div className="move-down">
                <Form onSubmit={handleLogin}>
                  <Form.Group controlId="formUserId" className="mb-3">
                    <Form.Control
                      type="text"
                      className="login-text-input"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder="아이디를 입력해주세요"
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword" className="mb-4">
                    <Form.Control
                      type="password"
                      className="login-text-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="비밀번호를 입력해주세요"
                    />
                  </Form.Group>

                  <Form.Group className="text-center">
                    <div className="d-grid gap-2">
                      <Button className="login-btn" type="submit">
                        로그인
                      </Button>
                    </div>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
