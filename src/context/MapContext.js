import React, { createContext, useState } from "react";

export const MapContext = createContext();

const MapContextProvider = (props) => {
  const [position, setPosition] = useState({
    coordinates: [21.084052060732283, 6.063252463003248],
    zoom: 2,
  });
  const [mapLoading, setMapLoading] = useState(false);
  return (
    <MapContext.Provider
      value={{ position, setPosition, mapLoading, setMapLoading }}
    >
      {props.children}
    </MapContext.Provider>
  );
};

export default MapContextProvider;
