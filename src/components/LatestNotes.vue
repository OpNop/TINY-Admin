<template>
  <b-table
    :data="notes"
    ref="notes-table"
    detailed
    detail-key="date_created"
    detail-transition="fade"
    :show-detail-icon="true"
  >
    <b-table-column field="account" label="Account" v-slot="props">
      <router-link
        :to="{
          name: 'member.view',
          params: { account: props.row.account },
        }"
      >
        {{ props.row.account }}
      </router-link>
    </b-table-column>

    <b-table-column field="date" label="Date" centered v-slot="props">
      <date-format :date="props.row.date_created" />
    </b-table-column>

    <template #detail="props">
      <article class="media">
        <figure class="media-left">
          <p class="image is-48x48">
            <img
              class="is-rounded"
              :src="`https://cdn.discordapp.com/avatars/${props.row.id}/${props.row.avatar}.png`"
            />
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{ props.row.creator }}</strong>
              <br />
              <vue-markdown>
                {{ props.row.message }}
              </vue-markdown>
            </p>
          </div>
        </div>
      </article>
    </template>
  </b-table>
</template>

<script>
import api from "../services/api";
import DateFormat from "@/components/DateFormat";
import VueMarkdown from "vue-markdown";

export default {
  name: "LatestNotes",
  components: {
    DateFormat,
    VueMarkdown
  },
  data() {
    return {
      notes: []
    };
  },
  methods: {
    loadNotesAsync() {
      api.getLatestNotes(10).then(r => {
        if (r.data) {
          this.notes = r.data;
        }
      });
    }
  },
  mounted() {
    this.loadNotesAsync();
  }
};
</script>