import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
import boards from './boards.json';
import linkColor from './linkColor';
import sortLevel from './sortLevel';

const marginHorizontal = 225;
const marginVertical = 90;
const offset = 15;
const cellSize = 15;

let levels = [[],[],[],[],[],[],[],[],[],[]];
let links = [];

// Sort boards by level
boards.forEach(board => {
  levels[board.level].push(board);

  board.children.forEach(child => {
    links.push([board.id, child]);
  })
})

levels.forEach(level => console.log(level.length));

let index = new Map();
for (let level = 0; level < levels.length; level += 1) {
  for (let row = 0; row < levels[level].length; row += 1) {
    const board = levels[level][row];
    board.x = level * marginHorizontal
    board.y = row * marginVertical;
    index.set(board.id, board);
  }
}

// Here is where we'd resort.
sortLevel(levels[5], "children", 204, marginVertical, index);

class Poster extends React.Component {
  render() {
    var elements=[]
    levels.forEach(level => {
      level.forEach(board => {
        elements.push(
          <Board
            x={board.x}
            y={board.y}
            cellSize={cellSize}
            key={board.id}
            board={board}
          />
        );
      })
    })

    let connections = [];
    links.forEach(link => {
      let [origin, target] = link;
      origin = index.get(origin);
      target = index.get(target);
      const color = linkColor(origin, target);
      const key = `${origin.id}-${target.id}`;
      const x1 = offset + origin.x + 45;
      const y1 = origin.y + (45 / 2);
      const x2 = target.x - offset;
      const y2 = target.y + (45 / 2);
      const midpoint = x1 + (x2 - x1) / 2;
      const path = `
        M ${x1} ${y1}
        C ${midpoint} ${y1},
        ${midpoint} ${y2},
        ${x2} ${y2}`;

      connections.push(
        <path
          key={key}
          d={path}
          stroke={color}
          opacity="0.2"
        />
      );
    })

    return (
      <g>
        <g>
          {elements}
        </g>
        <g
          strokeweight="1"
          fill="none">
          {connections}
        </g>
      </g>
    )
  }
}

ReactDOM.render(<Poster/>, document.getElementById('root'));
