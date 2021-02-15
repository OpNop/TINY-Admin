<template>
  <div>
    <title-bar :title-stack="titleStack">
      <router-link slot="right" to="/" class="button"> Dashboard </router-link>
    </title-bar>
    <section class="section is-main-section">
      <card-component
        class="has-table has-mobile-sort-spaced"
        title="Log Entries"
        icon="format-list-bulleted-square"
      >
        <guild-log-table
          :data-url="`https://api.tinyarmy.org/v1/guild/${$route.params.guid}/log`"
        />
      </card-component>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CardComponent from '@/components/CardComponent'
import GuildLogTable from '@/components/GuildLogTable'
import TitleBar from '@/components/TitleBar'

export default {
  name: 'Logs',
  components: {
    TitleBar,
    GuildLogTable,
    CardComponent
  },
  computed: {
    titleStack() {
      return ['Admin', 'Logs']
    }
  }
}
</script>
