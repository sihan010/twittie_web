import React, { createContext, useState } from "react";

export const ModalContext = createContext();

const ModalContextProvider = (props) => {
    //allowPermission
    //revokePermission
    //redirect
    //info
    //notAvailable
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("allowPermission");

  return (
    <ModalContext.Provider
      value={{
        modalVisible, setModalVisible,
        modalType, setModalType
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
