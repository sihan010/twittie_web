import available from "../static/available.json";

const postalToCountryName = (postal) => {
  if(postal==="world") return "World Wide"
  for (let i = 0; i < available.length; i++) {
    if (available[i].countryCode === postal) return available[i].country;
  }
};

export { postalToCountryName };
