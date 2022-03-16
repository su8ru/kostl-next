import aspida from '@aspida/fetch'
import api from '$/api/$api'

export const apiClient = api(aspida(undefined, { throwHttpErrors: true }))
