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
          <br />
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
                    {{ formatDate(guild.date_joined) }}
                  </b-field>
                </div>
              </div>
            </div>
          </card-component>
        </div>
        <div class="column">
          <b-tabs>
            <b-tab-item label="Logs" icon="format-list-bulleted-square">
              <guild-log-table :account="account" />
            </b-tab-item>
            <!-- <b-tab-item label="Characters" icon="account-multiple"></b-tab-item> -->
            <b-tab-item>
              <template #header>
                <b-icon icon="email"></b-icon>
                <span> Notes <b-tag v-if="user_notes.length > 0" type="is-danger" rounded> {{user_notes.length}} </b-tag> </span>
            </template>
              <div class="notification">
                <b-field label="Message">
                  <b-input rows="3" type="textarea" v-model="new_note"></b-input>
                </b-field>
                <b-field>
                  <p class="control">
                    <b-button
                      label="Add message"
                      type="is-primary"
                      :loading="is_saving_note"
                      @click="addUserNote"
                    />
                  </p>
                </b-field>
              </div>
              <div class="box" v-if="user_notes.length > 0">
                <article v-for="note in user_notes" :key="note.date_created" class="media">
                  <div class="media-left">
                    <figure class="image is-64x64">
                      <b-image
                        :src="`https://cdn.discordapp.com/avatars/${note.id}/${note.avatar}.png`"
                        alt="Image"
                        :rounded="true"
                      />
                    </figure>
                  </div>
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <strong>{{note.creator}}</strong>
                        <small> {{formatDate(note.date_created)}}</small>
                        <br />
                        <vue-markdown>
                          {{note.message}}
                        </vue-markdown>
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </b-tab-item>
          </b-tabs>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from '@/services/api'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import utc from 'dayjs/plugin/utc'
import TitleBar from '@/components/TitleBar'
import CardComponent from '@/components/CardComponent'
import UserGuild from '@/components/UserGuild'
import GuildLogTable from '@/components/GuildLogTable'
import DiscordAvatar from '@/components/DiscordAvatar'
import VueMarkdown from 'vue-markdown'

dayjs.extend(advancedFormat)
dayjs.extend(utc)

export default {
  name: 'MemberProfile',
  components: {
    UserGuild,
    CardComponent,
    TitleBar,
    GuildLogTable,
    DiscordAvatar,
    VueMarkdown
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
      origDiscord: '',
      //Notes Tab
      is_saving_note: false,
      new_note: '',
      user_notes: []
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
    this.getUserNotes()
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
            this.created = this.formatDate(r.data.created)
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
    },
    async getUserNotes() {
      try {
        const notes = await api.getUserNotes(this.account)
        this.user_notes = notes.data
      } catch (error) {
        this.user_notes = []
        this.$buefy.toast.open({
            message: `Error: ${error.message}`,
            type: 'is-danger'
          })
      }
    },
    async addUserNote() {
      this.is_saving_note = true
      try {
        let result = await api.addUserNote(this.account, {message: this.new_note})
        this.user_notes = result.data
        this.new_note = ''
      } catch (error) {
        //do popup
      }
      this.is_saving_note = false;
    },
    formatDate(date) {
      return dayjs.utc(date).local().format('MMM Do, YYYY h:mm A')
    }
  }
}
</script>
