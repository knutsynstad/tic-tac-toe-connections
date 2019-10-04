import distance from './distance';
import lap from './lib/lap.js';


const sortLevel = (level, direction, length, margin, index) => {

  let totalCosts = [];

  level.forEach((board) => {
    const costs = [];
    const links = [];

    board[direction].forEach(id => links.push(index.get(id)));

    for (let i = 0; i < length; i += 1) {
      const y = i * margin;
      let sum = 0;
      links.forEach((link) => {
        sum =+ distance(board.x, y, link.x, link.y);
      })
      costs.push(sum);
    }
    totalCosts.push(costs);
  })
  console.log()

  console.log('costs:')
  console.log(totalCosts);

  console.log('solution:')
  console.log(lap(level.length, totalCosts));
};

export default sortLevel;
