<template>
    <div id="content">
        <div class="grades">
            <p> Grades overview per subject</p>
            <canvas ref="chart"></canvas>
            <br>
        </div>
        <br>
        <br>
        <br>
        <br>
    </div>
</template>

<script>

  import Chart from 'chart.js';
  import {mapState} from "vuex";

  export default {
    name: "GradesOverviewBarChartComponent",
    computed: {
      ...mapState(["grades"]),
      gradesCourses: function () {
        return this.$store.state.grades.gradesCourses;
      },
    },
    methods: {
      createChart(courseNames, grades) {
        let barChartData = {
          labels: courseNames,
          datasets: []
        };

        grades.forEach(function (grade) {
          let colors=[];
          grade.forEach(function (grade) {
            if(grade===5){
              colors.push("#FFF59D")
            } else if(grade>5.5) {
              colors.push("#AED581");
            } else {
              colors.push("#FF8A80");
            }
          });
          barChartData.datasets.push(
            {
              backgroundColor: colors,
              borderColor: "white",
              borderWidth: 1,
              data: grade
            });
        });

        var chart = this.$refs.chart;
        var ctx = chart.getContext("2d");
        new Chart(ctx, {
          type: 'bar',
          data: barChartData,
          options: {
            legend: {
              display: false
            },
            tooltips: {
              mode: 'index',
              intersect: false
            },
            responsive: true,
            scales: {
              yAxes: [{
                stacked: true,
                ticks: {
                  beginAtZero: true
                }
              }],
              xAxes: [{
                stacked: true,
                ticks: {
                  beginAtZero: true
                }
              }],
            }
          }
        });
      }
    },
    mounted() {
      this.$watch('gradesCourses', (newValue, oldValue) => {
        if (newValue.length !== 0) {
          let courseNames = [];
          let grades = [];
          let maxCount = 0;
          for (var j = 0; j < newValue.length; j++) {
            courseNames.push(newValue[j].course.course_id.name);
            if (maxCount < newValue[j].course.course_id.grades.length) {
              maxCount = newValue[j].course.course_id.grades.length;
            }
          }

          for (var k = 0; k < maxCount; k++) {
            grades.push(new Array(newValue.length).fill(0));
          }

          for (var e = 0; e < newValue.length; e++) {
            for (var i = 0; i < newValue[e].course.course_id.grades.length; i++) {
              grades[i][e] = newValue[e].course.course_id.grades[i].grade;
            }
          }
          this.createChart(courseNames, grades);
        }
      });
    },
    // watch: {
    //   gradesCourses: {
    //     immediate: true,
    //     deep: false,
    //     handler(newValue, oldValue) {
    //       if (newValue.length !== 0) {
    //         let courseNames = [];
    //         let grades = [];
    //         let maxCount = 0;
    //         for (var j = 0; j < newValue.length; j++) {
    //           courseNames.push(newValue[j].course.course_id.name);
    //           if (maxCount < newValue[j].course.course_id.grades.length) {
    //             maxCount = newValue[j].course.course_id.grades.length;
    //           }
    //         }
    //
    //         for (var k = 0; k < maxCount; k++) {
    //           grades.push(new Array(newValue.length).fill(0));
    //         }
    //
    //         for (var e = 0; e < newValue.length; e++) {
    //           for (var i = 0; i < newValue[e].course.course_id.grades.length; i++) {
    //             grades[i][e] = newValue[e].course.course_id.grades[i].grade;
    //           }
    //         }
    //         this.createChart(courseNames, grades);
    //       }
    //     }
    //   }
    // }
  }
</script>

<style scoped>

    .grades {
        height: 400px !important;
        width: 900px !important;
        margin-left: 150px;

    }

    #content {
        margin: auto;
        width: 1024px;
        background-color: #FFFFFF;
        padding: 20px;
    }

</style>
