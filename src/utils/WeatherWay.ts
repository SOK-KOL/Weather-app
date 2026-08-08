import UpArrow from "../assets/icons/upArrow.svg?react";
import UpLeftArrow from "../assets/icons/upLeftArrow.svg?react";
import UpRightArrow from "../assets/icons/upRightArrow.svg?react";
import LeftArrow from "../assets/icons/leftArrow.svg?react";
import RightArrow from "../assets/icons/rightArrow.svg?react";
import DownRightArrow from "../assets/icons/downRightArrow.svg?react";
import DownLeftArrow from "../assets/icons/downLeftArrow.svg?react";
import DownArrow from "../assets/icons/downArrow.svg?react";

// Просто описываем, что лежит в объекте: текст + иконка
interface WindItem {
  shortText: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string
}

const windWays: Record<string, WindItem> = {
  N: { shortText: "С", icon: UpArrow, text: "Северный" },
  NNE: { shortText: "С-В", icon: UpRightArrow, text:"Северо-Восточный" },
  NE: { shortText: "С-В", icon: UpRightArrow, text:"Северо-Восточный"},
  ENE: { shortText: "С-В", icon: RightArrow, text:"Северо-Восточный" },
  E: { shortText: "В", icon: RightArrow, text:"Восточный" },
  ESE: { shortText: "Ю-В", icon: DownRightArrow,text:"Юго-Восточный" },
  SE: { shortText: "Ю-В", icon: DownRightArrow ,text:"Юго-Восточный"},
  SSE: { shortText: "Ю-В", icon: DownArrow,  text:"Юго-Восточный"
   },
  S: { shortText: "Ю", icon: DownArrow , text: "Южный"},
  SSW: { shortText: "Ю-З", icon: DownLeftArrow,text: "Юго-Западный" },
  SW: { shortText: "Ю-З", icon: DownLeftArrow,text: "Юго-Западный" },
  WSW: { shortText: "Ю-З", icon: LeftArrow, text: "Юго-Западный" },
  W: { shortText: "З", icon: LeftArrow, text: "Западный" },
  WNW: { shortText: "С-З", icon: UpLeftArrow, text:"Северо-западный" },
  NW: { shortText: "С-З", icon: UpLeftArrow, text:"Северо-западный"},
  NNW: { shortText: "С-З", icon: UpArrow, text:"Северо-западный" },
};

export const getWindWays = (way: string): WindItem => {
  return windWays[way] || { text: "С", icon: UpArrow };
};
