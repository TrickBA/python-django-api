<template>
<div class="row justify-content-center">
    <div class="col-6" style="border:1px solid #cecece;">
        <div class="container">
            <h3><label>Subjects</label></h3>
            <div class="form-inline row" v-for="subject in subjects.subjects" v-bind:key="subject.id">
                <div class="col-sm" style="border:1px solid #cecece; margin: 3px;" @click="fetchStudentPerCourse(subject.id)">

                        {{ subject.name }}
                </div>
            </div>
        </div>
    </div>
    <div class="col-6" style="border:1px solid #cecece;">
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
    </div>
</div>

</template>

<script>
    import IndividualStudentComponent from "../student/IndividualStudentComponent";
    import { mapState } from "vuex";
    export default {
        name: "IndividualSubjectComponent",
        created(){
            this.$store.dispatch("subjects/fetchSubjects", { teacherId: this.user.pcn })
        },
        props: {
            user: {
                type: Object,
                required: true
            }
        },
        data: function () {
            return {
                search: ''
            };
        },
        methods: {
            fetchStudentPerCourse(id) {
                this.$store
                .dispatch("students/fetchStudentPerCourse", {
                  teacherId: this.user.pcn,
                  courseId: id
                });
            }
        },
        computed: {
         ...mapState(["subjects", "students"]),

            filteredStudents: function () {
                return this.$store.state.students.studentsPerCourse.filter((student) => {
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