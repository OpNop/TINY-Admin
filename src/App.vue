<template>
  <div id="app">
    <div
      v-if="this.$router.currentRoute.name !== 'login'"
      class="is-flex-desktop is-flex-direction-column site"
    >
      <nav-bar />
      <aside-menu :menu="menu" />
      <router-view class="site__content" :key="$route.fullPath" />
      <footer-bar />
    </div>
    <div v-if="this.$router.currentRoute.name == 'login'">
      <router-view class="login" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
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
          name: "Booboo's Tiny Army",
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
            icon: 'view-dashboard',
            label: 'Dashboard'
          },
          {
            to: '/ban',
            icon: 'account-cancel',
            label: 'Ban List'
          },
          {
            to: '/logs',
            icon: 'format-list-bulleted-square',
            label: 'All Logs'
          },
          {
            to: '/welcome',
            icon: 'human-greeting',
            label: 'Welcome Messages'
          }
        ],
        'Guilds',
        [
          {
            // to: `/${this.guilds.pew.guid}`,
            label: "Pewpew's Army",
            icon: 'account-group',
            // updateMark: true,
            menu: [
              {
                to: `/${this.guilds.pew.guid}/members`,
                label: 'Members',
                icon: 'blank',
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
                to: `/${this.guilds.pew.guid}/logs`,
                label: 'Logs',
                icon: 'blank',
              }
            ]
          },
          {
            // to: '/forms',
            label: "Taimi's Army",
            icon: 'account-group',
            menu: [
              {
                to: `/${this.guilds.taimi.guid}/members`,
                label: 'Members',
                icon: 'blank',
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
                to: `/${this.guilds.taimi.guid}/logs`,
                label: 'Logs',
                icon: 'blank',
              }
            ]
          },
          {
            // to: '/profile',
            label: "Sam's Army",
            icon: 'account-group',
            menu: [
              {
                to: `/${this.guilds.sam.guid}/members`,
                label: 'Members',
                icon: 'blank',
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
                to: `/${this.guilds.sam.guid}/logs`,
                label: 'Logs',
                icon: 'blank',
              }
            ]
          },
          {
            // to: '/profile',
            label: "Booboo's Army",
            icon: 'account-group',
            menu: [
              {
                to: `/${this.guilds.plorrt.guid}/members`,
                label: 'Members',
                icon: 'blank',
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
                to: `/${this.guilds.plorrt.guid}/logs`,
                label: 'Logs',
                icon: 'blank',
              }
            ]
          }
        ]
      ]
    }
  },
  methods:{
    focusSearch() {
      document.getElementById("memberSearch").focus();
    }
  },
  mounted() {
    this._keyListener = function(e) {
      if (e.key === '/') {
        e.preventDefault()
        this.focusSearch()
      }
    }
    document.addEventListener('keydown', this._keyListener.bind(this))
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this._keyListener)
  }
}
</script>
