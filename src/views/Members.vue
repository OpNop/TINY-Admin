<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Members
      <!-- <router-link slot="right" to="/" class="button">
        Dashboard
      </router-link> -->
    </hero-bar>
    <section class="section is-main-section">
      Members for {{ $route.params.guid }}
    </section>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
export default {
  components: {
    HeroBar,
    TitleBar
  },
  computed: {
    titleStack () {
      return ['Admin', 'Members']
    }
  }
}
</script>
