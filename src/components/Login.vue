<template>
 <div>
   <form class="login" @submit.prevent="login">
     <h1>Sign in</h1>
     <label>API Token</label>
     <input required v-model="token" type="text" placeholder="API Token"/>
     <hr/>
     <button type="submit">Login</button>
   </form>
 </div>
</template>

<script>
  export default {
    data(){
      return {
        token : "",
      }
    },
    methods: {
      login: function () {
        let token = this.token
        this.$store.dispatch('login', { token })
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err))
      }
    }
  }
</script>