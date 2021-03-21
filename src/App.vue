<template>
  <div id="app">
    <div v-if="this.$router.currentRoute.name !== 'login'">
      <nav-bar />
      <aside-menu :menu="menu" />
      <router-view :key="$route.fullPath" />
      <footer-bar />
    </div>
    <div v-if="this.$router.currentRoute.name == 'login'">
      <router-view class="login" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import NavBar from '@/components/NavBar'
import AsideMenu from '@/components/AsideMenu'
import FooterBar from '@/components/FooterBar'

export default {
  name: 'Home',
  data() {
    return {
      guilds: {
        pew: {
          name: "Pewpew's Tiny Army",
          guid: 'BA7EC8EA-6B52-E811-81A8-90824340DEC8'
        },
        taimi: {
          name: "Taimi's Tiny Army",
          guid: '0A9D5AFD-9709-E911-81A8-A25FC8B1A2FE'
        },
        sam: {
          name: "Samayou's Tiny Army",
          guid: '7D0DB7CC-02FE-E911-81AA-A77AA130EAB8'
        },
        plorrt: {
          name: "Plorrt's Tiny Army",
          guid: '4EC8BEAF-B669-EB11-81AC-95DFE50946EB'
        }
      }
    }
  },
  components: {
    FooterBar,
    AsideMenu,
    NavBar
  },
  computed: {
    menu() {
      return [
        'General',
        [
          {
            to: '/',
            icon: 'desktop-mac',
            label: 'Dashboard'
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
            label: "Pewpew's Army",
            icon: 'account-group',
            // updateMark: true,
            menu: [
              {
                to: `/members/${this.guilds.pew.guid}`,
                label: 'Members'
              },
              // {
              //   to: `/treasury/${this.guilds.pew.guid}`,
              //   label: 'Treasury'
              // },
              // {
              //   to: `/stash/${this.guilds.pew.guid}`,
              //   label: 'Stash'
              // },
              {
                to: `/logs/${this.guilds.pew.guid}`,
                label: 'Logs'
              }
            ]
          },
          {
            // to: '/forms',
            label: "Taimi's Army",
            icon: 'account-group',
            menu: [
              {
                to: `/members/${this.guilds.taimi.guid}`,
                label: 'Members'
              },
              // {
              //   to: `/treasury/${this.guilds.taimi.guid}`,
              //   label: 'Treasury'
              // },
              // {
              //   to: `/stash/${this.guilds.taimi.guid}`,
              //   label: 'Stash'
              // },
              {
                to: `/logs/${this.guilds.taimi.guid}`,
                label: 'Logs'
              }
            ]
          },
          {
            // to: '/profile',
            label: "Sam's Army",
            icon: 'account-group',
            menu: [
              {
                to: `/members/${this.guilds.sam.guid}`,
                label: 'Members'
              },
              // {
              //   to: `/treasury/${this.guilds.sam.guid}`,
              //   label: 'Treasury'
              // },
              // {
              //   to: `/stash/${this.guilds.sam.guid}`,
              //   label: 'Stash'
              // },
              {
                to: `/logs/${this.guilds.sam.guid}`,
                label: 'Logs'
              }
            ]
          },
          {
            // to: '/profile',
            label: "Plorrt's Army",
            icon: 'account-group',
            menu: [
              {
                to: `/members/${this.guilds.plorrt.guid}`,
                label: 'Members'
              },
              // {
              //   to: `/treasury/${this.guilds.plorrt.guid}`,
              //   label: 'Treasury'
              // },
              // {
              //   to: `/stash/${this.guilds.plorrt.guid}`,
              //   label: 'Stash'
              // },
              {
                to: `/logs/${this.guilds.plorrt.guid}`,
                label: 'Logs'
              }
            ]
          }
        ]
      ]
    }
  },
  created () {
    axios.defaults.headers.common['Authorization'] = this.$store.state.token;
  }
}
</script>
