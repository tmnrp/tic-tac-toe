import { useCallback, useEffect, useState } from "react";

export const Board = ({ mode = 3 }: { mode: number }) => {
  const [player, setPlayer] = useState<"cross" | "circle" | null>(null);
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
    []
  );

  //
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
      {cells.map((v) => (
        <div
          key={v}
          className={`cell ${player}`}
          onClick={() => {
            togglePlayer();
          }}
        />
      ))}
    </div>
  );
};
