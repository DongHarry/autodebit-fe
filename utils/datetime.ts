import moment from 'moment'

export const formatDateTime = (
  data: string,
  format: string = 'DD/MM/YYYY - HH:mm',
) => {
  const dateTime = moment(data)

  return dateTime.format(format)
}
