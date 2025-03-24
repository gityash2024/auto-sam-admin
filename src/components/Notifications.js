import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
} from "reactstrap";
const Notifications = () => {
  
  return (
    <UncontrolledDropdown nav>
      <DropdownToggle nav className="nav-link-icon">
        <i className="ni ni-bell-55" />
      </DropdownToggle>
      <DropdownMenu
        aria-labelledby="navbar-default_dropdown_1"
        className="dropdown-menu-arrow"
        right
      >
        <DropdownItem>Action</DropdownItem>
        <DropdownItem>Another action</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Something else here</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}
export default Notifications;