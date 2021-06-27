<template>
  <div>
    <!-- <b-field grouped group-multiline>
      <b-select v-model="perPage" @input="onPerPageChanged">
        <option value="5">5 per page</option>
        <option value="10">10 per page</option>
        <option value="15">15 per page</option>
        <option value="20">20 per page</option>
        <option value="25">25 per page</option>
      </b-select>
    </b-field> -->
    <b-table
      :checked-rows.sync="checkedRows"
      :loading="isLoading"
      paginated
      backend-pagination
      :total="ResultTotal"
      :per-page="perPage"
      @page-change="onPageChange"
      :striped="true"
      :hoverable="true"
      default-sort="date"
      default-sort-direction="desc"
      :data="logs"
    >
      <b-table-column
        label="Message"
        field="message"
        width="auto"
        v-slot="props"
      >
        {{ props.row.message }}
      </b-table-column>
      <b-table-column
        v-if="!guild"
        label="Guild"
        field="guild_name"
        sortable
        v-slot="props"
      >
        {{ props.row.guild_name }}
      </b-table-column>
      <b-table-column label="Type" field="type" sortable v-slot="props">
        {{ props.row.type }}
      </b-table-column>
      <b-table-column label="Date" field="date" sortable v-slot="props">
        <date-format :date="props.row.date" />
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
  name: 'GuildLogTable',
  components: {
    DateFormat
  },
  props: {
    guild: {
      type: String,
      default: null
    },
    account: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      PageTotal: 0,
      PageSize: 0,
      ResultCount: 0,
      ResultTotal: 0,
      logs: [],
      isLoading: false,
      page: 1,
      perPage: 20,
      checkedRows: []
    }
  },
  methods: {
    loadLogsAsync() {
      let params = [`limit=${this.perPage}`, `page=${this.page}`, 'v2=true']
      if (this.account !== null) {
        params.push(`account=${this.account}`)
      }
      if (this.type !== undefined) {
        params.push(`account=${this.type}`)
      }
      params = params.join('&')
      this.isLoading = true
      api
        .getLogs(params, this.guild)
        .then(r => {
          if (r.data) {
            this.PageTotal = r.data.PageTotal
            this.PageSize = r.data.PageSize
            this.ResultCount = r.data.ResultCount
            this.ResultTotal = r.data.ResultTotal
            this.logs = r.data.logs
            this.isLoading = false
          }
        })
        .catch(error => {
          this.PageTotal = 0
          this.PageSize = 0
          this.ResultCount = 0
          this.ResultTotal = 0
          this.logs = []
          this.isLoading = false
        })
    },
    onPageChange(page) {
      this.page = page
      this.loadLogsAsync()
    },
    onPerPageChanged(perPage) {
      this.perPage = perPage
      this.loadLogsAsync()
    }
  },
  mounted() {
    this.loadLogsAsync()
  }
}
</script>
