const parseYear = (y): string => {
  return isNaN(y) ? y : y < 0 ? Math.abs(y) + ' BC' : y === 0 ? '1 CE' : y.toString() + ' CE'
}

export default parseYear
