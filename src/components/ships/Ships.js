import carrerImg from '../../assets/imgs/carrier.png';
import battleshipImg from '../../assets/imgs/battleship.png';
import cruiserImg from '../../assets/imgs/cruiser.png';
import submarineImg from '../../assets/imgs/submarine.png';
import destroyerImg from '../../assets/imgs/destroyer.png';

const Ships = {
    Carrier: {
        name: "Carrier",
        size: 5,
        symbol: "A",
        img: carrerImg
    },
    Battleship: {
        name: "Battleship",
        size: 4,
        symbol: "B",
        img: battleshipImg
    },
    Cruiser: {
        name: "Cruiser",
        size: 3,
        symbol: "C",
        img: cruiserImg
    },
    Submarine: {
        name: "Submarine",
        size: 3,
        symbol: "S",
        img: submarineImg
    },
    Destroyer: {
        name: "Destroyer",
        size: 2,
        symbol: "D",
        img: destroyerImg
    }
}

export default Ships;