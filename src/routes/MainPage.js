import React, { useContext, useEffect } from "react";
import { Sidebar, Segment, Menu } from "semantic-ui-react";
import { SidebarContext } from "../context/SidebarContext";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Details from "../components/DetailsComponent";
import Map from "../components/MapComponent";
import ModalBase from "../components/Modal";

const MainPage = () => {
  const { sidebarVisible, setSidebarVisible, isDark } = useContext(
    SidebarContext
  );
  const { setAuth, setUserName, setOauthToken, userName, auth } = useContext(
    AuthContext
  );

  useEffect(() => {
    checkUserVerification();
  }, []);

  const checkUserVerification = async () => {
    let authRaw = localStorage.getItem("auth");
    if (authRaw) {
      let authData = JSON.parse(authRaw);
      let responseRaw = await fetch(
        `${process.env.REACT_APP_API_BASE}/user/verifyUser`,
        {
          method: "POST",
          body: JSON.stringify({ id: authData._id }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let responseJSON = await responseRaw.json();
      //console.log(responseJSON);
      if (responseJSON.auth) {
        setAuth(true);
        setUserName(responseJSON.userName);
        setOauthToken(authData.oauth_token);
      }
    }
  };

  return (
    <div className={isDark ? "darkBackground" : "lightBackground"}>
      <Navbar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        auth={auth}
        userName={userName}
      />

      <Sidebar.Pushable as={Segment} className="contentContainer">
        <Sidebar
          as={Menu}
          animation="push"
          icon="labeled"
          vertical
          visible={sidebarVisible}
          width="very wide"
          style={{ backgroundColor: "transparent" }}
        >
          <Details />
        </Sidebar>

        <Sidebar.Pusher>
          <Segment basic>
            <Map />
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>

      <ModalBase />
    </div>
  );
};

export default MainPage;
