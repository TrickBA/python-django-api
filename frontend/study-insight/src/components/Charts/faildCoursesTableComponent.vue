<template>
    <table class="table-failed">
        <tr>
            <th>Subject</th>
            <th>Grade</th>
        </tr>
        <tr v-for="failedSubject in gradesCourses">
            <td v-if="failedSubject.highestGrade < 6 && failedSubject.highestGrade !==-1">{{failedSubject.course.course_id.name}}</td>
            <td v-if="failedSubject.highestGrade < 6 && failedSubject.highestGrade !==-1">{{failedSubject.highestGrade}}</td>
        </tr>
    </table>
</template>

<script>
  export default {
    name: "faildCoursesTableComponent",
    computed: {
      gradesCourses: function () {
        return this.$store.state.grades.gradesCourses;
      }
    }
  }
</script>


<style scoped>
    .table-failed {
        float: left;
        width: 1024px;
        position: relative;
        margin-left: 320px !important;
        padding-bottom: -35px;
    }

    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    td, th {
        border: 1px solid #dddddd;
        text-align: center;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #dddddd;
    }
</style>
