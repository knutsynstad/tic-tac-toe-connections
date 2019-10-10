const updateY = (col, margin) => {
  let column = [...col];
  column.forEach((board, index) => {
    if (board) {
      board.y = index * margin;
    }
  })

  return column;
}


const getDirection = (column, reference) => {
  let direction, x1, x2;

  for (let i = 0; i < column.length; i += 1) {
    let board = column[i];
    if (board) {
      x1 = board.x;
      break;
    }
  }

  for (let i = 0; i < reference.length; i += 1) {
    let board = reference[i];
    if (board) {
      x2 = board.x;
      break;
    }
  }

  if (x1 > x2) {
    direction = 'parents';
  } else {
    direction = 'children';
  }

  return direction;
}


const scoreColumnLinks = (column, reference, index) => {
  const direction = getDirection(column, reference);
  let error = 0;

  for (let i = 0; i < column.length; i += 1) {
    let origin = column[i];

    if (origin && origin[direction].length > 0) {
      let localError = 0;

      for (let id = 0; id < origin[direction].length; id += 1) {
        let target = index.get(origin[direction][id]);
        let angle;

        if (target.x > origin.x) {
          angle = Math.atan2(origin.y - target.y, target.x - origin.x);
        } else {
          angle = Math.atan2(origin.y - target.y, origin.x - target.x);
        }

        angle = angle * 180 / Math.PI;
        localError += angle;
      }

      // Convert to absolute value to avoid
      // groups cancelling out each others errors.
      localError = Math.abs(localError);
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

    for (let i = 0; i < col.length + 1; i += 1) {
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
