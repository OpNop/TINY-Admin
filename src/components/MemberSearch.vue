<template>
  <b-field>
    <b-autocomplete
      v-model="query"
      :data="data"
      placeholder="Search Members..."
      group-field="type"
      field="display"
      type="search"
      icon="magnify"
      size="is-medium"
      :loading="isLoading"
      @typing="getAsyncData"
      @select="gotToUser"
      expanded
      keep-first
      clearOnSelect
      select-on-click-outside="false"
      id="memberSearch"
      
    >
    <template #empty>No results for {{query}}</template>
    <template slot-scope="props">
      <div v-if="props.option.type == 'Account'" class="dropdown-item">
        <span class="is-size-6"> {{props.option.display}} </span>
      </div>
      <div v-else class="dropdown-item">
        <span class="is-size-6"> {{props.option.display}} </span>
        <span class="has-text-grey-light"> ({{props.option.value}}) </span>
      </div>
    </template>
    </b-autocomplete>
  </b-field>
</template>

<script>
import debounce from 'lodash.debounce'
import api from '@/services/api'

export default {
  name: 'MemberSearch',
  data() {
    return {
      query: '',
      data: [],
      selected: null,
      isLoading: false
    }
  },
  methods: {
    getAsyncData: debounce(function(query) {
      if (!query.length) {
        this.data = []
        return
      }
      this.isLoading = true
      api.searchAll(query)
        .then(r => {
          this.data = r.data.map(item => item)
        })
        .catch(error => {
          this.data = []
          this.$buefy.toast.open({
            message: `Error: ${error.message}`,
            type: 'is-danger'
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    }, 200),

    gotToUser(selected) {
      if (selected) {
        this.$router.push({
          name: 'member.view',
          params: { account: selected.value }
        })
        this.data = [];
      }
    }
  }
}
</script>