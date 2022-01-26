const parseYear = (y): string => {
  return isNaN(y) ? y : y < 0 ? Math.abs(y) + ' BC' : y.toString() + ' CE'
}

export default parseYear
