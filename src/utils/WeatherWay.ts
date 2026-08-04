const windWays: { [key: string]: string } = {
  N: "С",
  NNE: "СВ",
  NE: "СВ",
  ENE: "СВ",
  E: "В",
  ESE: "ЮВ",
  SE: "ЮВ",
  SSE: "ЮВ",
  S: "Ю",
  SSW: "ЮЗ",
  SW: "ЮЗ",
  WSW: "ЮЗ",
  W: "З",
  WNW: "СЗ",
  NW: "СЗ",
  NNW: "СЗ",
};

export const getWindWays = (way: string): string => {
  return windWays[way] || "С";
};
