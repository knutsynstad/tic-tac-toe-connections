const margins = [8, 8, 12, 12, 16, 16, 16, 12, 8];

const getXPosition = (level, cellSize) => {
  const boardSize = cellSize * 3;
  let position = 0;
  for (let i = 0; i < level; i += 1) {
    position += (boardSize * margins[i]) + boardSize;
  }
  return position;
};

module.exports = getXPosition;
