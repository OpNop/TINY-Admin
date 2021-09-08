<template>
  <div>
    <div v-if="message.type == 'joined'">
      <router-link :to="{ name: 'member.view', params: { account: message.user } }">{{ message.user }}</router-link> has joined the guild
    </div>
    <div v-else-if="message.type == 'invited'">
      <router-link :to="{ name: 'member.view', params: { account: message.invited_by } }" >{{ message.invited_by }}</router-link> invited <router-link :to="{ name: 'member.view', params: { account: message.user } }">{{ message.user }}</router-link>
    </div>
    <div v-else-if="message.type == 'kick'">
      <div v-if="message.user == message.kicked_by">
        <router-link :to="{ name: 'member.view', params: { account: message.user } }">{{ message.user }}</router-link> has left the guild
      </div>
      <div v-else>
        <router-link :to="{ name: 'member.view', params: { account: message.user } }" >{{ message.user }}</router-link> was kicked by <router-link :to="{ name: 'member.view', params: { account: message.kicked_by } }">{{ message.kicked_by }}</router-link>
      </div>
    </div>
    <div v-else-if="message.type == 'rank_change'">
      <router-link :to="{ name: 'member.view', params: { account: message.changed_by } }" >{{ message.changed_by }}</router-link> changed the rank of <router-link :to="{ name: 'member.view', params: { account: message.user } }">{{ message.user }}</router-link> to {{ message.new_rank }}
    </div>
    <div v-else-if="message.type == 'treasury'">
      <router-link :to="{ name: 'member.view', params: { account: message.user } }" >{{ message.user }}</router-link> deposited {{ message.count}} {{ message.item_name }}
    </div>
    <div v-else-if="message.type == 'stash'">
      <div v-if="message.operation == 'deposit'">
        <div v-if="message.coins > 0">
          <router-link :to="{ name: 'member.view', params: { account: message.user } }">{{ message.user }}</router-link> deposited {{ message.coins }} coins
        </div>
        <div v-else>
          <router-link :to="{ name: 'member.view', params: { account: message.user } }">{{ message.user }}</router-link> deposited {{ message.count }} {{ message.item_name }}
        </div>
      </div>
      <div v-else-if="message.operation == 'withdraw'">
        <div v-if="message.coins > 0">
          <router-link :to="{ name: 'member.view', params: { account: message.user } }">{{ message.user }}</router-link> withdrew {{ message.coins }} coins
        </div>
        <div v-else>
          <router-link :to="{ name: 'member.view', params: { account: message.user } }">{{ message.user }}</router-link> withdrew {{ message.count }} {{ message.item_name }}
        </div>
      </div>
      <div v-else-if="message.operation == 'move'">
        <router-link :to="{ name: 'member.view', params: { account: message.user } }">{{ message.user }}</router-link> moved {{ message.count }} {{ message.item_name }} somewhere ¯\_(ツ)_/¯
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogMessage',
  props: {
    message: Object
  }
}
</script>
