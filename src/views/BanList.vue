<template>
  <div>
    <title-bar :title-stack="titleStack">
      <router-link slot="right" to="/" class="button"> Dashboard </router-link>
    </title-bar>
    <section class="section is-main-section">
      <card-component
        class="has-table has-mobile-sort-spaced"
        title="Ban List"
        icon="format-list-bulleted-square"
      >
        <guild-ban-table
          :data-url="`https://api.tinyarmy.org/v1/guild/bans`"
        />
      </card-component>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CardComponent from '@/components/CardComponent'
import GuildBanTable from '@/components/GuildBanTable'
import TitleBar from '@/components/TitleBar'

export default {
  name: 'Bans',
  components: {
    TitleBar,
    GuildBanTable,
    CardComponent
  },
  computed: {
    titleStack() {
      return ['Admin', 'Ban List']
    }
  }
}
</script>
