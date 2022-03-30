const getItemName = (s) => {
  if (typeof s !== 'string') return ''

  return (
    s
      .replace(/ *\([^)]*\) */g, '')
      // .replace(/,.*$/, '')
      // .replace(/of.*$/, '')
      .split(' ')
      .map((i) => i.trim())
      .filter((i) => i?.length > 3)
      .join(' ') ||
    s ||
    'unnamed'
  )
}

export default getItemName
