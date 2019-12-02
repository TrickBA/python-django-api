import Vue from "vue";
import Vuex from "vuex";
import * as navigation from "./modules/navigation/navigation.js";
import * as grades from "./modules/student/grades.js";
import * as studentRequests from "./modules/student/studentRequests.js";
import * as teacherRequests from "./modules/teacher/teacherRequests.js";
import * as students from "./modules/teacher/students.js";
import * as subjects from "./modules/teacher/subjects.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: {
    navigation,
    studentRequests,
    grades,
    teacherRequests,
    students,
    subjects
  }
});