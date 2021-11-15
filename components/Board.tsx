import { useCallback, useEffect, useState } from "react";
import { Cell } from "./Cell";
import { motion, Variants } from "framer-motion";

export const Board = ({ mode = 3 }: { mode: number }) => {
  const [resetCounter, setResetCounter] = useState(0);
  const [player, setPlayer] = useState<"cross" | "circle">("cross");
  const togglePlayer = useCallback(
    () => setPlayer((player) => (player === "cross" ? "circle" : "cross")),
    []
  );

  //
  const [cells, setCells] = useState<Array<number>>();
  useEffect(
    () =>
      setCells((cells) => {
        if (!cells) cells = new Array(mode * mode);

        //
        for (let i = 0; i < cells.length; i++) {
          cells[i] = i;
        }
        return [...cells];
      }),
    [resetCounter]
  );

  //
  return (
    <motion.div>
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
          className={`shadow-md m-3 px-3 py-1.5 rounded hover:shadow-lg text-white border border-green-200 hover:bg-green-500 tracking-widest`}
          onClick={() => setResetCounter((resetCounter) => ++resetCounter)}
        >
          Reset
        </motion.button>
      </motion.div>

      {cells && (
        <motion.div
          key={resetCounter}
          variants={VStaggerContainer}
          initial="initial"
          animate="animate"
          className="grid"
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          {cells &&
            cells.map((index) => (
              <Cell
                key={index}
                index={index}
                player={player}
                onClick={() => togglePlayer()}
              />
            ))}
        </motion.div>
      )}
    </motion.div>
  );
};

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
  },
  animate: {
    y: 0,
    transition: { type: "spring", bounce: 0.2, duration: 0.6 },
  },
};
