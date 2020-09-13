<template>
  <div id="app">
    <nav-bar />
    <aside-menu :menu="menu" />
    <router-view :key="$route.fullPath" />
    <footer-bar />
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar'
import AsideMenu from '@/components/AsideMenu'
import FooterBar from '@/components/FooterBar'

export default {
  name: 'Home',
  components: {
    FooterBar,
    AsideMenu,
    NavBar
  },
  computed: {
    menu () {
      return [
        'General',
        [
          {
            to: '/',
            icon: 'desktop-mac',
            label: 'Dashboard'
          },
          {
            to: '/recruits',
            icon: 'account-plus',
            label: 'Recruits'
          },
          {
            to: '/ban',
            icon: 'account-cancel',
            label: 'Ban List'
          }
        ],
        'Guilds',
        [
          {
            // to: '/tables',
            label: 'Pewpew\'s Army',
            icon: 'account-group',
            // updateMark: true,
            menu: [
              {
                to: '/members/BA7EC8EA-6B52-E811-81A8-90824340DEC8',
                label: 'Members'
              },
              {
                to: '/treasury/BA7EC8EA-6B52-E811-81A8-90824340DEC8',
                label: 'Treasury'
              },
              {
                to: '/stash/BA7EC8EA-6B52-E811-81A8-90824340DEC8',
                label: 'Stash'
              },
              {
                to: '/logs/BA7EC8EA-6B52-E811-81A8-90824340DEC8',
                label: 'Logs'
              }
            ]
          },
          {
            // to: '/forms',
            label: 'Taimi\'s Army',
            icon: 'account-group',
            menu: [
              {
                to: '/members/0A9D5AFD-9709-E911-81A8-A25FC8B1A2FE',
                label: 'Members'
              },
              {
                to: '/treasury/0A9D5AFD-9709-E911-81A8-A25FC8B1A2FE',
                label: 'Treasury'
              },
              {
                to: '/stash/0A9D5AFD-9709-E911-81A8-A25FC8B1A2FE',
                label: 'Stash'
              },
              {
                to: '/logs/0A9D5AFD-9709-E911-81A8-A25FC8B1A2FE',
                label: 'Logs'
              }
            ]
          },
          {
            // to: '/profile',
            label: 'Sam\'s Army',
            icon: 'account-group',
            menu: [
              {
                to: '/members/7D0DB7CC-02FE-E911-81AA-A77AA130EAB8',
                label: 'Members'
              },
              {
                to: '/treasury/7D0DB7CC-02FE-E911-81AA-A77AA130EAB8',
                label: 'Treasury'
              },
              {
                to: '/stash/7D0DB7CC-02FE-E911-81AA-A77AA130EAB8',
                label: 'Stash'
              },
              {
                to: '/logs/7D0DB7CC-02FE-E911-81AA-A77AA130EAB8',
                label: 'Logs'
              }
            ]
          }
        ]
      ]
    }
  },
  created () {
    this.$store.commit('user', {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg'
    })
  }
}
</script>
