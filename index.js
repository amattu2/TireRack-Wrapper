// Files
const jsdom = require("jsdom");
const request = require('request-promise');
const { JSDOM } = jsdom;

/**
 * Fetch all tire listings by tire size
 *
 * @param {float} width
 * @param {float} ratio
 * @param {int} diameter
 * @param {number} search zip code
 * @return {array} array of tires
 * @throws None
 * @author Alec M. <https://amattu.com>
 * @date 2021-08-15
 */
async function listings(width, ratio, diameter, zip = 20001) {
  // Variables
  const vc = new jsdom.VirtualConsole();
  const response = await request({
    url: `https://www.tirerack.com/tires/TireSearchResults.jsp?width=${width}/&ratio=${ratio}&diameter=${diameter}&zip-code=${zip}`,
    method: 'GET',
    followAllRedirects: true,
    jar: true,
    headers: {
      "Accept": "application/json, text/plain, */*",
      "User-Agent": "axios/0.18.0"
    },
    timeout: 3000
  });
  const dom = new JSDOM(response, {
    runScripts: "dangerously",
    vc
  });
  let tires = [];

  // Check Tires
  if (!dom.window || !dom.window.tireList)
    return tires;
  if (typeof(dom.window.tireList) !== "object")
    return tires;
  if (dom.window.tireList.length <= 0)
    return tires;

  // Parse tires
  dom.window.tireList.forEach((t) => {
    // Variables
    let tire = {};

    // Check Attributes
    if (t.image || t.altImage)
      tire.image = t.image || t.altImage;
    if (t.loadRating)
      tire.load_rating = t.loadRating;
    if (t.price || t.priceFormatted)
      tire.price = t.price || t.priceFormatted;
    if (t.tireMake)
      tire.make = t.tireMake;
    if (t.tireModel)
      tire.model = t.tireModel;
    if (t.subPerfDesc)
      tire.description = t.subPerfDesc;
    if (t.mph)
      tire.max_speed_mph = t.mph;
    if (t.kph)
      tire.max_speed_kpg = t.kph;
    if (t.loadRating)
      tire.max_load = t.loadRating;
    if (t.reviewerAvgRating)
      tire.average_rating = `${t.reviewerAvgRating}/10`;
    if (t.utqgTraction && t.utqgTreadwear && t.utqgTemperature)
      tire.UTQG = `${t.utqgTreadwear} ${t.utqgTraction} ${t.utqgTemperature}`;
    if (t.serviceDesc)
      tire.service_description = t.serviceDesc;
    if (t.sidewall)
      tire.sidewall = t.sidewall;

    // Append
    tires.push(tire);
  });

  // Return
  return tires;
}

module.exports.listings = listings;
