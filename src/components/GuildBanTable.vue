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
      <b-table-column
        label="Account"
        field="account"
        width="auto"
        v-slot="props"
      >
        <router-link
          :to="{ name: 'member.view', params: { account: props.row.account } }"
        >
          {{ props.row.account }}
        </router-link>
      </b-table-column>
      <b-table-column label="Discord Name" field="discord" v-slot="props">
        {{ props.row.discord }}
      </b-table-column>
      <b-table-column label="Reason" field="reason" v-slot="props">
        {{ props.row.reason }}
      </b-table-column>
      <b-table-column
        custom-key="actions"
        class="is-actions-cell"
        v-slot="props"
      >
        <div class="buttons is-right">
          <router-link
            :to="{
              name: 'member.view',
              params: { account: props.row.account },
            }"
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
import api from '@/services/api'

export default {
  name: 'GuildBanTable',
  data() {
    return {
      members: [],
      isLoading: false
    }
  },
  methods: {
    loadMembersAsync() {
      this.isLoading = true
      api.banList()
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
