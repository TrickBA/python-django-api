<template>

    <div class="container">
        <div class="well">
            <form class="form-inline row">
                <div class="col-12">
                    <div class="row">
                        <div class="col-3">
                            <h3 style="padding-top:10px;"><label>Student</label></h3>
                        </div>
                        <div class="col-8">
                            <div class="search row" style="">
                                <input type="text" v-model="search" class="form-control col-12" placeholder="Student name" style="margin:10px;">
                            </div>
                        </div>
                        <div class="col-1"></div>
                    </div>
                </div>

            </form>
        </div>
        <ul style="padding: 0">
            <li v-for="student in filteredStudents" class="list-group-item" v-bind:key="student.pcn">
                <router-link :to="{name: 'studentDashboard', params:{ pcn: student.pcn }}">
                    <IndividualStudentComponent>
                        <img src="./../../assets/img/default-user.jpg" class="rounded-circle"
                             style="width: 1em; height: 1em;">
                        {{student.first_name}} {{student.last_name}}
                    </IndividualStudentComponent>
                </router-link>
            </li>
        </ul>
    </div>

</template>

<script>
    import IndividualStudentComponent from "../student/IndividualStudentComponent";
    import { mapState } from "vuex";
    export default {
        name: "SearchStudentComponent",
        props: {
            user: {
                type: Object,
                required: true
            }
        },
        created(){
            if (this.user.is_exam_board)
                this.$store.dispatch("students/fetchStudentAll");
            if(this.user.is_mentor)
                this.$store.dispatch("students/fetchStudentPerMentor", { teacherId: this.user.pcn });
        },
        data: function () {
            return { search: '' };
        },
        computed: {
        ...mapState(["students"]),
            relatedStudents: function(){
                if (this.user.is_mentor)
                    return this.$store.state.students.studentsPerMentor;
                if(this.user.is_exam_board)
                    return this.$store.state.students.studentsAll;
            },
            filteredStudents: function () {
                return this.relatedStudents.filter((student) => {
                    return (student.first_name + student.last_name).toLowerCase().match(this.search.toLowerCase())
                });
            }
        },
        components: {
            IndividualStudentComponent
        }
    }
</script>

<style scoped>
    .search input[type=text] {
        float: right;
        padding: 6px;
        margin-left: 15px;
        font-size: 17px;
    }
</style>
