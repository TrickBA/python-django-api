<template>
    <div>
        <GradesOverviewBarChartComponent/>
        <div id="wrap">
            <ProgressLineChartComponent/>
            <PassedFailedPieChartComponent/>
            <faildCoursesTableComponent/>
        </div>

    </div>

</template>

<script>
    import GradesOverviewBarChartComponent from'../../components/Charts/GradesOverviewBarChartComponent';
    import ProgressLineChartComponent from'../../components/Charts/ProgressLineChartComponent';
    import PassedFailedPieChartComponent from'../../components/Charts/PassedFailedPieChartComponent';
    import faildCoursesTableComponent from'../../components/Charts/faildCoursesTableComponent';
    import { mapState } from "vuex";

    export default {
    name: "Dashboard",
      components: {
          GradesOverviewBarChartComponent,
          PassedFailedPieChartComponent,
          ProgressLineChartComponent,
          faildCoursesTableComponent
    },
    created(){
      this.$store.dispatch("grades/fetchGrades", { student_id: this.$route.params.pcn });
    },
    computed: {
      ...mapState(["grades"])
    }
  }
</script>

<style scoped>
        .wrap{
            display: inline-block;

        }
</style>
