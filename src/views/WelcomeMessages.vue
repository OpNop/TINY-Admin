<template>
  <div>
    <title-bar :title-stack="titleStack">
      <router-link slot="right" to="/" class="button"> Dashboard </router-link>
    </title-bar>
    <section class="section is-main-section">
      <b-field label="Message">
        <b-input customClass="is-family-code has-fixed-size" maxlength="511" rows="21" cols="53" type="textarea" readonly value="THE GOLDEN RULES OF TINY
1) Only rep [TINY] while on an Asura.
2) Be nice to EVERYONE! Even bookahs!
3) No Politics, Religion, Excessive Profanity, or Drama in guild chats.

GUILD RATING of E10+
(Further rule details can be found on our websites and Discord)

LINKS
Website  - https://tinyarmy.org
Discord  - https://discord.com/invite/mMURv8N

Discord is the best place to keep updated
with the guild and is HIGHLY recommended.">
        </b-input>
      </b-field>
    </section>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar'

export default {
  name: 'WelcomeMessages',
  components: {
    TitleBar
  },
  computed: {
    titleStack() {
      return ['Admin', 'Welcome Messages']
    }
  }
}
</script>
