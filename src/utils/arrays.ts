const arrayDif = (ar: any[]): string => JSON.stringify(ar)

const arrayForce = (ar): any[] | null => (!ar ? null : Array.isArray(ar) ? ar : [ar])

const arrayUnique = (ar): any[] => [...new Set(ar)]

const arrayObjectUnique = (ar: any[], property: string): any[] => {
  const c = {}
  return ar.filter((item) => {
    const prop = item[property]
    const isNew = !c?.[prop]
    if (isNew) {
      c[prop] = true
      return true
    }
    return false
  })
}

const sortByValue = (value, a, b): number => {
  return a?.[value] == b?.[value] ? 0 : a?.[value] > b?.[value] ? 1 : -1
}

const sortByNumericValue = (value, a, b): number => {
  return isNaN(a?.[value]) ? (isNaN(b?.[value]) ? 0 : -1) : !isNaN(b?.[value]) ? a?.[value] - b?.[value] : 1
}

export { arrayDif, arrayForce, arrayUnique, arrayObjectUnique, sortByValue, sortByNumericValue }
