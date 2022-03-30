import axios from 'axios'
import { useQuery, UseQueryResult } from 'react-query'

const API_URL = '/history'

export const getItems = (id): Promise<any> => {
  return axios.get(`${API_URL}/data/${id}.json`).then((res) => res?.data)
}

export default function useItems(id, config = {}): UseQueryResult<any> {
  return useQuery({
    queryKey: [id],
    queryFn: () => getItems(id),
    ...config,
  })
}
