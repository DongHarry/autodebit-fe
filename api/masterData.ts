import axios from '~/libs/axios'

export const masterData = (params: object) =>
  axios.get('/master-data', { params })
