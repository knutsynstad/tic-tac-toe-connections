import React from 'react'

class Cell extends React.Component {
  render() {
    const symbol = this.props.symbol;
    if (symbol === "X") {
      return <use xlinkHref="#cross" x={this.props.x}  y={this.props.y} />;
    } else if (symbol === "O") {
        return <use xlinkHref="#circle" x={this.props.x}  y={this.props.y} />;
    } else {
      return null;
    }
  }
}

class Highlights extends React.Component {

  getWinCells(cells) {
      let winCells = [];
      let winLines = [
        [0,1,2], // Row 1
        [3,4,5], // Row 2
        [6,7,8], // Row 3
        [0,3,6], // Column 1
        [1,4,7], // Column 2
        [2,5,8], // Column 3
        [0,4,8], // Top left to bottom right
        [6,4,2]  // Bottom left to top right
      ];

      for (let line = 0; line < winLines.length; line++) {
        let rule = winLines[line];
        if (cells[rule[0]] === cells[rule[1]]
          && cells[rule[0]] === cells[rule[2]]
          && cells[rule[0]] !== "E") {
          winCells.push(...winLines[line]);
        }
      }

      // Dedupe wincells
      let unique = [...new Set(winCells)];
      return unique;
  }

  render() {
    if (this.props.board.result === "draw") {
      return <rect width="45" height="45" stroke="none" fill={this.props.color} opacity="0.1" />;
    } else if (this.props.board.result === "X" || this.props.board.result === "O") {
      const wincells = this.getWinCells(this.props.board.cells);
      const cellSize = this.props.cellSize;
      let elements = [];
      let pos = [
        [0, 0],
        [cellSize, 0],
        [cellSize * 2, 0],
        [0, cellSize],
        [cellSize, cellSize],
        [cellSize * 2, cellSize],
        [0, cellSize * 2],
        [cellSize, cellSize * 2],
        [cellSize * 2, cellSize * 2]
      ];

      for (let i = 0; i < wincells.length; i++) {
        elements.push(
          <rect
            key={i}
            x={pos[wincells[i]][0]}
            y={pos[wincells[i]][1]}
            width={cellSize}
            height={cellSize}
            stroke="none"
            fill={this.props.color}
            opacity="0.1"
          />
        );
      }

      return (<g>{elements}</g>);
    } else {
      return null;
    }
  }
}

class Board extends React.Component {

  constructor() {
    super();
    this.strokeWeight = 1;
  }

  getColor() {
    const symmetries = this.props.board.symmetries;
    if (symmetries.includes('rotational')
      && symmetries.includes('reflectional')) {
      return '#E24486';
    }
    if (symmetries.includes('rotational')) {
      return '#0081C3';
    }
    if (symmetries.includes('reflectional')) {
      return '#00A94F';
    }
    return '#231F20';
  }

  render() {
    const cells = this.props.board.cells;
    const cellSize = this.props.cellSize;
    const boardSize = cellSize * 3;
    const third = cellSize / 3;
    const viewPort = `0 0 ${boardSize} ${boardSize}`;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewPort}
        width={boardSize}
        height={boardSize}
        x={this.props.x}
        y={this.props.y}>
        <defs>
          <circle
            id="circle"
            cx={cellSize / 2}
            cy={cellSize / 2}
            r={cellSize / 6}
            stroke="inherit"
            strokeWidth={this.strokeWeight}
            fill="none"
          />
          <g id="cross" stroke="inherit" strokeWidth={this.strokeWeight} >
            <line x1={third} y1={third} x2={third * 2} y2={third * 2} />
            <line x1={third} y1={third * 2} x2={third * 2} y2={third} />
          </g>
        </defs>

        <g klass="cells" stroke={this.getColor()} >
          {/* Row 1 */}
          <Cell symbol={cells[0]} x="0" y="0" />
          <Cell symbol={cells[1]} x={cellSize} y="0" />
          <Cell symbol={cells[2]} x={cellSize * 2} y="0" />

          {/* Row 2 */}
          <Cell symbol={cells[3]} x="0" y={cellSize} />
          <Cell symbol={cells[4]} x={cellSize} y={cellSize} />
          <Cell symbol={cells[5]} x={cellSize * 2} y={cellSize} />

          {/* Row 3 */}
          <Cell symbol={cells[6]} x="0" y={cellSize * 2} />
          <Cell symbol={cells[7]} x={cellSize} y={cellSize * 2} />
          <Cell symbol={cells[8]} x={cellSize * 2} y={cellSize * 2} />
        </g>

        {/* Board */}
        <g
          klass="board"
          stroke={this.getColor()}
          strokeWidth={this.strokeWeight}
          opacity="0.2" >
          <line x1={cellSize} y1="0" x2={cellSize} y2={boardSize} />
          <line x1={cellSize * 2} y1="0" x2={cellSize * 2} y2={boardSize} />
          <line x1="0" y1={cellSize} x2={boardSize} y2={cellSize} />
          <line x1="0" y1={cellSize * 2} x2={boardSize} y2={cellSize * 2} />
        </g>

        {/* Cell backgrounds for wins */}
        <Highlights {...this.props} color={this.getColor()} />

      </svg>
    )
  }
}

export default Board
