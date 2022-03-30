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
  '8012ed',
  '890de8',
  '9309e2',
  '9d06dc',
  'a703d4',
  'b002cd',
  'b901c5',
  'c201bc',
  'ca01b3',
  'd203aa',
  'd905a0',
  'e00897',
  'e60b8d',
  'ec1083',
  'f11579',
  'f51b6f',
  'f82165',
  'fb285b',
  'fd3052',
  'fe3849',
  'ff4040',
  'fe4938',
  'fd5230',
  'fb5b28',
  'f86521',
  'f56f1b',
  'f17915',
  'ec8310',
  'e68d0b',
  'e09708',
  'd9a005',
  'd2aa03',
  'cab301',
  'c2bc01',
  'b9c501',
  'b0cd02',
  'a7d403',
  '9ddc06',
  '93e209',
  '89e80d',
  '80ed12',
  '76f217',
  '6cf61d',
  '62f923',
  '58fc2b',
  '4ffd32',
  '46fe3a',
  '3dfe43',
  '35fe4c',
  '2dfc55',
  '26fa5f',
  '1ff768',
  '19f472',
  '13ef7c',
  '0eea86',
  '0ae490',
  '07de9a',
  '04d7a4',
  '02cfad',
  '01c7b6',
  '01bfbf',
  '01b6c7',
  '02adcf',
  '04a4d7',
  '079ade',
  '0a90e4',
  '0e86ea',
  '137cef',
  '1972f4',
  '1f68f7',
  '265ffa',
  '2d55fc',
  '354cfe',
  '3d43fe',
  '463afe',
  '4f32fd',
  '582bfc',
  '6223f9',
  '6c1df6',
  '7617f2',
]

let colorCount = -1
const getRandomHex = (id: any = false) => {
  colorCount++
  if (colorCount >= colors.length) colorCount = 0
  const color = colors[id !== false ? id : colorCount]
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

const size = 80
const rainbow = new Array(size)

for (let i = 0; i < size; i++) {
  const red = sin_to_hex(i, (0 * Math.PI * 2) / 3) // 0   deg
  const blue = sin_to_hex(i, (1 * Math.PI * 2) / 3) // 120 deg
  const green = sin_to_hex(i, (2 * Math.PI * 2) / 3) // 240 deg

  rainbow[i] = '#' + red + green + blue
}

function sin_to_hex(i, phase) {
  const sin = Math.sin((Math.PI / size) * 2 * i + phase)
  const int = Math.floor(sin * 127) + 128
  const hex = int.toString(16)

  return hex.length === 1 ? '0' + hex : hex
}

console.log(rainbow)

// const getRandomHex = () => colors[Math.round(Math.random() * (colors.length - 1))]

// const getRandomHex = () => (((0.1 + Math.random() * 0) * 0xffffff) << 0).toString(16)

export { hex2rgba, hex2rgbaDarken, getRandomHex, stringToColour }
