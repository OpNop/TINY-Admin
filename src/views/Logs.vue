<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar :has-right-visible="false">
      Logs
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        class="has-table has-mobile-sort-spaced" 
        title="Log Entries" 
        icon="format-list-bulleted-square">
        <guild-log-table 
            :data-url="`https://api.tinyarmy.org/v1/guild/${$route.params.guid}/log`" 
            :checkable="true" />
      </card-component>
    </section>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import CardComponent from '@/components/CardComponent'
  import GuildLogTable from '@/components/GuildLogTable'
  import TitleBar from '@/components/TitleBar'
  import HeroBar from '@/components/HeroBar'

  export default {
    name: 'Logs',
    components: {
      HeroBar,
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
