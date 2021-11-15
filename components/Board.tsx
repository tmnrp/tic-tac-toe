import { useCallback, useEffect, useState } from "react";
import { Cell } from "./Cell";

export const Board = ({ mode = 3 }: { mode: number }) => {
  const [resetCounter, setResetCounter] = useState(0);
  const [player, setPlayer] = useState<"cross" | "circle">("cross");
  const togglePlayer = useCallback(
    () => setPlayer((player) => (player === "cross" ? "circle" : "cross")),
    []
  );

  //
  const [cells, setCells] = useState(new Array(mode * mode));
  useEffect(
    () =>
      setCells((cells) => {
        for (let i = 0; i < cells.length; i++) {
          cells[i] = i;
        }
        return [...cells];
      }),
    [resetCounter]
  );

  //
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <div>Current player : {player}</div>
        <button
          onClick={() => setResetCounter((resetCounter) => ++resetCounter)}
          style={{ padding: 5, cursor: "pointer" }}
        >
          Reset
        </button>
      </div>
      <div
        key={resetCounter}
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}
      >
        {cells.map((index) => (
          <Cell
            key={index}
            index={index}
            player={player}
            onClick={() => togglePlayer()}
          />
        ))}
      </div>
    </div>
  );
};
