import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../styles/game.css";
import { useNavigate } from "react-router-dom";

const Game = ({ mode }) => {
  const navigate = useNavigate();

  // Retrieve game settings from Redux store
  const size = Number(useSelector((state) => state.size));
  const winCondition = Number(useSelector((state) => state.winingCondition));

  const [squares, setSquares] = useState(Array(size * size).fill(null));

  const [xScore, setXScore] = useState(0);
  const [yScore, setYScore] = useState(0);
  const [isXNext, setIsXNext] = useState(Math.random() < 0.5);
  const [winner, setWinner] = useState(null);
  const [winSquares, setWinSquares] = useState(Array(winCondition).fill(null));

  const goBack = () => {
    navigate(-1);
  };

  const handleNewGame = () => {
    if (winner == null && !calculateMapUnfilled(squares)) {
      if (isXNext) {
        setYScore(yScore + 1);
      } else {
        setXScore(xScore + 1);
      }
    }

    setSquares(Array(size * size).fill(null));
    setWinSquares(Array(winCondition).fill(null));
    setWinner(null);
    setIsXNext(!isXNext);
  };

  const handleWinner = () => {
    if (isXNext) {
      setWinner("X");
      setXScore(xScore + 1);
    } else {
      setWinner("O");
      setYScore(yScore + 1);
    }
  };

  const handleDraw = () => {
    setWinner("Draw");
  };

  const handleClick = (i) => {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares, size, winCondition) || newSquares[i]) {
      return;
    }
    newSquares[i] = isXNext ? "X" : "O";
    setSquares(newSquares);

    if (calculateWinner(newSquares, size, winCondition)) {
      handleWinner();
    } else if (calculateDraw(newSquares)) {
      handleDraw();
    } else {
      setIsXNext(!isXNext);
    }
  };

  const calculateMapUnfilled = (squares) => {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] != null) {
        return false;
      }
    }
    return true;
  };

  const calculateDraw = (squares) => {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] == null) {
        return false;
      }
    }
    return true;
  };

  const calculateWinner = (squares, size, winCondition) => {
    // Find all possible group of win squares
    const lines = [];

    // Rows
    for (let i = 0; i < size; i++) {
      for (let j = 0; j <= size - winCondition; j++) {
        const line = [];
        for (let k = 0; k < winCondition; k++) {
          line.push(i * size + j + k);
        }
        lines.push(line);
      }
    }

    // Columns
    for (let i = 0; i < size; i++) {
      for (let j = 0; j <= size - winCondition; j++) {
        const line = [];
        for (let k = 0; k < winCondition; k++) {
          line.push((j + k) * size + i);
        }
        lines.push(line);
      }
    }

    // Diagonals
    for (let i = 0; i <= size - winCondition; i++) {
      for (let j = 0; j <= size - winCondition; j++) {
        const line1 = [];
        const line2 = [];
        for (let k = 0; k < winCondition; k++) {
          line1.push((i + k) * size + (j + k));
          line2.push((i + k) * size + (j + winCondition - 1 - k));
        }
        lines.push(line1);
        lines.push(line2);
      }
    }

    let allWinSquares = [];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, ...rest] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        rest.every((index) => squares[a] === squares[index])
      ) {
        // Merge lines[i] into allWinSquares and remove duplicates
        allWinSquares = [...new Set([...allWinSquares, ...lines[i]])];
      }
    }

    if (allWinSquares.length > 0) {
      setWinSquares(allWinSquares);
      return true;
    }

    return null;
  };

  // With out alpha beta pruning in can not work at map size greater than 5x5 with win condition is 4
  const minimax = (
    squares,
    depth,
    isMaximizing,
    size,
    winCondition,
    alpha = -Infinity,
    beta = Infinity
  ) => {
    const winner = calculateWinner(squares, size, winCondition);
    if (winner === "O") return 10 - depth;
    if (winner === "X") return depth - 10;
    if (squares.every((square) => square !== null)) return 0;

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
          squares[i] = "O";
          let score = minimax(
            squares,
            depth + 1,
            false,
            size,
            winCondition,
            alpha,
            beta
          );
          squares[i] = null;
          maxEval = Math.max(maxEval, score);
          alpha = Math.max(alpha, score);
          if (beta <= alpha) {
            break; // Beta cut-off
          }
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
          squares[i] = "X";
          let score = minimax(
            squares,
            depth + 1,
            true,
            size,
            winCondition,
            alpha,
            beta
          );
          squares[i] = null;
          minEval = Math.min(minEval, score);
          beta = Math.min(beta, score);
          if (beta <= alpha) {
            break; // Alpha cut-off
          }
        }
      }
      return minEval;
    }
  };

  const findRandomMove = (squares) => {
    const emptySquares = squares.map((square, index) => (square === null ? index : null)).filter(index => index !== null);
    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    return emptySquares[randomIndex];
  };

  const findBestMove = (squares, size, winCondition) => {
    let bestVal = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = "O";
        let moveVal = minimax(
          squares,
          0,
          false,
          -Infinity,
          Infinity,
          size,
          winCondition
        );
        squares[i] = null;

        if (moveVal > bestVal) {
          bestMove = i;
          bestVal = moveVal;
        }
      }
    }
    return bestMove;
  };

  useEffect(() => {
    if (mode === 2 && isXNext === false) {
      const newSquares = squares.slice();

      if (calculateMapUnfilled(newSquares)) {
        const randomMove = findRandomMove(newSquares);
        newSquares[randomMove] = 'O';
        setSquares(newSquares);
      } else {
        const bestMove = findBestMove(newSquares, size, winCondition);
        newSquares[bestMove] = "O";
        setSquares(newSquares);
      }

      if (calculateWinner(newSquares, size, winCondition)) {
        handleWinner();
      } else if (calculateDraw(newSquares)) {
        handleDraw();
      } else {
        setIsXNext(true);
      }
    }
  }, [isXNext]);

  return (
    <div className="Container Game">
      <div className="Header">
        <button className="Button Medium Navy" onClick={() => goBack()}>
          Back
        </button>
        <button className="Button Medium Green" onClick={() => handleNewGame()}>
          New Game
        </button>
      </div>

      <div className="Body">
        <div className="Info">
          <div className="Player X">
            <div>
              <p
                className={`Button Small ${
                  isXNext && (winner == null || winner === "X")
                    ? "Green"
                    : "Gray"
                }`}
              >
                X
              </p>
              <p className={`${winner === "X" && "Green"}`}>Score: {xScore}</p>
            </div>
            <div>
              <p
                className={`${isXNext && winner == null ? "Green" : "Hidden"}`}
              >
                Your turn
              </p>
            </div>
          </div>

          <div
            className={`Status ${
              winner === "X" || winner === "O" ? "Win" : "Draw"
            } ${winner === "X" && "Green"} ${winner === "O" && "Orange"} ${
              winner !== "X" && winner !== "O" && "Gray"
            } ${winner == null && "Hidden"}`}
          >
            {winner === "X" && <p>Win</p>}
            {winner === "O" && <p>Win</p>}
            {winner === "Draw" && <p>Draw</p>}
            {winner == null && <p>Draw</p>}
          </div>

          <div className="Player O">
            <div>
              <p
                className={`${
                  !isXNext && winner == null ? "Orange" : "Hidden"
                }`}
              >
                Your turn
              </p>
            </div>

            <div>
              <p
                className={`Button Small ${
                  !isXNext && (winner == null || winner === "O")
                    ? "Orange"
                    : "Gray"
                }`}
              >
                O
              </p>
              <p className={`${winner === "O" && "Orange"}`}>Score: {yScore}</p>
            </div>
          </div>
        </div>

        <div className="Board">
          {Array.from({ length: size }, (_, rowIndex) => (
            <div className="Row" key={rowIndex}>
              {squares
                .slice(rowIndex * size, (rowIndex + 1) * size)
                .map((square, i) => (
                  <div
                    className={`Square ${
                      winner === "X" &&
                      winSquares.includes(rowIndex * size + i) &&
                      "Green"
                    } ${
                      winner === "O" &&
                      winSquares.includes(rowIndex * size + i) &&
                      "Orange"
                    }`}
                    key={rowIndex * size + i}
                    onClick={() => {
                      handleClick(rowIndex * size + i);
                    }}
                  >
                    {square === "X" && <p className="Green">X</p>}
                    {square === "O" && <p className="Orange">O</p>}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
