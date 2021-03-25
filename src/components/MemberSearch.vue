<template>
  <b-field>
    <b-autocomplete
      v-model="account"
      :data="data"
      placeholder="Search Members..."
      field="account"
      type="search"
      icon="magnify"
      size="is-medium"
      :loading="isLoading"
      @typing="getAsyncData"
      @select="gotToUser"
      expanded
      keep-first
      clearOnSelect
    >
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
      account: '',
      data: [],
      selected: null,
      isLoading: false
    }
  },
  methods: {
    getAsyncData: debounce(function(account) {
      if (!account.length) {
        this.data = []
        return
      }
      this.isLoading = true
      api.findMember(account)
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
    }, 500),

    gotToUser(account) {
      if (account) {
        this.$router.push({
          name: 'member.view',
          params: { account: account.account }
        })
        this.data = [];
      }
    }
  }
}
</script>