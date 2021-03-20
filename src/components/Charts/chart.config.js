export const chartColors = {
  default: {
    members: '#00D1B2',
    gold: '#FFBF00',
    danger: '#FF3860'
  }
}

export const baseChartOptions = {
  maintainAspectRatio: false,
  legend: {
    display: true
  },
  responsive: true
}

export const chartOptionsMain = {
  ...baseChartOptions,
  tooltips: {
    backgroundColor: '#3e3e3e',
    titleFontColor: '#ddd',
    bodyFontColor: '#ccc',
    bodySpacing: 4,
    xPadding: 12,
    mode: 'nearest',
    intersect: 0,
    position: 'nearest'
  },
  scales: {
    yAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: 'rgba(29,140,248,0.0)',
          zeroLineColor: 'transparent'
        },
        ticks: {
          padding: 20,
          fontColor: '#9a9a9a'
        }
      }
    ],

    xAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: 'rgba(225,78,202,0.1)',
          zeroLineColor: 'transparent'
        },
        ticks: {
          padding: 20,
          fontColor: '#9a9a9a'
        }
      }
    ]
  }
}
