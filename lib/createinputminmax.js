// The min, max, and median values for each question that will be asked in the app.
// Ex: "andSnGe1Le" and "andSnGe1Ge" both have the same info (from "andSnGe1") but they are
// for two different questions. Also, at the moment the [2] value is the same, but in the future
// this entry will probably be the start value for the range slider rather than the median value. 
function createInputMinMax(minMax) {

  const inputMinMax = {
    hMTmxAvLe: [minMax["mTmxAv"][0], minMax["mTmxAv"][1], minMax["mTmxAv"][2]],
    lMTmnAvGe: [minMax["mTmnAv"][0], minMax["mTmnAv"][1], minMax["mTmnAv"][2]],
    andSnGe1Le: [minMax["andSnGe1"][0], minMax["andSnGe1"][1], minMax["andSnGe1"][2]],
    andSnGe1Ge: [minMax["andSnGe1"][0], minMax["andSnGe1"][1], minMax["andSnGe1"][2]],
    andSnCGe1Le: [minMax["andSnCGe1"][0], minMax["andSnCGe1"][1], minMax["andSnCGe1"][2]],
    andSnCGe1Ge: [minMax["andSnCGe1"][0], minMax["andSnCGe1"][1], minMax["andSnCGe1"][2]],
    andPrGe5TiLe: [minMax["andPrGe5Ti"][0], minMax["andPrGe5Ti"][1], minMax["andPrGe5Ti"][2]],
    andPrGe5TiGe: [minMax["andPrGe5Ti"][0], minMax["andPrGe5Ti"][1], minMax["andPrGe5Ti"][2]],
    andTmnLe32Le: [minMax["andTmnLe32"][0], minMax["andTmnLe32"][1], minMax["andTmnLe32"][2]],
    andTmnLe32Ge: [minMax["andTmnLe32"][0], minMax["andTmnLe32"][1], minMax["andTmnLe32"][2]],
    andTmxGe60Le: [minMax["andTmxGe60"][0], minMax["andTmxGe60"][1], minMax["andTmxGe60"][2]],
    andTmxGe60Ge: [minMax["andTmxGe60"][0], minMax["andTmxGe60"][1], minMax["andTmxGe60"][2]],
    andTmxGe80Le: [minMax["andTmxGe80"][0], minMax["andTmxGe80"][1], minMax["andTmxGe80"][2]],
    andTmxGe80Ge: [minMax["andTmxGe80"][0], minMax["andTmxGe80"][1], minMax["andTmxGe80"][2]]
  };

  return inputMinMax;
};

module.exports = createInputMinMax;
