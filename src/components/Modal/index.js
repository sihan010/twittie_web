import React, { useContext } from "react";
import { Icon } from "semantic-ui-react";
import Modal from "react-modal";
import { ModalContext } from "../../context/ModalContext";
import { AuthContext } from "../../context/AuthContext";
import ReactCountryFlag from "react-country-flag";

Modal.setAppElement("#root");

const ModalBase = (props) => {
  const { modalVisible, setModalVisible, modalType, setModalType } = useContext(
    ModalContext
  );
  const { setAuth } = useContext(AuthContext);
  const allowPermissionAction = async () => {
    setModalType("redirect");
    let userDetailsResponse = await fetch(
      `${process.env.REACT_APP_API_BASE}/user/getOAuthToken`
    );
    let userDetails = await userDetailsResponse.json();
    //console.log(userDetails);
    localStorage.setItem("auth", JSON.stringify(userDetails));
    let authUrl = `https://api.twitter.com/oauth/authenticate?oauth_token=${userDetails.oauth_token}`;
    window.open(authUrl, "_blank");
  };

  const revokePermissionAction = () => {
    localStorage.removeItem("auth");
    setAuth(false);
    setModalVisible(false);
  };

  const gotoLinkedInProfile = () => {
    window.open("https://www.linkedin.com/in/sihan010/", "_blank");
  };

  let modalContent;

  const ALLOW_PERMISSION = (
    <div style={{ fontFamily: "Comic Neue", textAlign: "center" }}>
      <p>
        Twittie needs to work alongside Twitter to show latest tweets.
        <br />
        Please grant permission.
        <br /> If allowed, You will be redirected to Twitter.
        <br />
        <span style={{ color: "#148F77" }}>
          This is one-time unless you revoke the permission.
        </span>
      </p>
      <div className="row">
        <div className="col-md-12">
          <button
            className="btn btn-primary m-2"
            onClick={allowPermissionAction}
          >
            Allow and Go
          </button>
          <button
            className="btn btn-danger m-2"
            onClick={() => setModalVisible(false)}
          >
            Deny and Stay
          </button>
        </div>
      </div>
    </div>
  );

  const REVOKE_PERMISSION = (
    <div style={{ fontFamily: "Comic Neue", textAlign: "center" }}>
      <p>
        You have granted us access to show latest tweets.
        <br />
        You can revoke the permission here.
        <br />
        You may need to grant permission again to see Tweets.
      </p>
      <div className="row">
        <div className="col-md-12">
          <button
            className="btn btn-danger m-2"
            onClick={revokePermissionAction}
          >
            Revoke Permission
          </button>
        </div>
      </div>
    </div>
  );

  const REDIRECT = (
    <div style={{ fontFamily: "Comic Neue", textAlign: "center" }}>
      <p>Redirecting to Twitter to seek permission...</p>
      <br />
      <p>Please refresh the page if you already granted permission.</p>
    </div>
  );

  const NOT_AVAILABLE = (
    <div style={{ fontFamily: "Comic Neue", textAlign: "center" }}>
      <p>Sorry!!! <Icon name="frown" size="large" color="red" /></p>
      <br />
      <p>Twitter does not provide trends for this country.</p>
    </div>
  );

  const INFO = (
    <div style={{ fontFamily: "Comic Neue", textAlign: "center" }}>
      <p style={{ fontSize: 16 }}>
        Built with <Icon name="heart" size="large" color="red" /> in
        <ReactCountryFlag
          countryCode="BD"
          svg
          style={{
            width: "2em",
            height: "2em",
            marginLeft: "8px",
          }}
          title="Bangladesh"
        />{" "}
        Using
      </p>
      <br />
      <Icon name="react" size="huge" color="blue" />
      <Icon name="node js" size="huge" color="olive" />
      <br />
      <br />
      <p onClick={gotoLinkedInProfile} style={{ cursor: "pointer" }}>
        Find me in <Icon name="linkedin" size="big" color="blue" />
      </p>
    </div>
  );

  switch (modalType) {
    case "allowPermission":
      modalContent = ALLOW_PERMISSION;
      break;
    case "revokePermission":
      modalContent = REVOKE_PERMISSION;
      break;
    case "redirect":
      modalContent = REDIRECT;
      break;
    case "info":
      modalContent = INFO;
      break;
    case "notAvailable":
      modalContent = NOT_AVAILABLE;
      break;
    default:
      modalContent = ALLOW_PERMISSION;
      break;
  }

  return (
    <Modal
      isOpen={modalVisible}
      contentLabel="TrendyTags Notifications"
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(52, 73, 94, 0.75)",
        },
        content: {
          position: "absolute",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          border: "1px solid #ccc",
          background: "#fff",
          overflow: "hidden",
          borderRadius: "10px",
          outline: "none",
          padding: "5px",
          width: "500px",
        },
      }}
    >
      <div className="row">
        <div className="col-md-12">
          <Icon
            name="close"
            size="large"
            color="orange"
            style={{
              float: "right",
              cursor: "pointer",
              display: "block",
              marginTop: "5px",
            }}
            onClick={() => setModalVisible(false)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div style={{ margin: "5px", padding: "10px" }}>{modalContent}</div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalBase;
