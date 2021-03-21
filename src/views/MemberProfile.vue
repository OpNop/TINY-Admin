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
                        :value="created"
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
import axios from 'axios'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import TitleBar from '@/components/TitleBar'
import CardComponent from '@/components/CardComponent'
import UserGuild from '@/components/UserGuild'
import GuildLogTable from '@/components/GuildLogTable'

dayjs.extend(advancedFormat);

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
      account: null,
      created: '',
      guilds: [],
      is_banned: false,
      ban_data: ''
    }
  },
  computed: {
    titleStack() {
      return ['Admin', 'Members', this.account]
    }
  },
  created() {
    this.account = this.$route.params.account
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      axios
        .get(`https://api.tinyarmy.org/v1/members/${this.account}`)
        .then(r => {
          // 2018-05-08 3:00 is date Pewpews Army was created
          if(dayjs(r.data.created).isBefore('2018-05-08', 'month')){
            this.created = "Data Lost";
          } else {
            this.created = dayjs(r.data.created).format('MMMM Do, YYYY h:mm A')
          }
          
          this.guilds = r.data.guilds
          this.is_banned = r.data.is_banned
          if (this.is_banned) this.ban_data = r.data.ban_reason
        })
        .catch(error => {
          this.data = []
          this.$buefy.toast.open({
            message: `Error: ${error.message}`,
            type: 'is-danger'
          })
        })
    }
  }
}
</script>
