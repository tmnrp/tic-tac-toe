import { useCallback, useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import confetti from "canvas-confetti";

const Home = () => {
  //
  const [player, setPlayer] = useState<"cross" | "circle">("cross");
  const togglePlayer = useCallback(
    () => setPlayer((player) => (player === "cross" ? "circle" : "cross")),
    []
  );
  const [playerWon, setPlayerWon] = useState<"cross" | "circle" | undefined>();
  useEffect(() => {
    if (playerWon) {
      confetti();
      for (let i = 1; i <= mode; i++) {
        for (let j = 1; j <= mode; j++) {
          const el = document.querySelector(`.tile-${i}-${j} .cell`);
          el?.classList.add(`disabled`);
          el?.classList.remove(`circle-hover`);
          el?.classList.remove(`cross-hover`);
        }
      }
    }
  }, [playerWon]);

  //
  const [resetCounter, setResetCounter] = useState<number>(0);
  const resetGame = useCallback(() => {
    setPlayerWon(undefined);
    setResetCounter((resetCounter) => ++resetCounter);
  }, []);

  // generate tiles
  const mode = 3;
  const generateTiles = useCallback((mode) => {
    const temp = [];
    for (let i = 1; i <= mode; i++) {
      for (let j = 1; j <= mode; j++) {
        temp.push(`${i}-${j}`);
      }
    }
    return temp;
  }, []);

  const tileNumbers: Array<string> = generateTiles(mode);

  //
  const updateTileType = useCallback(
    (tileNumber: string) => {
      if (!playerWon) {
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
      }
    },
    [player, playerWon]
  );

  //
  const checkWinnerHorizontally = useCallback(
    (tileNumber: string) => {
      const tile = tileNumber.split("-");
      let hasWon = true;
      for (let i = 1; i <= mode; i++) {
        const el = document.querySelector(`.tile-${tile[0]}-${i} .cell`);
        !el?.classList.contains(player) && (hasWon = false);
      }

      if (hasWon) {
        for (let i = 1; i <= mode; i++) {
          const elTile = document.querySelector(`.tile-${tile[0]}-${i}`);
          elTile?.classList.replace("border", "border-4");
          elTile?.classList.add("animate-pulse");
        }
        setPlayerWon(player);
      }
    },
    [player]
  );

  //
  const checkWinnerVertically = useCallback(
    (tileNumber: string) => {
      const tile = tileNumber.split("-");
      let hasWon = true;
      for (let i = 1; i <= mode; i++) {
        const el = document.querySelector(`.tile-${i}-${tile[1]} .cell`);
        !el?.classList.contains(player) && (hasWon = false);
      }

      if (hasWon) {
        for (let i = 1; i <= mode; i++) {
          const elTile = document.querySelector(`.tile-${i}-${tile[1]}`);
          elTile?.classList.replace("border", "border-4");
          elTile?.classList.add("animate-pulse");
        }
        setPlayerWon(player);
      }
    },
    [player]
  );

  //
  const checkWinnerDiagonallyTopLeftToBottomRight = useCallback(() => {
    let hasWon = true;
    for (let i = 1; i <= mode; i++) {
      const el = document.querySelector(`.tile-${i}-${i} .cell`);
      !el?.classList.contains(player) && (hasWon = false);
    }

    if (hasWon) {
      for (let i = 1; i <= mode; i++) {
        const elTile = document.querySelector(`.tile-${i}-${i}`);
        elTile?.classList.replace("border", "border-4");
        elTile?.classList.add("animate-pulse");
      }
      setPlayerWon(player);
    }
  }, [player]);

  //
  const checkWinnerDiagonallyBottomLeftToTopRight = useCallback(() => {
    let x = mode;
    let y = 1;
    let hasWon = true;
    for (let i = 1; i <= mode; i++) {
      const el = document.querySelector(`.tile-${x--}-${y++} .cell`);
      !el?.classList.contains(player) && (hasWon = false);
    }

    if (hasWon) {
      let x = mode;
      let y = 1;
      for (let i = 1; i <= mode; i++) {
        const elTile = document.querySelector(`.tile-${x--}-${y++}`);
        elTile?.classList.replace("border", "border-4");
        elTile?.classList.add("animate-pulse");
      }
      setPlayerWon(player);
    }
  }, [player]);

  //
  const markSelected = useCallback(
    (tileNumber: string) => {
      if (!playerWon) {
        const el = document.querySelector(`.tile-${tileNumber} .cell`);
        const isSelected =
          el?.classList.contains("cross") || el?.classList.contains("circle");

        //
        if (!isSelected) {
          el?.classList.add(player);
          el?.classList.remove(`${player}-hover`);
          checkWinnerHorizontally(tileNumber);
          checkWinnerVertically(tileNumber);
          checkWinnerDiagonallyTopLeftToBottomRight();
          checkWinnerDiagonallyBottomLeftToTopRight();
          togglePlayer();
        }
      }
    },
    [
      player,
      playerWon,
      togglePlayer,
      checkWinnerHorizontally,
      checkWinnerVertically,
      checkWinnerDiagonallyTopLeftToBottomRight,
      checkWinnerDiagonallyBottomLeftToTopRight,
    ]
  );

  //
  return (
    <div className="flex items-center justify-center h-screen text-white bg-gradient-to-br from-blue-700 to-green-600">
      <div className="flex flex-col items-center justify-center">
        {playerWon && (
          <div className="text-center uppercase">
            <div className="text-3xl">Congratulations</div>
            <div className="text-5xl">{playerWon}</div>
            <div className="text-3xl">WON !!!</div>
          </div>
        )}
        <motion.div
          className={`flex justify-between items-center`}
          variants={VStaggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={VStaggerItems} className="flex tracking-widest">
            <p className="mr-2">Current player :</p>
            <p className="font-semibold uppercase">{player}</p>
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
