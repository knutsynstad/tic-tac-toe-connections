import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
import boards from './boards.json'


const marginHorizontal = 225;
const marginVertical = 90;
const offset = 15;
const cellSize = 15;

let levels = [[],[],[],[],[],[],[],[],[],[]];
let links = [];

// Sort boards by level
boards.forEach(board => {
  levels[board.level].push(board)

  board.children.forEach(child => {
    links.push([board.id, child]);
  })
})

let posIndex = new Map();
for (let level = 0; level < levels.length; level += 1) {
  for (let row = 0; row < levels[level].length; row += 1) {
    const board = levels[level][row];
    const x = level * marginHorizontal
    const y = row * marginVertical;
    posIndex.set(board.id, [x, y]);
  }
}

class Poster extends React.Component {
  render() {
    var elements=[]
    levels.forEach(level => {
      level.forEach(board => {
        let [x, y] = posIndex.get(board.id);
        elements.push(
          <Board
            x={x}
            y={y}
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
      origin = posIndex.get(origin);
      target = posIndex.get(target);
      const key = `${origin}-${target}`;
      const x1 = offset + origin[0] + 45;
      const y1 = origin[1] + (45 / 2);
      const x2 = target[0] - offset;
      const y2 = target[1] + (45 / 2);
      const midpoint = x1 + (x2 - x1) / 2;
      const path = `
        M ${x1} ${y1}
        C ${midpoint} ${y1},
        ${midpoint} ${y2},
        ${x2} ${y2}`;

      console.log(origin, target);
      connections.push(
        <path
          key={key}
          d={path}
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
          stroke="black"
          fill="none">
          {connections}
        </g>
      </g>
    )
  }
}

ReactDOM.render(<Poster/>, document.getElementById('root'));
