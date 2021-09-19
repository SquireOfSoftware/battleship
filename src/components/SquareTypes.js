export const SQUARE_TYPES = {
  OBSTACLE: {
    name: "OBSTACLE",
    id: "-",
  },
  SHIP: {
    name: "SHIP",
    id: "S",
  },
  FREE: {
    name: "FREE_SQUARE",
    id: "O",
  },
  MISS: {
    name: "MISSED_SQUARE",
    id: "X",
  },
  HIT: {
    name: "HIT",
    id: "H",
  },
};

export function generateShipSquare(ship) {
  return {
    id: ship.symbol,
    name: ship.name,
    reference: ship,
  };
}
