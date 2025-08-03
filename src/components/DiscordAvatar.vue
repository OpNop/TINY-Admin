<template>
  <div>
    <div v-if="editing" class="level">
      <div class="level-left">
        <b-input
          size="is-small"
          type="text"
          v-model="id"
          placeholder="Discord ID"
          class="level-item"
          @keyup.enter.native="save"
          @keyup.esc.native="cancel"
          autofocus
        />
      </div>
      <div class="level-right">
        <b-button
          type="is-success"
          size="is-small"
          @click="save"
          icon-left="check-circle"
          class="level-right"
        >
          Save
        </b-button>
        <b-button
          type="is-danger"
          size="is-small"
          @click="cancel"
          icon-left="close-circle"
          class="level-right"
        >
          Cancel
        </b-button>
      </div>
    </div>
    <div v-else class="level can-edit">
      <div v-if="id" class="level-left">
        <figure class="level-item image is-32x32">
          <div class="is-user-avatar">
            <img :src="getAvatar()" :alt="getUsername()" />
          </div>
        </figure>
        <div class="level-item">{{ getUsername() }}</div>
      </div>
      <div v-else class="level-left can-edit">
        <p class="level-item">No Discord</p>
      </div>
      <div class="level-right edit-button">
        <b-button
          icon-right="pencil"
          type="is-light"
          class="level-item"
          @click="edit"
        >
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api'

export default {
  name: 'DiscordAvatar',
  props: {
    account: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      editing: false,
      originalId: '',
      id: '',
      username: '',
      discriminator: '',
      avatar: ''
    }
  },
  methods: {
    load() {
      //Clear current
      this.id = ''
      this.username = ''
      this.discriminator = ''
      this.avatar = ''
      api
        .getDiscord(this.account)
        .then(r => {
          this.id = r.data.id
          this.username = r.data.username
          this.discriminator = r.data.discriminator
          this.avatar = r.data.avatar
        })
        .catch(() => {
          this.$buefy.dialog.alert({
            title: 'Server Error!',
            message: `${error.response.data.error.message}`,
            type: 'is-danger',
            hasIcon: true,
            icon: 'close-circle'
          })
        })
    },
    edit() {
      this.originalId = this.id
      this.editing = true
    },
    cancel() {
      this.id = this.originalId
      this.editing = false
    },
    save() {
      //check that it changes
      if (this.id == this.originalId) {
        this.cancel()
        return
      }

      //Check format or for empty
      if (this.id == '' || /^\d+$/.test(this.id)) {
        let data = {
          account: this.account,
          fields: {
            discord: this.id
          }
        }
        api
          .updateMember(data)
          .then(() => {
            this.$buefy.dialog.alert({
              title: 'Discord Account Saved',
              message: `Discord account for <b>${this.account}</b> has been updated.`,
              type: 'is-success',
              hasIcon: true,
              icon: 'check-circle'
            })
            this.editing = false
            //Reload data
            this.load()
          })
          .catch(error => {
            this.$buefy.dialog.alert({
              title: 'Server Error!',
              message: `${error.response.data.error.message}`,
              type: 'is-danger',
              hasIcon: true,
              icon: 'close-circle'
            })
          })
      } else {
        this.$buefy.dialog.alert({
          title: 'Invalid Discord User ID',
          message: `The id should only contain numbers.<br/>Right-click the users avatar and choose <b>Copy ID</b>`,
          type: 'is-danger',
          hasIcon: true,
          icon: 'alert-circle'
        })
      }
    },
    getUsername() {
      return `${this.username}`
    },
    getAvatar() {
      if (this.username) {
        if (this.avatar) {
          return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.png`
        } else {
          return `https://cdn.discordapp.com/embed/avatars/${this
            .discriminator % 5}.png`
        }
      } else {
        return 'https://cdn.discordapp.com/embed/avatars/0.png'
      }
    }
  },
  created() {
    this.load()
  }
}
</script>

<style lang="scss" scoped>
.can-edit {
  .edit-button {
    visibility: hidden;
  }
}
.can-edit:hover {
  .edit-button {
    visibility: visible;
  }
}
</style>
