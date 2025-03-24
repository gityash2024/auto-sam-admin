// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-between">
        <Col xl="12">
          <div className="copyright text-center text-xl-left text-muted">
            © {new Date().getFullYear()}{" "}
            <a
              className="font-weight-bold ml-1"
              href="https://techhelper.in/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Techhelper Technologies
            </a>
          </div>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
