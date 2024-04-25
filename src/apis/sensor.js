import request from './request'

export default {
  getSensors: () => {
    return request.get('/sensors')
      .then(res => res.data)
  },
  getSensorsStatus: () => {
    return request.get('/sensor/statistic')
      .then(res => res.data)
  },
  getSensorsDayData: ({ sensorId }) => {
    return request.get('/metric/range_data', { params: { sensorId } })
      .then(res => res.data)
  },
}
