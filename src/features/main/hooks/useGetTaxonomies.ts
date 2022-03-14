import { useEffect, useState } from 'react'

export default function useGetTaxonomies(items) {
  const [taxonomies, setTaxonomies] = useState<any>([])
  const [places, setPlaces] = useState<any>([])

  useEffect(() => {
    setTaxonomies([...new Set(items.map((item) => item?.icon).filter((icon) => icon))].sort(sortTaxonomy))
    setPlaces(
      [
        ...new Set(
          items
            .reduce((a, item) => {
              return item?.place ? (Array.isArray(item.place) ? [...a, ...item.place] : [...a, item.place]) : a
            }, [])
            .filter((place) => place)
        ),
      ].sort(sortTaxonomy)
    )
  }, [JSON.stringify(items)])

  return { taxonomies, places }
}

const sortTaxonomy = (a, b) => (a > b ? 1 : a < b ? -1 : 0)
