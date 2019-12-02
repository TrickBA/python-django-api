import Vue from "vue";

export default {
  getTeacherCourses(teacherId) {
    return Vue.prototype.$apiClient.get(`/courses/teacher?pcn=` + teacherId);
  },
  
};