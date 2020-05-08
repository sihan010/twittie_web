import React, { createContext, useState } from "react";

export const TrendsContext = createContext();

const TrendsContextProvider = (props) => {
  const [trendsList, setTrendsList] = useState([]);
  const [trend, setTrend] = useState(null);

  const setTrendsListHelper = (countryTrends) => {
    let countryCode = Object.keys(countryTrends)[0];
    let previous = trendsList;
    previous[countryCode] = countryTrends[countryCode];
    //console.log(previous);
    setTrendsList({ ...previous });
  };

  const setTrendData = async (t, token) => {
    setTrend(null)
    t.url = t.url.replace("http", "https");
    let responseRaw = await fetch(`${process.env.REACT_APP_API_BASE}/user/getTweets`, {
      method: "POST",
      body: JSON.stringify({
        query: t.query,
        oauth_token: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let responseJSON = await responseRaw.json();
    //console.log(responseJSON);
    setTrend(responseJSON);
  };

  return (
    <TrendsContext.Provider
      value={{
        trendsList,
        trend,
        setTrendsList: setTrendsListHelper,
        setTrend: setTrendData,
      }}
    >
      {props.children}
    </TrendsContext.Provider>
  );
};

export default TrendsContextProvider;
