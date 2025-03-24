import Index from "views/Index.js";
import Profile from "views/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";

import Users from "views/Users/index";
import Drivers from "views/Drivers/index";
import DriversDocuments from "views/Drivers/documents";
import SupportMessages from "views/Support/index";
import DriverDetail from "views/Drivers/vehicledetail";
// import Clientms from "views/cms";
import FareManagement from "views/Faremanagement";
import Clientms from "views/CMS/cms";
import Rolesandpermission from "views/RolesandPermissions/Index";
import BookManagement from "views/Bookingmanagement/Index";
import RideLists from "views/Rides";
import TransactionHistory from "views/TransactionHistory";

var routes = [

  {
    path: "/user-profile",
    name: "Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
    IsVisible: true,
  },

  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
    IsVisible: true,
  },

  {
    path: "/cms",
    name: "CMS",
    // icon: "ni ni-tv-2 text-primary",
    icon:"fa-solid fa-bars-progress text-black",
    component: <Clientms />,
    layout: "/admin",
    IsVisible: true,   
  },
  {
    path: "/adsBanner",
    name: "Add Banner",
    // icon: "ni ni-tv-2 text-primary",
    icon:"fa-solid fa-bars-progress text-black",
    component: <Clientms />,
    layout: "/admin",
    IsVisible: false,   
  },
  {
    path: "/faq",
    name: "FAQ",
    icon:"fa-solid fa-bars-progress text-black",
    component: <Clientms />,
    layout: "/admin",
    IsVisible: false,
  },
  {
    path: "/discountCoupon",
    name: "DiscountCoupon",
    icon:"fa-solid fa-bars-progress text-black",
    component: <Clientms />,
    layout: "/admin",
    IsVisible: false,
  },
  {
    path: "/users",
    name: "Users",
    icon: "fa-solid fa-users text-info",
    component: <Users />,
    layout: "/admin",
    IsVisible: true,
  },
  {
    path: "/drivers",
    name: "Drivers",
    icon: "fas fa-user-astronaut text-warning",
    component: <Drivers />,
    layout: "/admin",
    IsVisible: true,
  },
  {
    path: "/ride",
    name: "Rides",
    icon: "fas fa-route text-success",
    component: <RideLists />,
    layout: "/admin",
    IsVisible: true,
  },
  {
    path: "/drivers/documents/:user_id",
    component: <DriversDocuments />,
    layout: "/admin",
    IsVisible: false,
  },

  {
    path: "user/drivers/vehicle/:user_id",
    component: <DriverDetail />,
    layout: "/admin",
    IsVisible: false,
  },

  {
    path: "user/:user_id",
    component: <DriverDetail />,
    layout: "/admin",
    IsVisible: false,
  },
  {
    path: "/messages",
    name: "Support Message",
    icon: "fa-solid fa-comment  text-yellow",
    component: <SupportMessages />,
    layout: "/admin",
    IsVisible: true,
  },

  // {
  //   path: "/bookingmanagement",
  //   name: "Booking Management",
  //   icon:  "fa-solid fa-list-check text-info", 
  //   component: <BookManagement/>,
  //   layout: "/admin",
  //   IsVisible: true,
  // },

  


  {
    path: "/faremanagement",
    name: "Fare Management",
    // icon: "fa-solid fa-comment  text-yellow",
    icon: "fa-solid fa-indian-rupee-sign text-black",
    component: <FareManagement />,
    layout: "/admin",
    IsVisible: true,
  },
  {
    path: "/transactionHistory",
    name: "Transaction History",
    // icon: "fa-solid fa-comment  text-yellow",
    icon: "fa-solid fa-indian-rupee-sign text-black",
    component: <TransactionHistory />,
    layout: "/admin",
    IsVisible: true,
  },

  // <i class="fa-solid fa-indian-rupee-sign"></i>

  {
    path: "/rolesandpermission",
    name: "Roles & Permission",
    // icon: "fa-solid fa-comment  text-yellow",
    icon:"fa-solid fa-hand text-yellow",
    component: <Rolesandpermission />,
    layout: "/admin",
    IsVisible: true,
  },

  // <i class="fa-solid fa-hand"></i>


 
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
    IsVisible: false,
  },


];
export default routes;
