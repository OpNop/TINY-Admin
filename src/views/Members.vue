<template>
  <div>
    <title-bar :title-stack="titleStack">
      <router-link slot="right" to="/" class="button"> Dashboard </router-link>
    </title-bar>
    <section class="section is-main-section">
      <card-component
        class="has-table has-mobile-sort-spaced"
        title="Guild Members"
        icon="format-list-bulleted-square"
      >
        <guild-member-table
          :data-url="`https://api.tinyarmy.org/v1/guild/${$route.params.guid}/members`"
        />
      </card-component>
    </section>
  </div>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import GuildMemberTable from '@/components/GuildMemberTable'
import TitleBar from '@/components/TitleBar'
export default {
  components: {
    CardComponent,
    GuildMemberTable,
    TitleBar
  },
  computed: {
    titleStack() {
      return ['Admin', 'Members']
    }
  }
}
</script>
