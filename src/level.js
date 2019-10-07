import distance from './distance';

const updateY = (col, margin) => {
  let column = [...col];
  column.forEach((board, index) => {
    if (board) {
      board.y = index * margin;
    }
  })

  return column;
}


const arrayAverage = array => array.reduce((a,b) => a + b, 0) / array.length;
const difference = (a, b) => Math.abs(a - b);


const scoreColumnLinks = (column, reference, index) => {
  let direction;
  if (column[0].x > reference[0].x) {
    direction = 'parents';
  } else {
    direction = 'children';
  }

  let error = 0;

  for (let i = 0; i < column.length; i += 1) {
    let origin = column[i];

    if (origin && origin[direction].length > 0) {
      let lengths = [];
      let localError = 0;

      for (let j = 0; j < origin[direction].length; j += 1) {
        let target = origin[direction][j];
        target = index.get(target);
        let dist = distance(origin.x, origin.y, target.x, target.y);
        lengths.push(dist);
      }

      const localAverage = arrayAverage(lengths);
      lengths.forEach((length) => {
        localError += difference(localAverage, length);
      })

      error += localError;

    }
  }

  return error;
}

const balanceLevel = (column, ref, margin, index) => {
  let col = column;

  while (col.length < ref.length) {
    let candidates = [];
    let scores = [];

    for (let i = 0; i < col.length; i += 1) {
      let candidate = [...col];
      candidate.splice(i, 0, false);
      candidate = updateY(candidate, margin);
      candidates.push(candidate);
      scores.push(scoreColumnLinks(candidate, ref, index));
    }

    let best = false;
    for (let i = 0; i < scores.length; i += 1) {
      let bestScore = scores[best];
      let currentScore = scores[i];

      if (i === 0 || (bestScore > currentScore)) {
        best = i;
      }
    }

    col = candidates[best];
  }

  return col;
};

export default balanceLevel;
