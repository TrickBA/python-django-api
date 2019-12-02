<template>
    <div>

        <div class="overview">
            <p>Percentage of Passed/Failed/Failed with 5 </p>
            <canvas ref="chart"></canvas>
        </div>


    </div>
</template>

<script>
  import Chart from 'chart.js';

  export default {
    name: "PassedFailedPieChartComponent",
    computed: {
      percentagesData: function () {
        return this.$store.state.grades.percentagesData;
      }
    }, methods: {
      createChart(data) {
        var chart = this.$refs.chart;
        var ctx = chart.getContext("2d");
        var myChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Failed', 'Passed', 'Failed with 5'],
            datasets: [{
              data: data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 206, 86, 0.2)',
              ]
            }],
            weight: 3,

          },
          options: {}
        });

      }
    },
    mounted(){
      this.$watch('percentagesData', (newValue, oldValue) => {
        if (newValue) {
          this.createChart(newValue);
        }
      });

    },
    // watch: {
    //   percentagesData: {
    //     immediate: true,
    //     deep: false,
    //     handler(newValue, oldValue) {
    //       if (newValue) {
    //         this.createChart(newValue);
    //       }
    //     }
    //   }
    // }
  }
</script>

<style scoped>

    .overview {
        margin-left: 300px;
        height: 600px !important;
        width: 600px !important;
        float: left;
        display: inline-block;

    }
</style>
