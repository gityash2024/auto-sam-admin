import React, { useEffect, useState } from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    var sessionData = JSON.parse(sessionStorage.getItem("userinfo"));
    if (sessionData) {
      if (sessionData?.role !== "admin") {
        window.location.assign("/auth/login");
      } else {
        setIsloading(false)
        if (location.pathname === "/") {
          window.location.assign("/admin/index");
        }
      }
    } else {
      window.location.assign("/auth/login");
    }
  }, [location]);

  useEffect(() => {
    if(!isLoading) {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      mainContent.current.scrollTop = 0;
    }
  }, [isLoading])

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      {!isLoading && (
        <>
          <Sidebar
            {...props}
            routes={routes}
            logo={{
              innerLink: "/admin/index",
              imgSrc: require("../assets/img/brand/auto-pool-logo-black.png"),
              imgAlt: "...",
            }}
          />
          <div className="main-content" ref={mainContent}>
            <AdminNavbar
              {...props}
              brandText={getBrandText(props?.location?.pathname)}
            />
            <Routes>
              {getRoutes(routes)}
              <Route path="*" element={<Navigate to="/admin/index" replace />} />
            </Routes>
            <Container fluid>
              <AdminFooter />
            </Container>
          </div>
        </>
      )}

    </>
  );
};

export default Admin;
