// Calculate euclidean distance between two points

module.exports = (x1, y1, x2, y2) => {
  const horizontal = Math.pow(x2 - x1, 2);
  const vertical = Math.pow(y2 - y1, 2);
  const distance = Math.sqrt(horizontal + vertical);
  return distance;
};
