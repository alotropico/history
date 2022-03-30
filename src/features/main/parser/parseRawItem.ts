import getItemName from '../../../utils/getItemName'
import { stringToColour } from '../../../utils/colors'
import { arrayUnique } from '../../../utils/arrays'
import { DbItem, ParsedItem } from '../../../types'

const parseRawItem = (item: DbItem): ParsedItem => {
  const { claims, id, ...rest } = item
  const { type, start, end, events, ...restClaims } = claims || {}
  const { country } = claims || {}
  const place = arrayUnique(copyProperties(restClaims, ['birth', 'residence', 'death']))

  return {
    id: id,
    name: item?.name || getItemName(rest?.title),
    fullName: rest?.title,

    ...(type && { type }),

    ...(start && start?.precision > 7 && start?.time && { start: start.time }),
    ...(end && end?.precision > 7 && end?.time && { end: end.time }),

    ...(place && { place }),

    ...(country && { country }),

    properties: {
      ...(rest?.imageUrl && { imageUrl: rest.imageUrl }),
      ...(rest?.extract && { desc: rest.extract }),
      ...(rest?.wikidataId && { wikidataId: rest.wikidataId }),
      ...(rest?.pageid && { wikipediaId: rest.pageid }),
      ...(Object.keys(restClaims).length && { claims: restClaims }),
    },

    events: events || null,
  }
}

const copyProperties = (objs: { [key: string]: any[] } | any, keys: string[]) =>
  keys
    .filter((key) => objs?.[key])
    .map((key) => objs[key])
    .reduce((a, i: any) => [...a, ...i], [])

export default parseRawItem
