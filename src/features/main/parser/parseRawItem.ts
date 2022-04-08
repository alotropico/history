import getItemName from '../../../utils/getItemName'
// import { stringToColour } from '../../../utils/colors'
import { arrayUnique } from '../../../utils/arrays'
import { DbItem, ParsedItem } from '../../../types'

const parseRawItem = (item: DbItem): ParsedItem => {
  const { claims, id, ...rest } = item
  const { type, start, end, events, ...restClaims } = claims || {}
  // const { country } = claims || {}
  const languages = copyProperties(restClaims, ['otherLanguages'], 'languages')
  const places = copyProperties(restClaims, ['country', 'birth', 'residence', 'death'], 'places')
  const death = copyProperties(restClaims, ['causeOfDeath', 'mannerOfDeath'], 'death')
  const occupation = copyProperties(restClaims, ['occupation'], 'occupation')

  return {
    id: rest?.wikidataId || id,
    name: item?.name || getItemName(rest?.title),
    fullName: rest?.title,

    ...(type && { type }),

    ...(start && start?.precision > 7 && start?.time && { start: start.time }),
    ...(end && end?.precision > 7 && end?.time && { end: end.time }),

    ///...(place && { place }),

    //...(country && { country }),

    properties: {
      ...(rest?.imageUrl && { imageUrl: rest.imageUrl }),
      ...(rest?.extract && { desc: rest.extract }),
      ...(rest?.wikidataId && { wikidataId: rest.wikidataId }),
      ...(rest?.pageid && { wikipediaId: rest.pageid }),
      ...((Object.keys(restClaims).length || places) && {
        claims: { ...restClaims, languages, places, death, occupation },
      }),
    },

    events: events || null,
  }
}

const copyProperties = (objs: { [key: string]: any[] } | any, keys: string[], type: string) => {
  const rawProperties = keys
    .filter((key) => objs?.[key])
    .map((key) => objs[key])
    .reduce((a, i: any) => {
      const el = i && Array.isArray(i) ? i : [i]
      return [...a, ...el]
    }, [])

  return consolidateProperties(rawProperties, type)
}

const consolidateProperties = (properties, type) => {
  return arrayUnique(properties.map((p) => parseProperty(p, type)).filter((p) => p))
}

const parseProperty = (text, type) => {
  let cleanText = text.toLowerCase()
  const iterate = [...replacements.all, ...(replacements?.[type] || [])].filter((i) => i)

  //iterate.forEach((config) =>
  iterate.forEach((reps) => {
    reps.search.forEach((rep) => {
      if (new RegExp('\\b' + rep + '\\b').test(cleanText)) {
        if (reps.replaceAll) cleanText = reps.replace
        else cleanText = cleanText.replace(rep, reps.replace)
      }
    })
  })
  //)
  return cleanText.trim()
}

const replacements = {
  all: [{ search: ['ancient', 'classical', 'old'], replace: '' }],
  languages: [
    { search: ['koine', 'biblical'], replace: '' },
    { search: ['jewish palestinian aramaic'], replace: 'aramaic' },
  ],
  death: [
    { search: ['of athens', ''], replace: '' },
    { search: ['consensual homicide'], replace: 'suicide', replaceAll: true },
    { search: ['death in battle'], replace: 'killed in action', replaceAll: true },
    { search: ['crucifixion', 'forced suicide'], replace: 'capital punishment', replaceAll: true },
  ],
  occupation: [
    { search: ['roman', 'carpenter', 'farmer', 'gladiator', 'archivist', 'tutor', 'polymath'], replace: '' },
    { search: ['composer'], replace: 'musician', replaceAll: true },
    {
      search: [
        'poet',
        'elegist',
        'writer',
        'playwright',
        'essayist',
        'biographer',
        'literary critic',
        'memoirist',
        'epigrammatist',
        'author',
      ],
      replace: 'writer',
      replaceAll: true,
    },
    {
      search: ['military', 'strategos', 'warrior', 'fighter', 'mercenary', 'soldier', 'war chief'],
      replace: 'military',
      replaceAll: true,
    },
    {
      search: [
        'statesperson',
        'orator',
        'jurist',
        'political theorist',
        'lawyer',
        'diplomat',
        'magistrate',
        'legislator',
      ],
      replace: 'politician',
      replaceAll: true,
    },
    { search: ['sovereign', 'monarch', 'regent', 'regnant'], replace: 'ruler', replaceAll: true },
    {
      search: ['astronomer', 'physicist', 'engineer', 'biologist', 'zoologist'],
      replace: 'scientist',
      replaceAll: true,
    },
    { search: ['mathematician'], replace: 'mathematician', replaceAll: true },
    { search: ['geographer', 'mythographer'], replace: 'historian', replaceAll: true },
    {
      search: [
        'cosmologist',
        'logician',
        'ethicist',
        'epistemologist',
        'political philosopher',
        'philosopher of language',
        'philosopher',
      ],
      replace: 'philosopher',
      replaceAll: true,
    },
    {
      search: [
        'rabbi',
        'religious',
        'religion',
        'preacher',
        'bhikṣu',
        'missionary',
        'theologian',
        'prophet',
        'thaumaturge',
        'healer',
        'messiah',
        'teacher',
        'intercession of saints',
        'priest',
        'augur',
      ],
      replace: 'religious',
      replaceAll: true,
    },
  ],
}

export default parseRawItem
