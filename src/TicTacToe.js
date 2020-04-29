import React, { useState } from "react";
import "./TicTacToe.css";

const scoreX = [];
const scoreO = [];
const boardSize = 4;
const TicTacToe = () => {
  return (
    <div className="tic-tac-toe">
      <Board boardSize={boardSize} />
    </div>
  );
};

const Board = (props) => {
  return <div className="board">{processTiles(props.boardSize)}</div>;
};

const processTiles = (boardSize) => {
  const rows = [];
  for (let i = 0; i < boardSize; i++) {
    const row = [];
    for (let j = 0; j < boardSize; j++) {
      row.push(<Tile key={`${i}${j}`} id={`${i}${j}`} />);
    }
    rows.push(
      <div key={i} className="row">
        {row}
      </div>
    );
  }
  return rows;
};

const Tile = (props) => {
  const [value, setValue] = useState(null);
  return (
    <label className="tile" onClick={(e) => onTileClick(e, setValue, props.id)}>
      {value}
    </label>
  );
};

let user = "X";
const onTileClick = (e, setValue, id) => {
  if (e.currentTarget.textContent === "") {
    setValue(user);
    if (user === "X") {
      scoreX.push(id);
      scoreX.sort();
      checkWinner(scoreX);
      user = "O";
    } else {
      scoreO.push(id);
      scoreO.sort();
      checkWinner(scoreO);
      user = "X";
    }
  }
};

const checkWinner = (score) => {
  checkHorizontal(score);
};

const checkHorizontal = (score) => {
  for (let i = 0; i < boardSize; i++) {
    for (let i = 0; i < boardSize; i++) {}
  }
};

export default TicTacToe;
