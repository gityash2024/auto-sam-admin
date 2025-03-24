import { Link } from "react-router-dom";
// reactstrap components
import { Navbar, Nav, Container } from "reactstrap";
import UserProfileMenu from "components/UserProfileMenu";
import Notifications from "components/Notifications";

const AdminNavbar = (props) => {
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-uppercase d-none d-md-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>      

                 
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <Notifications />
              <UserProfileMenu />
            </Nav>
        
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
