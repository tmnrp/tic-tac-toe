import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { VStaggerItems } from "./Board";

// export const Cell = ({}: ICellProps) => {
//   return (
//     <motion.div
//       variants={VStaggerItems}
//       className="cell h-20 w-20 border border-green-300"
//     />
//   );
// };

export const Cell = ({ player, index, onClick, ...props }: ICellProps) => {
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
    <motion.div
      variants={VStaggerItems}
      key={`${player} index-${index}`}
      className={`cell index-${index} ${value}`}
      {...props}
      onClick={() => {
        if (value.indexOf("-hover") >= 0) {
          setValue(player);
          onClick && onClick();
        }
      }}
    />
  );
};

interface ICellProps {
  onClick: () => void;
  player: "cross" | "circle";
  index: number;
}
