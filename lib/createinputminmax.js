// The min, max, and default (starting) values for each question that will be asked in the app.
// Ex: "andSnGe1Le" and "andSnGe1Ge" both have the same info (from "andSnGe1") but they are
// for two different questions and have two different defaults. The default values here are just a
// set of values chosen by me so that the app will return a small and pleasant group of results if
// someone clicks on the search button in the app right away. Previously I determined the defaults
// differently. That commented out code is at the bottom of the page in case I want to go back to the
// old method.


function createInputMinMax(minMax) {

  const inputMinMax = {
    hMTmxAvLe: [minMax["mTmxAv"][0], minMax["mTmxAv"][1], 85],
    lMTmnAvGe: [minMax["mTmnAv"][0], minMax["mTmnAv"][1], 32],
    andSnGe1Le: [minMax["andSnGe1"][0], minMax["andSnGe1"][1], 12],
    andSnGe1Ge: [minMax["andSnGe1"][0], minMax["andSnGe1"][1], 0],
    andSnCGe1Le: [minMax["andSnCGe1"][0], minMax["andSnCGe1"][1], 30],
    andSnCGe1Ge: [minMax["andSnCGe1"][0], minMax["andSnCGe1"][1], 0],
    andPrGe5TiLe: [minMax["andPrGe5Ti"][0], minMax["andPrGe5Ti"][1], 40],
    andPrGe5TiGe: [minMax["andPrGe5Ti"][0], minMax["andPrGe5Ti"][1], 5],
    andTmnLe32Le: [minMax["andTmnLe32"][0], minMax["andTmnLe32"][1], 60],
    andTmnLe32Ge: [minMax["andTmnLe32"][0], minMax["andTmnLe32"][1], 0],
    andTmxGe60Le: [minMax["andTmxGe60"][0], minMax["andTmxGe60"][1], 365],
    andTmxGe60Ge: [minMax["andTmxGe60"][0], minMax["andTmxGe60"][1], 198],
    andTmxGe80Le: [minMax["andTmxGe80"][0], minMax["andTmxGe80"][1], 182],
    andTmxGe80Ge: [minMax["andTmxGe80"][0], minMax["andTmxGe80"][1], 34]
  };

  return inputMinMax;
};

module.exports = createInputMinMax;


// Old way of computing default values. It worked as follows: It is the midpoint if the weather value
// only has one question associated with it, and if it has two questions then the "at least" question
// gets the 1/3 value and the "at most" question gets the 2/3 value.

// const inputMinMax = {
//   hMTmxAvLe: [minMax["mTmxAv"][0], minMax["mTmxAv"][1], minMax["mTmxAv"][2]],
//   lMTmnAvGe: [minMax["mTmnAv"][0], minMax["mTmnAv"][1], minMax["mTmnAv"][2]],
//   andSnGe1Le: [minMax["andSnGe1"][0], minMax["andSnGe1"][1], minMax["andSnGe1"][4]],
//   andSnGe1Ge: [minMax["andSnGe1"][0], minMax["andSnGe1"][1], minMax["andSnGe1"][3]],
//   andSnCGe1Le: [minMax["andSnCGe1"][0], minMax["andSnCGe1"][1], minMax["andSnCGe1"][4]],
//   andSnCGe1Ge: [minMax["andSnCGe1"][0], minMax["andSnCGe1"][1], minMax["andSnCGe1"][3]],
//   andPrGe5TiLe: [minMax["andPrGe5Ti"][0], minMax["andPrGe5Ti"][1], minMax["andPrGe5Ti"][4]],
//   andPrGe5TiGe: [minMax["andPrGe5Ti"][0], minMax["andPrGe5Ti"][1], minMax["andPrGe5Ti"][3]],
//   andTmnLe32Le: [minMax["andTmnLe32"][0], minMax["andTmnLe32"][1], minMax["andTmnLe32"][4]],
//   andTmnLe32Ge: [minMax["andTmnLe32"][0], minMax["andTmnLe32"][1], minMax["andTmnLe32"][3]],
//   andTmxGe60Le: [minMax["andTmxGe60"][0], minMax["andTmxGe60"][1], minMax["andTmxGe60"][4]],
//   andTmxGe60Ge: [minMax["andTmxGe60"][0], minMax["andTmxGe60"][1], minMax["andTmxGe60"][3]],
//   andTmxGe80Le: [minMax["andTmxGe80"][0], minMax["andTmxGe80"][1], minMax["andTmxGe80"][4]],
//   andTmxGe80Ge: [minMax["andTmxGe80"][0], minMax["andTmxGe80"][1], minMax["andTmxGe80"][3]]
// };
