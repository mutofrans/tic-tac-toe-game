import React from "react";
import Board from "./Board";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        locations: Array(2).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
      movesOrderAscending: true,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        locations: calculateLocation(i)
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  restart() {
    this.setState({
      history: [{
        squares: Array(9).fill(null),
        locations: Array(2).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
      movesOrderAscending: true,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const winnersLocation = returnWinnersLocation(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to move # ${move} at (${step.locations})` :
        `Go to game start`;

      return (
        <li key={move}>
          <button
            onClick={() => this.jumpTo(move)}>
            {move === this.state.stepNumber ? <strong>{desc}</strong> : desc}
          </button>
        </li>
      );
    })

    let status;
    if (winner) {
      status = `Winner is ${winner}!`;
    } else if (this.state.stepNumber === 9)
      status = `It's a draw!`;
    else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            highlightedSquareLocations={winnersLocation}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div className="game-options-wrapper">
            <div>
              <button
                onClick={() => this.setState({ movesOrderAscending: !this.state.movesOrderAscending })}>
                Toggle move order
              </button>
            </div>
            <div>
              <button onClick={() => this.restart()}>
                Restart
              </button>
            </div>
          </div>
          <ol>{this.state.movesOrderAscending ? moves : moves.reverse()}</ol>
        </div>
      </div>
    );
  }
}

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateLocation(i) {
  const locations = [
    [1, 1],
    [2, 1],
    [3, 1],
    [1, 2],
    [2, 2],
    [3, 2],
    [1, 3],
    [2, 3],
    [3, 3],
  ]

  return locations[i];
}

function returnWinnersLocation(squares) {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }

  return null;
}

function calculateWinner(squares) {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}