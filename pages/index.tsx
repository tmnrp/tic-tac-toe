import { useCallback, useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

const Home = () => {
  //
  const [resetCounter, setResetCounter] = useState<number>(0);
  const resetGame = useCallback(
    () => setResetCounter((resetCounter) => ++resetCounter),
    []
  );

  // generate tiles
  const mode = 3;
  const [tileNumbers, setTileNumbers] = useState(
    Array.from(Array(mode * mode).keys())
  );
  useEffect(() => {
    resetCounter > 0 &&
      setTileNumbers([...Array.from(Array(mode * mode).keys())]);
  }, [resetCounter]);

  //
  const [player, setPlayer] = useState<"cross" | "circle">("cross");
  const togglePlayer = useCallback(
    () => setPlayer((player) => (player === "cross" ? "circle" : "cross")),
    []
  );

  //
  const checkWinnerHorizontally = (tileNumber: number) => {
    let temp = tileNumber + 1;
    while (temp % mode !== 0) {
      temp = temp + 1;
    }

    let hasWon = true;
    for (let i = temp - mode; i < temp; i++) {
      const el = document.querySelector(`.tile-${i} .cell`);
      !el?.classList.contains(player) && (hasWon = false);
    }

    if (hasWon) {
      for (let i = temp - mode; i < temp; i++) {
        const elTile = document.querySelector(`.tile-${i}`);
        elTile?.classList.replace("border", "border-4");
        elTile?.classList.add("animate-pulse");
      }

      //
      //alert(`Player ${player} has won !!!`);
      //resetGame();
    }
  };

  //
  const checkWinnerVertically = (tileNumber: number) => {
    let temp = tileNumber + 1;
    while (temp % mode !== 0) {
      temp = temp + 1;
    }
  };

  //
  const checkWinnerDiagonally = (tileNumber: number) => {};

  //
  const markSelected = useCallback(
    (tileNumber: number) => {
      const el = document.querySelector(`.tile-${tileNumber} .cell`);
      const isSelected =
        el?.classList.contains("cross") || el?.classList.contains("circle");

      //
      if (!isSelected) {
        el?.classList.add(player);
        el?.classList.remove(`${player}-hover`);
        togglePlayer();
        checkWinnerHorizontally(tileNumber);
      }
    },
    [player]
  );

  //
  const updateTileType = useCallback(
    (tileNumber: number) => {
      const el = document.querySelector(`.tile-${tileNumber} .cell`);
      const isSelected =
        el?.classList.contains("cross") || el?.classList.contains("circle");

      //
      if (!isSelected) {
        el?.classList.add(`${player}-hover`);
        el?.classList.remove(
          player === "cross" ? "circle-hover" : "cross-hover"
        );
      }
    },
    [player]
  );

  //
  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-700 to-green-600 text-white">
      <div className="flex flex-col justify-center items-center">
        <motion.div
          className={`flex justify-between items-center`}
          variants={VStaggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={VStaggerItems} className="flex tracking-widest">
            <p className="mr-2">Current player :</p>
            <p className="uppercase font-semibold">{player}</p>
          </motion.div>
          <motion.button
            variants={VStaggerItems}
            className={`shadow-md m-3 px-3 py-1.5 rounded hover:shadow-lg text-white border border-green-300 hover:bg-green-500 tracking-widest`}
            onClick={resetGame}
          >
            Reset
          </motion.button>
        </motion.div>

        <motion.div
          key={`key-${resetCounter}`}
          className={`board grid grid-cols-3 gap-2`}
          variants={VStaggerContainer}
          initial="initial"
          animate="animate"
        >
          {tileNumbers?.map((tileNumber) => (
            <motion.div
              key={`key-${tileNumber}`}
              className={`tile tile-${tileNumber} w-20 h-20 flex justify-center items-center border border-green-300 rounded-sm relative`}
              variants={VStaggerItems}
            >
              <div
                className={`cell h-full w-full flex justify-center items-center cursor-pointer`}
                onClick={() => markSelected(tileNumber)}
                onMouseOver={() => updateTileType(tileNumber)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;

//
const VStaggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const VStaggerItems: Variants = {
  initial: {
    y: "-100vh",
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", bounce: 0.2, duration: 0.6 },
  },
};
