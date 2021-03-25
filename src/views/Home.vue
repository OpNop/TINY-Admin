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
        @header-icon-click="fillChartData"
      >
        <div v-if="defaultChart.chartData" class="chart-area">
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

      <card-component
        title="New Members"
        class="has-table has-mobile-sort-spaced"
      >
        <guild-member-table showGuild />
      </card-component>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import * as chartConfig from '@/components/Charts/chart.config'
import TitleBar from '@/components/TitleBar'
import Tiles from '@/components/Tiles'
import CardWidget from '@/components/CardWidget'
import CardComponent from '@/components/CardComponent'
import LineChart from '@/components/Charts/LineChart'
import GuildMemberTable from '@/components/GuildMemberTable'
import dayjs from 'dayjs'
import api from '@/services/api'
export default {
  name: 'Home',
  components: {
    GuildMemberTable,
    LineChart,
    CardComponent,
    CardWidget,
    Tiles,
    TitleBar
  },
  data() {
    return {
      defaultChart: {
        chartData: null,
        extraOptions: chartConfig.chartOptionsMain
      },
      chartData: [],
      members: 0,
      gold: 0
    }
  },
  computed: {
    titleStack() {
      return ['TINY', 'Dashboard']
    }
  },
  mounted() {
    this.loadGuildStatsAsync()
    //this.fillChartData()
  },
  methods: {
    loadGuildStatsAsync() {
      api.guildStats().then(r => {
        if (r.data) {
          this.members = r.data.current.members
          this.gold = r.data.current.gold
          this.chartData = r.data.historical
          this.loadChart()
        }
      })
    },
    loadChart() {
      this.defaultChart.extraOptions = {
        ...chartConfig.chartOptionsMain,
        type: 'line',
        scales: {
          yAxes: [
            {
              id: 'gold',
              type: 'linear',
              offset: true,
              position: 'right',
              gridLines: {
                display: false
              }
            },
            {
              id: 'members',
              type: 'linear',
              offset: true,
              grace: 1,
              position: 'left',
              ticks: {
                padding: 20,
                fontColor: '#9a9a9a'
              }
            }
          ]
        }
      }
      this.defaultChart.chartData = {
        labels: this.chartData.map(q => dayjs(q.time).format('MMM D')),
        datasets: [
          {
            label: 'Gold',
            yAxisID: 'gold',
            fill: false,
            borderColor: chartConfig.chartColors.default.gold,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.gold,
            pointBorderColor: 'rgba(255,255,255,0)',
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
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.members,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            label: 'Members',
            yAxisID: 'members',
            data: this.chartData.map(q => q.members)
          }
        ]
      }
    },
    randomChartData(n) {
      const data = []

      for (let i = 0; i < n; i++) {
        data.push(Math.round(Math.random() * 200))
      }

      return data
    },
    fillChartData() {
      this.defaultChart.chartData = {
        datasets: [
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9)
          },
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.info,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.info,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.info,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9)
          },
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.danger,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.danger,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.danger,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9)
          }
        ],
        labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09']
      }
    }
  }
}
</script>
