<template>
  <div>
    <router-link :to="{ name: 'member.view', params: { account: messageInfo.user } }">{{ messageInfo.user }}</router-link> {{messageInfo.message}}
    <router-link v-if='messageInfo.other' :to="{ name: 'member.view', params: { account: messageInfo.other } }">{{ messageInfo.other }}</router-link>
    <span v-if='messageInfo.new_rank'> new rank: {{messageInfo.new_rank}}</span>
  </div>
</template>

<script>
export default {
  name: 'LogMessage',
  props: {
    message: Object,
  },
  data () {
    return {
      messageInfo: {}
    }
  },
  //This feels "dirty"
  watch: {
    message: {
      immediate: true,
      handler (message) {
        let { type, user, invited_by, kicked_by, changed_by, new_rank, count, item_name, coins, operation } = message // destructuring iz fun
        count = coins || count;
        if (type === 'joined') {
          this.messageInfo = {
            message: `joined the guild`,
          }
        }
        else if (type === 'kick') {
          if (user === kicked_by) {
            this.messageInfo = {
              message: `left the guild`,
            }
          }
          else {
            this.messageInfo = {
              message: `was kicked by:`,
              other: kicked_by
            }
          }
        }
        else if (type === 'invited') {
          this.messageInfo = {
            message: `was invited by:`,
            other: invited_by
          }
        }
        else if (type === 'rank_change') {
          this.messageInfo = {
            message: `'s rank was changed by: `,
            new_rank,
            other: changed_by
          }
        }
        else if (['treasury','stash'].includes(type)) {
          let action = operation === 'withdraw'?'withdrew':operation === 'deposit'? 'deposited':'moved';
          this.messageInfo = {
            message: `${action} ${count} ${coins?'coins':item_name}`,
            new_rank,
            other: changed_by
          }
        }
        this.messageInfo.user = user;
      }
    }
  }
}
</script>