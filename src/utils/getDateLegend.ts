import parseYear from './parseYear'

const getDateLegend = (start?: number, end?: number, residence?: string, birth?: string, death?: string): string => {
  const life: any = []

  if (start || birth)
    life.push({
      label: 'Birth',
      place: birth,
      date: parseYear(start),
    })

  if (residence)
    life.push({
      label: 'Lived',
      place: residence,
    })

  if (end || death)
    life.push({
      label: 'Death',
      place: death,
      date: parseYear(end),
      comment: getAge(start, end),
    })

  return !start && !end ? [...life, { label: 'Dates', date: 'unknown dates' }] : life
}

const getAge = (start?: number, end?: number): string => {
  return !start || !end ? '' : ` (aged ~ ${end - start})`
}

export default getDateLegend
