// import * as carrierImg from "../assets/imgs/carrier.png";
// import * as battleshipImg from "../assets/imgs/battleship.png";
// import * as cruiserImg from "../assets/imgs/cruiser.png";
// import * as submarineImg from "../assets/imgs/submarine.png";
// import * as destroyerImg from "../assets/imgs/destroyer.png";

const SHIP_TYPES = {
  CARRIER: "CARRIER",
  BATTLESHIP: "BATTLESHIP",
  CRUISER: "CRUISER",
  SUBAMARINE: "SUBAMARINE",
  DESTROYER: "DESTROYER",
};

const Ships = {
  Carrier: {
    name: "Carrier",
    type: SHIP_TYPES.CARRIER,
    size: 5,
    symbol: "A",
    // img: carrierImg,
  },
  Battleship: {
    name: "Battleship",
    type: SHIP_TYPES.BATTLESHIP,
    size: 4,
    symbol: "B",
    // img: battleshipImg,
  },
  Cruiser: {
    name: "Cruiser",
    type: SHIP_TYPES.CRUISER,
    size: 3,
    symbol: "C",
    // img: cruiserImg,
  },
  Submarine: {
    name: "Submarine",
    type: SHIP_TYPES.SUBAMARINE,
    size: 3,
    symbol: "S",
    // img: submarineImg,
  },
  Destroyer: {
    name: "Destroyer",
    type: SHIP_TYPES.DESTROYER,
    size: 2,
    symbol: "D",
    // img: destroyerImg,
  },
};

export { Ships, SHIP_TYPES };
