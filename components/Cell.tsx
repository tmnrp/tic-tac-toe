import { useEffect, useState } from "react";

export const Cell = ({
  className = "",
  player,
  index,
  onClick,
  ...props
}: ICellProps) => {
  const [value, setValue] = useState<
    "cross" | "cross-hover" | "circle" | "circle-hover"
  >("cross-hover");
  useEffect(() => {
    player === "cross" &&
      value.indexOf("-hover") >= 0 &&
      setValue("cross-hover");

    player === "circle" &&
      value.indexOf("-hover") >= 0 &&
      setValue("circle-hover");
  }, [player]);

  //
  return (
    <div
      key={`${player} index-${index}`}
      className={`cell index-${index} ${value}`}
      {...props}
      onClick={(e) => {
        if (value.indexOf("-hover") >= 0) {
          setValue(player);
          onClick && onClick(e);
        }
      }}
    />
  );
};

interface ICellProps extends React.HTMLAttributes<HTMLElement> {
  player: "cross" | "circle";
  index: number;
}
