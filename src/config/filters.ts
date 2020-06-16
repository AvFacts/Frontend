import Vue from 'vue'
import numeral from 'numeral'
import { DateTime, Duration } from 'luxon'

Vue.filter('integer', (value: number): string => numeral(value).format('0,0'))

Vue.filter('duration', (value: number): string => {
  const duration = Duration.fromMillis(value * 1000)
  if (duration.hours >= 1) return duration.toFormat('h:mm:ss')
  return duration.toFormat('m:ss')
})

Vue.filter('date', (value: string): string =>
  DateTime.fromISO(value).toLocaleString(DateTime.DATE_FULL))

Vue.filter('bytes', (value: number): string => numeral(value).format('0 b'))
