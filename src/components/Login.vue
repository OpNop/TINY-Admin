<template>
 <div>
   <form class="login" @submit.prevent="login">
     <h1>Sign in</h1>
     <label>API Token</label>
     <v-text-field
            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show3 ? 'text' : 'password'"
            name="token"
            label="API Token"
            class="input-group--focused"
            @click:append="show3 = !show3"
          ></v-text-field>
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