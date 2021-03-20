<template>
  <nav v-show="isNavBarVisible" id="navbar-main" class="navbar is-fixed-top">
    <div class="navbar-brand">
      <a
        class="navbar-item is-hidden-desktop"
        @click.prevent="menuToggleMobile"
      >
        <b-icon :icon="menuToggleMobileIcon" />
      </a>
      <div class="navbar-item field has-control no-left-space-touch">
        <member-search />
      </div>
    </div>
    <div class="navbar-brand is-right">
      <a
        class="navbar-item navbar-item-menu-toggle is-hidden-desktop"
        @click.prevent="menuNavBarToggle"
      >
        <b-icon :icon="menuNavBarToggleIcon" custom-size="default" />
      </a>
    </div>
    <div
      class="navbar-menu fadeIn animated faster"
      :class="{ 'is-active': isMenuNavBarActive }"
    >
      <div class="navbar-end">
        <nav-bar-menu class="has-divider has-user-avatar">
          <user-avatar />
          <div class="is-user-name">
            <span>{{ userName }}</span>
          </div>

          <div slot="dropdown" class="navbar-dropdown">
            <!-- <router-link
              to="/profile"
              class="navbar-item"
              exact-active-class="is-active"
            > -->
            <a class="navbar-item" @click="profile">
              <b-icon icon="account" custom-size="default" />
              <span>My Profile</span>
            </a>
            <!-- </router-link> -->
            <a class="navbar-item" @click="settings">
              <b-icon icon="settings" custom-size="default"></b-icon>
              <span>Settings</span>
            </a>
            <a class="navbar-item" @click="messages">
              <b-icon icon="email" custom-size="default"></b-icon>
              <span>Messages</span>
            </a>
            <hr class="navbar-divider" />
            <a class="navbar-item" @click="logout">
              <b-icon icon="logout" custom-size="default"></b-icon>
              <span>Log Out</span>
            </a>
          </div>
        </nav-bar-menu>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import NavBarMenu from '@/components/NavBarMenu'
import UserAvatar from '@/components/UserAvatar'
import MemberSearch from './MemberSearch.vue'

export default {
  name: 'NavBar',
  components: {
    UserAvatar,
    NavBarMenu,
    MemberSearch
  },
  data() {
    return {
      isMenuNavBarActive: false,
      userName: this.$store.getters.currentUser
    }
  },
  computed: {
    menuNavBarToggleIcon() {
      return this.isMenuNavBarActive ? 'close' : 'dots-vertical'
    },
    menuToggleMobileIcon() {
      return this.isAsideMobileExpanded ? 'backburger' : 'forwardburger'
    },
    ...mapState(['isNavBarVisible', 'isAsideMobileExpanded'])
  },
  methods: {
    menuToggleMobile() {
      this.$store.commit('asideMobileStateToggle')
    },
    menuNavBarToggle() {
      this.isMenuNavBarActive = !this.isMenuNavBarActive
    },
    profile() {
      this.$buefy.snackbar.open({
        message: 'Soon™',
        queue: false
      })
    },
    settings() {
      this.$buefy.snackbar.open({
        message: 'Soon™',
        queue: false
      })
    },
    messages() {
      this.$buefy.snackbar.open({
        message: 'Soon™',
        queue: false
      })
    },
    logout() {
      this.$store.dispatch('logout')
      this.$router.push({
        name: 'login'
      })
      this.$buefy.snackbar.open({
        message: 'You have been logged out.',
        queue: false
      })
    }
  }
}
</script>
