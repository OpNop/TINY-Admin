<template>
  <footer v-show="isFooterBarVisible" class="footer">
    <div class="container-fluid">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="footer-copyright">
              <b>&copy; {{ year }}, TinyArmy.org</b> &mdash; Tiny Admin
              <span class="tag">v{{version}}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </footer>
</template>

<script>
import dayjs from 'dayjs'
import { mapState } from 'vuex'
import {version} from '/package.json';

export default {
  name: 'FooterBar',
  computed: {
    year () {
      return dayjs().year()
    },
    version() {
      return version;
    },
    ...mapState(['isFooterBarVisible'])
  }
}
</script>
