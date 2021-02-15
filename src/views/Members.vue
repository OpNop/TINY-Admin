<template>
  <div>
    <title-bar :title-stack="titleStack">
      <router-link slot="right" to="/" class="button"> Dashboard </router-link>
    </title-bar>
    <section class="section is-main-section">
      Members for {{ $route.params.guid }}
    </section>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar'
export default {
  components: {
    TitleBar
  },
  computed: {
    titleStack () {
      return ['Admin', 'Members']
    }
  }
}
</script>
