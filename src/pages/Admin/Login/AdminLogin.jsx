import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../../../assets/css/admin/login.css';

const LoginForm = () => {
  return (
    <Container fluid className="login-container">
      <Row className="justify-content-center">
        <Col>
          <div className="login-box">
            {/* Logo */}
            <div className="text-center mb-4">
              <img src="images/FMFBlacklogo.svg" alt="Admin Logo" className="logo" />
            </div>

            {/* Login Form */}
            <Form>
              <Form.Group controlId="formEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  className="input-field"
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="input-field"
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="login-btn mt-4">
                Login
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
