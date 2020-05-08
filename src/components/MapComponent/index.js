import React, { useState, useContext } from "react";
import ReactTooltip from "react-tooltip";
import { geoPath } from "d3-geo";
import { geoTimes } from "d3-geo-projection";

import { TrendsContext } from "../../context/TrendsContext";
import { MapContext } from "../../context/MapContext";
import { SidebarContext } from "../../context/SidebarContext";

import MapRenderer from "./MapRenderer";
import { AuthContext } from "../../context/AuthContext";
import { ModalContext } from "../../context/ModalContext";

const randomPointsOnPolygon = require("random-points-on-polygon");
const available = require("../../static/available.json");

const Map = () => {
  const { setTrendsList, setTrend } = useContext(TrendsContext);
  const {
    sidebarVisible,
    setSidebarVisible,
    setIsTwitterView,
  } = useContext(SidebarContext);
  const { position, setPosition, setMapLoading } = useContext(MapContext);
  const { auth, oauthToken } = useContext(AuthContext);
  const { setModalType, setModalVisible } = useContext(ModalContext);

  const [countryTooltip, setCountryTooltip] = useState("");
  const [hashTagTooltip, setHashTagTooltip] = useState("");

  let countries = [];
  countries.push("TW") //Taiwan
  for (let i = 1; i < available.length; i++) {
    if (!countries.includes(available[i].countryCode)) {
      countries.push(available[i].countryCode);
    }
  }

  const projection = () => {
    return geoTimes()
      .translate([800 / 2, 450 / 2])
      .scale(160);
  };

  const handleCountryClick = async (g) => {
    //console.log(g);
    const path = geoPath().projection(projection());
    const centroid = projection().invert(path.centroid(g));
    setPosition({ coordinates: centroid, zoom: 8 });

    if (!sidebarVisible) setSidebarVisible(true);
    setMapLoading(true);

    let countryCode = g.properties.WB_A2;
    if (countryCode === "-99") countryCode = "NO"; //Norway

    let woeids = [];
    for (let i = 1; i < available.length; i++) {
      if (
        available[i].countryCode === countryCode &&
        available[i].placeType.name === "Country" //Change if data for states/prefectures are allowed
      ) {
        woeids.push(available[i].woeid);
      }
    }

    if (woeids.length === 0) {
      setMapLoading(false);
      setModalType("notAvailable");
      setModalVisible(true);
      return;
    }

    for (let i = 0; i < woeids.length; i++) {
      let endpoint = `${process.env.REACT_APP_API_BASE}/trends/${woeids[i]}`;
      let response = await fetch(endpoint);
      let data = await response.json();
      let trends = JSON.parse(data.trend.trend).trends;

      var points = randomPointsOnPolygon(trends.length, g);

      for (let j = 0; j < trends.length; j++) {
        trends[j]["coordinates"] = points[j].geometry.coordinates;
      }

      let countryData = {};
      countryData[countryCode] = trends;

      setTrendsList(countryData);
      setMapLoading(false);
    }
  };

  const handleMarkerClick = async (e, trend) => {
    if (auth) {
      setIsTwitterView(true);
      await setTrend(trend, oauthToken);
    } else {
      setModalType("allowPermission");
      setModalVisible(true);
    }
  };

  return (
    <>
      <MapRenderer
        position={position}
        setPosition={setPosition}
        countries={countries}
        setCountryTooltip={setCountryTooltip}
        setHashTagTooltip={setHashTagTooltip}
        handleCountryClick={handleCountryClick}
        handleMarkerClick={handleMarkerClick}
      />
      <ReactTooltip arrowColor="transparent" className="countryTooltipStyle">
        {countryTooltip}
      </ReactTooltip>
      <ReactTooltip arrowColor="transparent" className="tagTooltipStyle">
        {hashTagTooltip}
      </ReactTooltip>
    </>
  );
};

export default Map;
