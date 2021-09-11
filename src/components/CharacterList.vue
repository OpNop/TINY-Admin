<template>
  <div>
    <b-table
      :striped="true"
      :hoverable="true"
      default-sort="name"
      default-sort-direction="asc"
      :data="characters"
    >
      <b-table-column
        label="Name"
        field="name"
        width="auto"
        sortable
        v-slot="props"
      >
        {{ props.row.name }}
      </b-table-column>
      <b-table-column
        label="Race"
        field="race"
        width="auto"
        sortable
        v-slot="props"
      >
        {{ props.row.race }}
      </b-table-column>
      <b-table-column
        label="Created"
        field="created"
        width="auto"
        sortable
        v-slot="props"
      >
        <date-format :date="props.row.created" />
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
import CardComponent from "@/components/CardComponent";
import DateFormat from "@/components/DateFormat";
export default {
  name: "CharacterList",
  components: {
    CardComponent,
    DateFormat
  },
  props: {
    characters: {
      type: Array,
      default: null
    }
  }
};
</script>