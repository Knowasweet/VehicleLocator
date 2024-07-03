import { vehiclesApiClient } from '@/services/network/vehiclesApiClient.js'

export const getVehicles = () => {
  return vehiclesApiClient.get('/vehicles')
}
