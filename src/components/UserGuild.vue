<template>
  <div class="is-user-avatar">   
      <img :src="getEmblem" />
  </div>
</template>

<script>
export default {
  name: 'UserGuild',
  props: {
    guild: {
      type: String,
      default: null
    }
  },
  computed: {
    getEmblem () {
      return `https://emblem.werdes.net/emblem/${this.guild}`
      //`https://avatars.dicebear.com/v2/human/${name}.svg?options[mood][]=happy`
    }
  }
}
</script>
