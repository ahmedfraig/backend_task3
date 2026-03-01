const request = require("request");
const mapboxToken = process.env.MAPBOX_TOKEN;

const geo = (address, callback) => {
  const geoCodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${mapboxToken}`;

  request(
    {
      url: geoCodeUrl,
      json: true,
    },
    (error, response) => {
      console.log()
      if (error) {
        callback("Unable to connect to geocode service", undefined);
      } else if (response.body.message) {
        callback(response.body.message, undefined);
      } else if (response.body.features.length == 0) {
        callback("Unable to find location", undefined);
      } else {
        callback(undefined, {
          longitude: response.body.features[0].center[0],
          latitude: response.body.features[0].center[1],
        });
      }
    },
  );
};
module.exports = geo;
