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
      :striped="true"
      :hoverable="true"
      default-sort="joined"
      default-sort-direction="asc"
      :data="logs"
    >
      <template slot-scope="props">
        <b-table-column label="Account" field="name" width="auto">
          {{ props.row.name }}
        </b-table-column>
        <b-table-column label="Rank" field="rank" sortable>
          {{ props.row.rank }}
        </b-table-column>
        <b-table-column label="Date Joined" field="joined" sortable>
          {{ props.row.joined }}
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
  name: 'GuildMemberTable',
  props: {
    dataUrl: {
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
      let params = [`limit=${this.perPage}`, `page=${this.page}`]
      if (this.account !== undefined) {
        params.push(`account=${this.account}`)
      }
      if (this.type !== undefined) {
        params.push(`account=${this.type}`)
      }
      params = params.join('&')
      this.isLoading = true
      axios
        .get(`${this.dataUrl}`)
        .then(r => {
          if (r.data) {
            // this.PageTotal = r.data.PageTotal
            // this.PageSize = r.data.PageSize
            // this.ResultCount = r.data.ResultCount
            // this.ResultTotal = r.data.ResultTotal
            this.logs = r.data
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
