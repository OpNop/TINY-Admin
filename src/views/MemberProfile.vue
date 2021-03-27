<template>
  <div>
    <title-bar :title-stack="titleStack">
      <router-link slot="right" to="/" class="button"> Dashboard </router-link>
    </title-bar>
    <section class="section is-main-section">
      <b-message
        v-if="is_banned"
        title="This user is banned"
        type="is-danger"
        has-icon
        :closable="false"
      >
        {{ ban_data.reason }}
      </b-message>

      <div class="columns">
        <div class="column is-3">
          <div class="tile is-ancestor">
            <div class="tile is-vertical is-parent">
              <div class="tile is-child">
                <card-component
                  title="Member Info"
                  icon="account"
                  class="tile is-child"
                >
                  <b-field label="Account">
                    {{ account }}
                  </b-field>
                  <b-field label="Original Join Date">
                    {{ created }}
                  </b-field>
                  <b-field label="Discord Account">
                    <discord-avatar :account="account" />
                  </b-field>
                </card-component>
              </div>
              <div class="tile is-child">
                <card-component
                  title="Guilds"
                  icon="account-group"
                  class="tile is-child"
                >
                  <div
                    v-if="guilds.length == 0"
                    class="content has-text-centered has-text-grey"
                  >
                    <p>
                      <b-icon icon="emoticon-sad" size="is-large"></b-icon>
                    </p>
                    <p>Not in any guilds</p>
                  </div>
                  <div
                    v-else
                    class="media"
                    v-for="guild in guilds"
                    :key="guild.guild_guid"
                  >
                    <figure class="media-left image is-64x64">
                      <user-guild
                        :guild="guild.guild_guid"
                        class="image has-max-width"
                      />
                    </figure>
                    <div class="media-content">
                      <div class="content">
                        <b-field label="Rank">
                          {{ guild.guild_rank }}
                        </b-field>
                        <b-field label="Date Joined">
                          {{ guild.date_joined }}
                        </b-field>
                      </div>
                    </div>
                  </div>
                </card-component>
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
            <guild-log-table :account="account" />
          </card-component>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from '@/services/api'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import TitleBar from '@/components/TitleBar'
import CardComponent from '@/components/CardComponent'
import UserGuild from '@/components/UserGuild'
import GuildLogTable from '@/components/GuildLogTable'
import DiscordAvatar from '@/components/DiscordAvatar'

dayjs.extend(advancedFormat)

export default {
  name: 'MemberProfile',
  components: {
    UserGuild,
    CardComponent,
    TitleBar,
    GuildLogTable,
    DiscordAvatar
  },
  data() {
    return {
      account: null,
      discord: {},
      created: '',
      guilds: [],
      is_banned: false,
      ban_data: '',
      is_editing: false,
      origDiscord: ''
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
      api
        .getMember(this.account)
        .then(r => {
          // 2018-05-08 3:00 is date Pewpews Army was created
          if (dayjs(r.data.created).isBefore('2018-05-08', 'month')) {
            this.created = 'Data Lost'
          } else {
            this.created = dayjs(r.data.created).format('MMMM Do, YYYY h:mm A')
          }

          this.discord = r.data.discord
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
        .finally(() => {})
    }
  }
}
</script>
