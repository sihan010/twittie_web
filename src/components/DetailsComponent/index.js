import React, { useState, useContext, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import CountryAccordion from "./CountryAccordion";
import TwitterTweets from "./TwitterTweets";

import { TrendsContext } from "../../context/TrendsContext";
import { MapContext } from "../../context/MapContext";
import { SidebarContext } from "../../context/SidebarContext";
import { AuthContext } from "../../context/AuthContext";
import { ModalContext } from "../../context/ModalContext";

const Details = () => {
  const { trendsList, setTrendsList, trend, setTrend } = useContext(
    TrendsContext
  );
  const { isTwitterView, setIsTwitterView } = useContext(SidebarContext);
  const { mapLoading } = useContext(MapContext);
  const { auth, oauthToken } = useContext(AuthContext);
  const { setModalVisible, setModalType } = useContext(ModalContext);

  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    getWorldWideTrends();
  }, []);

  const getWorldWideTrends = () => {
    let endpoint = `${process.env.REACT_APP_API_BASE}/trends/1`;
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        let trends = JSON.parse(data.trend.trend).trends;
        let countryData = {};
        countryData["world"] = trends;

        setTrendsList(countryData);
      });
  };

  const handleAccordionClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const handleTrendPress = async (trend) => {
    if (auth) {
      setIsTwitterView(true);
      await setTrend(trend, oauthToken);
    } else {
      setModalType("allowPermission");
      setModalVisible(true);
    }
  };

  return (
    <div>
      {isTwitterView ? (
        <TwitterTweets
          setIsTwitterView={setIsTwitterView}
          statuses={trend ? trend.statuses : []}
        />
      ) : (
        <CountryAccordion
          activeIndex={activeIndex}
          length={Object.keys(trendsList).length}
          trendsList={trendsList}
          handleTrendPress={handleTrendPress}
          handleAccordionClick={handleAccordionClick}
        />
      )}

      {mapLoading && (
        <>
          <Icon
            loading
            name="spinner"
            size="huge"
            color="orange"
            style={{ marginTop: 5, marginBottom: 5 }}
          />
        </>
      )}

      {Object.keys(trendsList).length === 1 && (
        <p
          style={{
            fontSize: 18,
            color: "#f2711c",
            fontFamily: "Comic Neue",
            marginTop: 5,
            marginBottom: 5,
            textAlign: "center",
          }}
        >
          Select your country to see Trending HashTags
        </p>
      )}
    </div>
  );
};

export default Details;
