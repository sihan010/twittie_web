import React, { createContext, useState } from "react";

export const SidebarContext = createContext();

const SidebarContextProvider = (props) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isTwitterView, setIsTwitterView] = useState(false);
  const [isDark, setIsDark] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        sidebarVisible,
        setSidebarVisible,
        isTwitterView,
        setIsTwitterView,
        isDark,
        setIsDark,
      }}
    >
      {props.children}
    </SidebarContext.Provider>
  );
};

export default SidebarContextProvider;
