import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
} from "reactstrap";
import { Link } from "react-router-dom";
import { helper } from 'lib/helper';
import { useEffect, useState } from "react";
const UserProfileMenu = () => {
  const handleLogout = async (e) => {
    e.preventDefault()
    sessionStorage.clear();
    window.location.assign("/auth/login");
  }
  const [userData, setUserData] = useState(helper.userDetail.user());
  useEffect(() => {
    //console.log("ch");
    setUserData(helper.userDetail.user())
  }, [sessionStorage.getItem("userinfo")])
  return (
    <UncontrolledDropdown nav>
      <DropdownToggle className="pr-0" nav>
        <Media className="align-items-center">
          <span className="avatar avatar-sm rounded-circle">
            <img
              alt="..."
              src={require("../assets/img/blank-profile-picture.png")}
            />
          </span>
          <Media className="ml-2 d-none d-lg-block">
          <span className="mb-0 text-sm font-weight-bold" style={{color:'black'}}>
              {userData?.name}
            </span>
          </Media>
        </Media>
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-arrow" right>
        <DropdownItem className="noti-title" header tag="div">
          <h6 className="text-overflow m-0">Welcome!</h6>
        </DropdownItem>
        <DropdownItem to="/admin/user-profile" tag={Link}>
          <i className="ni ni-single-02" />
          <span>My profile</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket"></i>
          <span>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}
export default UserProfileMenu;