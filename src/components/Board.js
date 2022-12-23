import React from "react";
import Square from './Square';

export default class Board extends React.Component {
  renderSquare(i) {
    const isHighligted = this.props.highlightedSquareLocations?.includes(i);

    return <Square
      key={i}
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
      isHighligted={isHighligted}
    />;
  }

  render() {
    const rows = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ];

    return (
      <div>
        {rows.map(row => {
          return (
            <div
              key={row}
              className="board-row"
            >
              {row.map(col => this.renderSquare(col))}
            </div>
          );
        })}
      </div>
    );
  }
}