<template>
  <div>
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <h3 class="title has-text-black">The [TINY] Admin</h3>
            <hr class="login-hr">
            <p class="subtitle has-text-black">Please login to proceed.</p>
            <div class="box">
              <figure class="avatar">
                <img :src="getLogo">
              </figure>
              <form @submit.prevent="login">
                <div class="field">
                  <div class="control">
                    <input required v-model="token" class="input is-large" type="token" placeholder="Your API Token" autofocus="">
                  </div>
                  <span v-if="isError" class="help is-danger is-size-4">Invalid Login</span>
                </div>
                <button class="button is-block is-info is-large is-fullwidth">Login <i class="fa fa-sign-in" aria-hidden="true"></i></button>
              </form>
            </div>
            <p class="has-text-grey">
              <a href="https://tinyarmy.org">TINY Army</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  data() {
    return {
      token: "",
      isError: false,
      logoIds: [
        'BA7EC8EA-6B52-E811-81A8-90824340DEC8', // Pews
        '0A9D5AFD-9709-E911-81A8-A25FC8B1A2FE', // Taimis
        '7D0DB7CC-02FE-E911-81AA-A77AA130EAB8', // Sams
        '4EC8BEAF-B669-EB11-81AC-95DFE50946EB', // Plorrt
      ]
    }
  },
  computed: {
    getLogo: function() {
      let guild = this.logoIds[Math.floor(Math.random()*this.logoIds.length)];
      return `https://emblem.werdes.net/emblem/${guild}`;
    }
  },
  methods: {
    login: function () {
      let token = this.token
      this.$store.dispatch('login', {token})
        .then(() => this.$router.push('/'))
        .catch(err => {
          this.isError = true;
        })
    },
    toggleHtmlClass: function(addRemoveClass, className) {
      const el = document.documentElement;

      if (addRemoveClass === 'addClass') {
        el.classList.add(...className);
      } else {
        el.classList.remove(...className);
      }
    },
  },
  mounted() {
    this.toggleHtmlClass('removeClass', ['has-aside-left', 'has-navbar-fixed-top']);
  },
  destroyed() {
    this.toggleHtmlClass('addClass', ['has-aside-left', 'has-navbar-fixed-top']);
  }
}
</script>

<style scoped>
    .avatar img {
      width: 128px;
      height: 128px;
    }
</style>