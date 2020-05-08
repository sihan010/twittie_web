import React from "react";
import ReactCountryFlag from "react-country-flag";
import { Icon, Accordion, Button, Label } from "semantic-ui-react";
import { postalToCountryName } from "../../Helper/Helper";
const world = require("../../static/world.png");
const CountryAccordion = ({
  activeIndex,
  length,
  trendsList,
  handleTrendPress,
  handleAccordionClick,
}) => {
  return (
    length > 0 && (
      <Accordion>
        {Object.keys(trendsList).map((countryCode, key) => (
          <div key={key}>
            <Accordion.Title
              active={activeIndex === key}
              index={key}
              onClick={handleAccordionClick}
            >
              {countryCode === "world" ? (
                <img
                  src={world}
                  alt="WorldWide"
                  style={{
                    width: "4em",
                    height: "4em",
                  }}
                />
              ) : (
                <ReactCountryFlag
                  countryCode={countryCode}
                  svg
                  style={{
                    width: "4em",
                    height: "4em",
                  }}
                  title={countryCode}
                />
              )}

              <Icon name="dropdown" color="orange" />
              <p
                style={{
                  fontSize: 20,
                  color: "#f2711c",
                  fontFamily: "Comic Neue",
                  display: "inline",
                }}
              >
                {postalToCountryName(countryCode)}
              </p>
            </Accordion.Title>

            <Accordion.Content active={activeIndex === key}>
              {trendsList[countryCode].map((item, i) => {
                return (
                  <Button
                    key={`${key}+${i}`}
                    as="div"
                    labelPosition="right"
                    style={{ margin: 1 }}
                    onClick={() => handleTrendPress(item)}
                  >
                    <Button color={item.tweet_volume ? "green" : "grey"}>
                      <Icon name="heart" color="red" />
                      {item.tweet_volume ? item.tweet_volume : <Icon name="exclamation" />}
                    </Button>
                    <Label as="a" basic color="red" pointing="left">
                      {item.name}
                    </Label>
                  </Button>
                );
              })}
            </Accordion.Content>
          </div>
        ))}
      </Accordion>
    )
  );
};

export default CountryAccordion;
