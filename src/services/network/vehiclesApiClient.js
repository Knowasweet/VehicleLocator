import axios from 'axios'

export const vehiclesApiClient = axios.create({
  baseURL: 'https://test.tspb.su/test-task',
  timeout: 5000
})
