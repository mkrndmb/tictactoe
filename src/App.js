import { useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const [winner, setWinner] = useState("");
  const value = ["X", "O"];
  const reff = useRef([]);
  const winning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  const handleClick = (e) => {
    if (e.target.innerText === "" && !winner) {
      e.target.innerText = value[0];
      let result = isWin(value[0]);
      if (!result) {
        setTimeout(() => {
          botTurn();
          isWin(value[1]);
        }, 500);
      }
    }
  };
  function isWin(value) {
    let contained = reff.current
      .filter((ele) => ele.innerText === value)
      .map((ele) => Number(ele.id));
    for (const w of winning) {
      let count = 0;
      contained.forEach((x) => {
        if (w.includes(x)) {
          count++;
        }
      });
      if (count === 3) {
        setWinner(value);
        return "won";
      }
    }
  }
  function botTurn() {
    let rem = reff.current
      .filter((ele) => ele.innerText === "")
      .map((ele) => ele.id);
    let index = Math.floor(Math.random() * rem.length); //random(rem.length)
    if (rem.length) reff.current[Number(rem[index])].innerText = value[1];
  }
  return (
    <div className="App">
      <div className="game" onClick={handleClick}>
        {[...Array(9)].map((_, i) => {
          return (
            <div
              key={i}
              ref={(el) => (reff.current[i] = el)}
              id={i}
              className="box"
            ></div>
          );
        })}
      </div>
      {winner && <h1>{winner} HAS WON !!!</h1>}
    </div>
  );
}
