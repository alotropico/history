const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16))
  return `rgba(${r},${g},${b}, ${alpha})`
}
const hex2rgbaDarken = (hex, alpha = 1) => {
  const [r, g, b] = hex
    .match(/\w\w/g)
    .map((x) => parseInt(x, 16))
    .map((x) => Math.round(x * 1.3))

  return `rgba(${r},${g},${b}, ${alpha})`
}

export { hex2rgba, hex2rgbaDarken }
