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

const colors = [
  '#c42e2e',
  '#d6487e',
  '#8a0b26',
  '#ce0fb5',
  '#8d0492',
  '#680381',
  '#641bb8',
  '#7d1ccc',
  '#4d25bd',
  '#4b5ec4',
  '#4a7cda',
  '#0d689c',
  '#127467',
  '#0fa195',
  '#198b4c',
  '#0f9e2e',
  '#4ac72b',
  '#669753',
  '#93b80d',
  '#899707',
  '#b6aa0a',
  '#a36d0f',
  '#684f1a',
  '#68391a',
  '#af5855',
  '#be3150',
  '#7c2147',
  '#7c2147',
  '#7c2147',
  '#7c2147',
  '#7c2147',
  '#7c2147',
  '#7c2147',
  '#7c2147',
  '#7c2147',
  '#7c2147',
  '#7c2147',
]

let colorCount = -1
const getRandomHex = (id: any = false) => {
  colorCount++
  if (colorCount >= colors.length) colorCount = 0
  const color = colors[id !== false ? id : colorCount].replace('#', '')
  // console.log(`%c ${color} `, 'background: #' + color + '; color: #ffffff')
  return color
}

const stringToColour = (str) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let colour = ''
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    colour += ('00' + value.toString(16)).substr(-2)
  }
  return colour
}

// const getRandomHex = () => colors[Math.round(Math.random() * (colors.length - 1))]

// const getRandomHex = () => (((0.1 + Math.random() * 0) * 0xffffff) << 0).toString(16)

export { hex2rgba, hex2rgbaDarken, getRandomHex, stringToColour }
