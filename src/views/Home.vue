<template>
  <div>
    <title-bar :title-stack="titleStack" :has-right-visible="false" />
    <section class="section is-main-section">
      <tiles>
        <card-widget
          class="tile is-child"
          type="is-primary"
          icon="account-multiple"
          :number="members"
          label="Members"
        />
        <card-widget
          class="tile is-child"
          type="is-info"
          icon="cart-outline"
          :number="gold"
          label="Guild Funds"
          isGold
        />
        <card-widget
          class="tile is-child"
          type="is-success"
          icon="chart-timeline-variant"
          :number="256"
          suffix=" Ankle(s)"
          label="Bookah Ankles Stabbed"
        />
      </tiles>
          <card-component
            title="Performance"
            icon="finance"
            header-icon="reload"
            @header-icon-click="loadGuildStatsAsync"
          >
            <div v-if="defaultChart.chartData" class="chart-area">
              <b-field grouped group-multiline position="is-right">
                <b-select @input="loadGuildStatsAsync()" v-model="statsLimit">
                  <option value="7">1 Week</option>
                  <option value="14">2 Weeks</option>
                  <option value="21">3 Weeks</option>
                  <option value="30">1 Month</option>
                  <option value="90">3 Months</option>
                  <option value="180">6 Months</option>
                  <option value="365">1 year</option>
                </b-select>
              </b-field>
              <line-chart
                ref="bigChart"
                style="height: 100%"
                chart-id="big-line-chart"
                :chart-data="defaultChart.chartData"
                :extra-options="defaultChart.extraOptions"
              >
              </line-chart>
            </div>
          </card-component>
        <div class="columns is-multiline">
          <div class="column is-three-fifths-widescreen is-full-tablet">
            <card-component
              title="New Members"
              class="has-table has-mobile-sort-spaced"
            >
              <guild-member-table showGuild />
            </card-component>
          </div>
          <div class="column is-two-fifths-widescreen is-full-tablet">
            <card-component
                title="Latest notes"
                class="has-table has-mobile-sort-spaced"
              >
              <latest-notes />
            </card-component>
          </div>
        </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import * as chartConfig from "@/components/Charts/chart.config";
import TitleBar from "@/components/TitleBar";
import Tiles from "@/components/Tiles";
import CardWidget from "@/components/CardWidget";
import CardComponent from "@/components/CardComponent";
import LineChart from "@/components/Charts/LineChart";
import GuildMemberTable from "@/components/GuildMemberTable";
import dayjs from "dayjs";
import api from "@/services/api";
import LatestNotes from '@/components/LatestNotes.vue';
export default {
  name: "Home",
  components: {
    GuildMemberTable,
    LineChart,
    CardComponent,
    CardWidget,
    Tiles,
    TitleBar,
    LatestNotes
  },
  data() {
    return {
      defaultChart: {
        chartData: null,
        extraOptions: chartConfig.chartOptionsMain
      },
      chartData: [],
      members: 0,
      gold: 0,
      statsLimit: 21
    };
  },
  computed: {
    titleStack() {
      return ["TINY", "Dashboard"];
    }
  },
  mounted() {
    this.loadGuildStatsAsync();
  },
  methods: {
    loadGuildStatsAsync() {
      api.guildStats(this.statsLimit).then(r => {
        if (r.data) {
          this.members = r.data.current.members;
          this.gold = r.data.current.gold;
          this.chartData = r.data.historical;
          this.loadChart();
        }
      });
    },
    loadChart() {
      this.defaultChart.extraOptions = {
        ...chartConfig.chartOptionsMain,
        type: "line",
        scales: {
          yAxes: [
            {
              id: "gold",
              type: "linear",
              offset: true,
              position: "right",
              gridLines: {
                display: false
              }
            },
            {
              id: "members",
              type: "linear",
              offset: true,
              grace: 1,
              position: "left",
              ticks: {
                padding: 20,
                fontColor: "#9a9a9a"
              }
            }
          ]
        }
      };
      this.defaultChart.chartData = {
        labels: this.chartData.map(q => dayjs(q.time).format("MMM D")),
        datasets: [
          {
            label: "Gold",
            yAxisID: "gold",
            fill: false,
            borderColor: chartConfig.chartColors.default.gold,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.gold,
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: chartConfig.chartColors.default.gold,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.chartData.map(q => q.gold / 10000)
          },
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.members,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.members,
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: chartConfig.chartColors.default.members,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            label: "Members",
            yAxisID: "members",
            data: this.chartData.map(q => q.members)
          }
        ]
      };
    }
  }
};
</script>
