const color = {
  black: '#000000',
  blue: '#0081c3',
  green: '#00a94f',
  magenta: '#e24486'
};

const reflect = (board, direction) => {
  if (direction === 'horizontal') {
    return [
      board[2], board[1], board[0],
      board[5], board[4], board[3],
      board[8], board[7], board[6]]
  } else if (direction === 'vertical') {
    return [
      board[6], board[7], board[8],
      board[3], board[4], board[5],
      board[0], board[1], board[2]]
  } else if (direction === 'diagonal1') {
    return [
      board[0], board[3], board[6],
      board[1], board[4], board[7],
      board[2], board[5], board[8]]
  } else if (direction === 'diagonal2') {
    return [
      board[8], board[5], board[2],
      board[7], board[4], board[1],
      board[6], board[3], board[0]]
  }
}

const rotate = (board, degrees) => {
  if (degrees === 90) {
    return [
      board[6], board[3], board[0],
      board[7], board[4], board[1], 
      board[8], board[5], board[2]]
  } else if (degrees === 180) {
    return [
      board[8], board[7], board[6],
      board[5], board[4], board[3],
      board[2], board[1], board[0]]
  } else if (degrees === 270) {
    return [
      board[2], board[5], board[8],
      board[1], board[4], board[7],
      board[0], board[3], board[6]]
  }
}

const hammingDistance = (a, b) => {
  let distance = 0;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) distance += 1;
  }

  return distance;
}

const linkColor = (origin, target) => {
  const a = origin.cells;
  const b = target.cells;
  const symmetries = [];


  if (hammingDistance(a, b) === 1) {
    return color.black;
  }

  const rotational = [
    90,
    180,
    270
  ];

  rotational.forEach((rotation) => {
    let tmp = rotate(b, rotation);
    if (hammingDistance(a, tmp) === 1) {
      symmetries.push('rotational');
    }
  });

  const reflectional = [
    'horizontal',
    'vertical',
    'diagonal1',
    'diagonal2'
  ];

  reflectional.forEach((reflection) => {
    let tmp = reflect(b, reflection);
    if (hammingDistance(a, tmp) === 1) {
      symmetries.push('reflectional');
    }
  });

  if (symmetries.includes('rotational') && symmetries.includes('reflectional')) {
    return color.magenta;
  } else if (symmetries.includes('rotational')) {
    return color.blue;
  } else if (symmetries.includes('reflectional')) {
    return color.green;
  }

}

module.exports = linkColor;
