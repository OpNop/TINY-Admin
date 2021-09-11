<template>
  <span>
    <b-tooltip :label="`${date} UTC`" type="is-dark">
      {{ formatedDate }}
    </b-tooltip>
  </span>
</template>

<script>
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import utc from 'dayjs/plugin/utc'

dayjs.extend(advancedFormat)
dayjs.extend(utc)

export default {
  name: 'DateFormat',
  props: {
    date: {
      type: String
    }
  },
  computed: {
    formatedDate() {
      // 2018-05-08 3:00 is date Pewpews Army was created
      // Changed to GW2 launch date for character creation support
      // Launch date was August 28, 2012
      if (dayjs(this.date).isBefore('2012-01-01', 'month')) {
        return 'Data Lost'
      } else {
        return dayjs
          .utc(this.date)
          .local()
          .format('MMM Do, YYYY h:mm A')
      }
    }
  }
}
</script>
