import React, {useContext} from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { Icon } from "semantic-ui-react";
import { SidebarContext } from "../../context/SidebarContext";

const TwitterTweets = ({ setIsTwitterView, statuses }) => {
  //console.log("-->", statuses);
  const { isDark} = useContext(SidebarContext)
  return (
    <div style={{ width: "100%" }}>
      <p
        style={{ cursor: "pointer" }}
        className="backToCountryView"
        onClick={() => setIsTwitterView(false)}
      >
        <Icon
          name="arrow left"
          size="large"
          color="orange"
          style={{ marginTop: 5, marginBottom: 5 }}
        />
        Back to Trends Panel
      </p>
      {statuses.length === 0 && (
        <Icon
          loading
          name="spinner"
          size="huge"
          color="orange"
          style={{ marginTop: 5, marginBottom: 5 }}
        />
      )}
      {statuses.map((item, key) => {
        return (
          <TwitterTweetEmbed
            key={key}
            tweetId={item.id_str}
            options={{ theme: isDark ?"dark":"light" }}
            placeholder={
              <div className="loadingPlaceholder">
                <Icon
                  loading
                  name="spinner"
                  size="huge"
                  color="orange"
                  style={{ marginTop: 5, marginBottom: 5 }}
                />
              </div>
            }
          />
        );
      })}
    </div>
  );
};

export default TwitterTweets;
