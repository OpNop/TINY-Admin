<template>
  <div>
    <span v-if='gw2.g'>{{gw2.g}}<img src='https://render.guildwars2.com/file/090A980A96D39FD36FBB004903644C6DBEFB1FFB/156904.png'/> </span>
    <span v-if='gw2.s'>{{gw2.s}}<img src='https://render.guildwars2.com/file/E5A2197D78ECE4AE0349C8B3710D033D22DB0DA6/156907.png'/> </span>
    <span v-if='gw2.c'>{{gw2.c}}<img src='https://render.guildwars2.com/file/6CF8F96A3299CFC75D5CC90617C3C70331A1EF0E/156902.png'/> </span>
  </div>
</template>

<script>
export default {
  name: "GwGold",
  props: {
    value: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      newValue: 0,
      step: 0,
    };
  },
  computed: {
    gw2() {
      const c = this.newValue % 100,
        s = ~~((this.newValue % 10000) / 100),
        g = ~~((this.newValue % 100000000) / 10000);
        return {
          g:g,
          s:s,
          c
        }
    },
  },
  watch: {
    value() {
      this.growInit();
    },
  },
  mounted() {
    this.growInit();
  },
  methods: {
    growInit() {
      const m = this.value / (this.duration / 25);
      this.grow(m);
    },
    grow(m) {
      const v = Math.ceil(this.newValue + m);

      if (v > this.value) {
        this.newValue = this.value;
        return false;
      }

      this.newValue = v;
      setTimeout(() => {
        this.grow(m);
      }, 25);
    },
  },
};
</script>
