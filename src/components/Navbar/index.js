import React, { useContext } from "react";
import { Icon, Popup } from "semantic-ui-react";
import { MapContext } from "../../context/MapContext";
import { ModalContext } from "../../context/ModalContext";
import { SidebarContext } from "../../context/SidebarContext";

const brand = require("../../static/brand.png");

const Navbar = ({ sidebarVisible, setSidebarVisible, auth, userName }) => {
  const { position, setPosition } = useContext(MapContext);
  const { setModalVisible, setModalType } = useContext(ModalContext);
  const { isDark, setIsDark } = useContext(SidebarContext);

  const zoomInPressed = () => {
    let newZoom = position.zoom + 1;
    if (newZoom <= 10) setPosition({ ...position, zoom: newZoom });
  };

  const zoomOutPressed = () => {
    let newZoom = position.zoom - 1;
    if (newZoom >= 1) setPosition({ ...position, zoom: newZoom });
  };

  const resetZoomPressed = () => {
    setPosition({
      coordinates: [21.084052060732283, 6.063252463003248],
      zoom: 2,
    });
  };

  const handleAuthClick = () => {
    if (auth) {
      setModalType("revokePermission");
      setModalVisible(true);
    } else {
      setModalType("allowPermission");
      setModalVisible(true);
    }
  };

  const siteInfoPressed = () => {
    setModalType("info");
    setModalVisible(true);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <nav className="navbar" style={{boxShadow: isDark?"0 2px 4px -4px white":"0 2px 4px -4px gray"}}>
      <Popup
        basic
        content={sidebarVisible ? "Collapse Trends Panel" : "Show Trends"}
        trigger={
          <Icon
            name={sidebarVisible ? "chevron left" : "bars"}
            size="large"
            color="orange"
            style={{cursor:"pointer"}}
            onClick={() => setSidebarVisible(!sidebarVisible)}
          />
        }
      />

      <span
        className="navbar-brand mx-auto"
        style={{ fontFamily: "Comic Neue" }}
      >
        <img
          src={brand}
          style={{ height: 50, width: 50, marginLeft: 100 }}
          alt="twittie"
        />
        <p
          style={{
            fontFamily: "Comic Neue",
            fontWeight:"bold",
            fontSize:20,
            display: "inline",
            color: "#F4511E",
          }}
        >
          Twittie
        </p>
      </span>

      {auth ? (
        <span
          className="userBadge"
          style={{ cursor: "pointer" }}
          onClick={() => handleAuthClick()}
        >
          <Icon name="twitter" size="large" color="blue" />
          <p style={{ fontFamily: "Comic Neue" }}>{userName}</p>
        </span>
      ) : (
        <span
          className="userBadge"
          style={{ cursor: "pointer" }}
          onClick={() => handleAuthClick()}
        >
          <Icon name="twitter" size="large" color="grey" />
          <p style={{ fontFamily: "Comic Neue" }}>Allow Permission</p>
        </span>
      )}
      <Popup
        basic
        content="Zoom-In to Map"
        trigger={
          <Icon
            name="zoom-in"
            size="large"
            color="orange"
            onClick={zoomInPressed}
            style={{ cursor: "pointer" }}
          />
        }
      />
      <Popup
        basic
        content="Zoom-Out from Map"
        trigger={
          <Icon
            name="zoom-out"
            size="large"
            color="orange"
            onClick={zoomOutPressed}
            style={{ cursor: "pointer" }}
          />
        }
      />
      <Popup
        basic
        content="Reset Map"
        trigger={
          <Icon
            name="undo"
            size="large"
            color="orange"
            onClick={resetZoomPressed}
            style={{ cursor: "pointer" }}
          />
        }
      />
      <Popup
        basic
        content="Information"
        trigger={
          <Icon
            name="info"
            size="large"
            color="green"
            onClick={siteInfoPressed}
            style={{ cursor: "pointer" }}
          />
        }
      />
      <Popup
        basic
        content="Theme Toggle"
        trigger={
          <Icon
            name="adjust"
            size="large"
            color={isDark ? "yellow" : "grey"}
            onClick={toggleTheme}
            style={{ cursor: "pointer" }}
          />
        }
      />
    </nav>
  );
};

export default Navbar;
