<template>
    <div class="process">
        <p class="text">Average grade per semester</p>
        <canvas class="process" ref="chart"></canvas>

    </div>
</template>

<script>
  import Chart from 'chart.js';
  export default {
    name: "ProgressLineChartComponent",
    computed: {
      averagePerSemester: function () {
        return this.$store.state.grades.averagePerSemester;
      }
    },
    mounted(){
      this.$watch('averagePerSemester', (newValue, oldValue) => {
        if (newValue.length !== 0) {
          let newDataset = [{
            data: [],
          }];
          newValue.forEach(function (semester) {
            newDataset[0].data.push({y:semester.average || 0,x:semester.semesterIndex});
          });
          this.createChart(newDataset);

        }
      });
    },
    methods:{
      createChart(dataset){
        var chart = this.$refs.chart;
        var ctx = chart.getContext("2d");
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'],
            datasets: dataset,
          },
          options: {
            legend: {
              display: false
            },
          }
        });

      }
    },
    // watch: {
    //   averagePerSemester: {
    //     immediate: true,
    //     deep: false,
    //     handler(newValue, oldValue) {
    //       if (newValue.length !== 0) {
    //         let newDataset = [{
    //           data: [],
    //         }];
    //         newValue.forEach(function (semester) {
    //           newDataset[0].data.push({y:semester.average || 0,x:semester.semesterIndex});
    //         });
    //         this.createChart(newDataset);
    //
    //       }
    //
    //
    //     }
    //   }
    // }
  }
</script>

<style scoped>

    .process {
        height: 400px !important;
        width: 450px !important;
        margin-right: 75px;
        float: right;
        display: inline-block;
    }

    .text {
        float: left;
        display: inline-block;
    }

</style>
