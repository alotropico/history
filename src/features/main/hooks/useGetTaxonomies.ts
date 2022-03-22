import { useEffect, useState } from 'react'

export default function useGetTaxonomies(items) {
  const [taxonomies, setTaxonomies] = useState<any>([])

  useEffect(() => {
    setTaxonomies([...new Set(items.map((item) => item?.icon).filter((icon) => icon))].sort(sortTaxonomy))
  }, [JSON.stringify(items)])

  return { taxonomies }
}

const sortTaxonomy = (a, b) => (a > b ? 1 : a < b ? -1 : 0)
