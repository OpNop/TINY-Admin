<template>
  <div>
    <title-bar :title-stack="titleStack">
      <router-link slot="right" to="/" class="button"> Dashboard </router-link>
    </title-bar>
    <section class="section is-main-section">
      <div class="columns">
        <div class="column is-4">
          <div class="tile is-ancestor">
            <div class="tile is-vertical">
              <div class="tile">
                <div class="tile is-parent is-vertical">
                  <card-component
                    title="Member Info"
                    icon="account"
                    class="tile is-child"
                  >
                    <b-field label="Account">
                      <b-input
                        :value="account"
                        custom-class="is-static"
                        readonly
                      />
                    </b-field>
                    <b-field label="Original Join Date">
                      <b-input
                        value="2021-03-17 05:16:44"
                        custom-class="is-static"
                        readonly
                      />
                    </b-field>
                  </card-component>
                  <card-component
                    title="Guilds"
                    icon="account"
                    class="tile is-child"
                  >
                    <div class="is-flex is-justify-content-center">
                      <user-guild
                        guild="0A9D5AFD-9709-E911-81A8-A25FC8B1A2FE"
                        class="image has-max-width"
                      /><user-guild
                        guild="BA7EC8EA-6B52-E811-81A8-90824340DEC8"
                        class="image has-max-width"
                      />
                    </div>
                  </card-component>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <card-component
            title="Logs"
            icon="format-list-bulleted-square"
            class="tile is-child has-table has-mobile-sort-spaced"
          >
            <guild-log-table
              :data-url="`https://api.tinyarmy.org/v1/guild/logs`"
              :account="account"
            />
          </card-component>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar'
import CardComponent from '@/components/CardComponent'
import UserGuild from '@/components/UserGuild'
import GuildLogTable from '@/components/GuildLogTable'

export default {
  name: 'MemberProfile',
  components: {
    UserGuild,
    CardComponent,
    TitleBar,
    GuildLogTable
  },
  data() {
    return {
      account: null
    }
  },
  computed: {
    titleStack() {
      return ['Admin', 'Members', this.account]
    }
  },
  created() {
    this.account = this.$route.params.account
  }
}
</script>
