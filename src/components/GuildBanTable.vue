<template>
  <div>
    <b-table
      :loading="isLoading"
      :striped="true"
      :hoverable="true"
      default-sort="joined"
      default-sort-direction="asc"
      :data="members"
    >
      <template slot-scope="props">
        <b-table-column label="Account" field="account" width="auto">
          <router-link
              :to="{ name: 'member.view', params: { account: props.row.account } }"
            >
            {{ props.row.account }}
          </router-link>
        </b-table-column>
        <b-table-column label="Discord Name" field="discord">
          {{ props.row.discord }}
        </b-table-column>
        <b-table-column label="Reason" field="reason">
          {{ props.row.reason }}
        </b-table-column>
        <b-table-column custom-key="actions" class="is-actions-cell">
          <div class="buttons is-right">
            <router-link
              :to="{ name: 'member.view', params: { account: props.row.account } }"
              class="button is-small is-primary"
            >
              <b-icon icon="account-edit" size="is-small" />
            </router-link>
            <button
              class="button is-small is-danger"
              type="button"
              @click.prevent="trashModal(props.row)"
            >
              <b-icon icon="trash-can" size="is-small" />
            </button>
          </div>
        </b-table-column>
      </template>

      <section slot="empty" class="section">
        <div class="content has-text-grey has-text-centered">
          <template v-if="isLoading">
            <p>
              <b-icon icon="dots-horizontal" size="is-large" />
            </p>
            <p>Fetching data...</p>
          </template>
          <template v-else>
            <p>
              <b-icon icon="emoticon-sad" size="is-large" />
            </p>
            <p>Nothing's here&hellip;</p> 
          </template>
        </div>
      </section>
    </b-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'GuildBanTable',
  props: {
    dataUrl: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      members: [],
      isLoading: false,
    }
  },
  methods: {
    loadMembersAsync() {
      this.isLoading = true
      axios
        .get(`${this.dataUrl}`)
        .then(r => {
          if (r.data) {
            this.members = r.data
            this.isLoading = false
          }
        })
        .catch(error => {
          this.members = []
          this.isLoading = false
        })
    }
  },
  mounted() {
    this.loadMembersAsync()
  }
}
</script>
