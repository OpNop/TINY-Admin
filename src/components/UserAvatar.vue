<template>
  <div class="is-user-avatar">
    <img :src="newUserAvatar" :alt="userName" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'UserAvatar',
  props: {
    avatar: {
      type: String,
      default: null
    }
  },
  computed: {
    newUserAvatar () {
      if (this.avatar) {
        return this.avatar
      }

      if (this.userAvatar) {
        return this.userAvatar
      }

      let name = 'somename'

      if (this.userName) {
        name = this.userName.replace(/[^a-z0-9]+/i, '')
      }

      return `https://api.dicebear.com/7.x/thumbs/svg?seed=${name}`
    },
    ...mapState(['userAvatar', 'userName'])
  }
}
</script>
