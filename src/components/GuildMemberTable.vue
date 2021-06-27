<template>
  <div>
    <b-table
      :checked-rows.sync="checkedRows"
      :loading="isLoading"
      :striped="true"
      :hoverable="true"
      :data="members"
      backend-sorting
      :default-sort="[sortField, sortOrder]"
      :default-sort-direction="sortOrder"
      @sort="onSort"
      paginated
      backend-pagination
      :total="ResultTotal"
      :per-page="perPage"
      @page-change="onPageChange"
    >
      <b-table-column
        class="has-no-head-mobile is-image-cell"
        v-if="showGuild"
        v-slot="props"
      >
        <div class="image">
          <img
            :src="`https://emblem.werdes.net/emblem/${props.row.guild_guid}`"
            :alt="props.row.name"
          />
        </div>
      </b-table-column>
      <b-table-column
        label="Account"
        field="account"
        width="auto"
        sortable
        v-slot="props"
      >
        <router-link
          :to="{
            name: 'member.view',
            params: { account: props.row.account },
          }"
        >
          {{ props.row.account }}
        </router-link>
      </b-table-column>
      <b-table-column
        label="Guild"
        field="name"
        v-if="showGuild"
        v-slot="props"
      >
        {{ props.row.guild_name }}
      </b-table-column>
      <b-table-column label="Rank" field="guild_rank" sortable v-slot="props">
        {{ props.row.guild_rank }}
      </b-table-column>
      <b-table-column
        label="Date Joined"
        field="date_joined"
        sortable
        v-slot="props"
      >
        <date-format :date="props.row.date_joined" />
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
import DateFormat from '@/components/DateFormat'

export default {
  name: 'GuildMemberTable',
  components: {
    DateFormat
  },
  props: {
    guild: {
      type: String,
      default: null
    },
    showGuild: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      PageTotal: 0,
      PageSize: 0,
      ResultCount: 0,
      ResultTotal: 0,
      members: [],
      isLoading: false,
      page: 1,
      perPage: 20,
      checkedRows: [],
      sortField: 'date_joined',
      sortOrder: 'desc'
    }
  },
  methods: {
    loadMembersAsync() {
      const params = [
        `limit=${this.perPage}`,
        `page=${this.page}`,
        `sort_by=${this.sortField}`,
        `order_by=${this.sortOrder}`
      ].join('&')
      // if (this.account !== undefined) {
      //   params.push(`account=${this.account}`)
      // }
      // if (this.type !== undefined) {
      //   params.push(`account=${this.type}`)
      // }
      // params = params.join('&')
      this.isLoading = true
      api.getMembers(params, this.guild)
        .then(r => {
          if (r.data) {
            this.PageTotal = r.data.PageTotal
            this.PageSize = r.data.PageSize
            this.ResultCount = r.data.ResultCount
            this.ResultTotal = r.data.ResultTotal
            this.members = r.data.members
            this.isLoading = false
          }
        })
        .catch(error => {
          this.PageTotal = 0
          this.PageSize = 0
          this.ResultCount = 0
          this.ResultTotal = 0
          this.members = []
          this.isLoading = false
        })
    },
    onPageChange(page) {
      this.page = page
      this.loadMembersAsync()
    },
    onPerPageChanged(perPage) {
      this.perPage = perPage
      this.loadMembersAsync()
    },
    onSort(field, order) {
      this.sortField = field
      this.sortOrder = order
      this.loadMembersAsync()
    }
  },
  mounted() {
    this.loadMembersAsync()
  }
}
</script>
