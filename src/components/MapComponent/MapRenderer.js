import React, { memo, useContext, useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import { TrendsContext } from "../../context/TrendsContext";

const data = require("../../static/ne_110m_admin_0_countries.json");

const MapRenderer = ({
  setCountryTooltip,
  setHashTagTooltip,
  countries,
  handleCountryClick,
  position,
  setPosition,
  handleMarkerClick,
}) => {
  const { trendsList } = useContext(TrendsContext);
  const [dimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight - 53,
  });

  const handleMoveEnd = (position) => {
    //console.log(position); //get perfect positioning from here and set it for initial position
    setPosition(position);
  };

  const colorSetter = (iosA2) => {
    if (iosA2 === "-99") return "#85C1E9";
    if (countries.includes(iosA2)) return "#85C1E9";
    else return "#B4B4B4";
  };

  const hoverFillSetter = (iosA2) => {
    if (iosA2 === "-99") return "#7FB3D5";
    if (countries.includes(iosA2)) return "#7FB3D5";
  };

  const windowResizeHandler = () => {
    let dimension = {
      width: window.innerWidth,
      height: window.innerHeight - 53,
    };
    //console.log(dimension);
    setDimension(dimension);
  };

  useEffect(() => {
    windowResizeHandler();
    window.addEventListener("resize", windowResizeHandler);
    return () => {
      window.removeEventListener("resize");
    };
  }, []);

  return (
    <div>
      <ComposableMap
        data-tip=""
        height={dimension.height}
        width={dimension.width}
        style={{ overflow: "hidden" }}
      >
        <ZoomableGroup
          className="zomableMap"
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies geography={data}>
            {({ geographies }) =>
              geographies.map((geo) => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={colorSetter(geo.properties.WB_A2)}
                    //stroke="#EBF5FB"
                    onClick={() => handleCountryClick(geo)}
                    onMouseEnter={() => {
                      const { NAME } = geo.properties;
                      setCountryTooltip(`${NAME}`);
                    }}
                    onMouseLeave={() => {
                      setCountryTooltip("");
                    }}
                    style={{
                      default: {
                        outline: "none",
                        //stroke: "#ECEFF1",
                      },
                      hover: {
                        outline: "none",
                        cursor: "pointer",
                        fill: hoverFillSetter(geo.properties.WB_A2),
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
          {Object.keys(trendsList).map((countryCode) => {
            return trendsList[countryCode].map((item, key) => {
              if (countryCode !== "world") {
                return (
                  <Marker
                    key={key}
                    coordinates={item.coordinates}
                    onClickCapture={(e) => handleMarkerClick(e, item)}
                  >
                    <text
                      textAnchor="middle"
                      className="hashTag"
                      onMouseEnter={() => setHashTagTooltip(item.name)}
                      onMouseLeave={() => setHashTagTooltip("")}
                    >
                      {item.name}
                    </text>
                  </Marker>
                );
              }
            });
          })}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default memo(MapRenderer);
