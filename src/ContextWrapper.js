import React from "react";
import MainPage from "./routes/MainPage";
import TrendsContextProvider from "./context/TrendsContext";
import MapContextProvider from "./context/MapContext";
import SidebarContextProvider from "./context/SidebarContext";
import AuthContextProvider from "./context/AuthContext";
import ModalContextProvider from "./context/ModalContext";

const ContextWrapper = () => {
  return (
    <AuthContextProvider>
      <SidebarContextProvider>
        <MapContextProvider>
          <TrendsContextProvider>
            <ModalContextProvider>
              <MainPage />
            </ModalContextProvider>
          </TrendsContextProvider>
        </MapContextProvider>
      </SidebarContextProvider>
    </AuthContextProvider>
  );
};

export default ContextWrapper;
