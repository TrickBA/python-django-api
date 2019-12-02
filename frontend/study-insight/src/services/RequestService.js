import Vue from "vue";

export default {
  getStudentRequests(pcn) {
    return Vue.prototype.$apiClient.get(`/requests/student/` + pcn + `/`);
  },

  postStudentRequest(request) {
    console.log(request);
    return Vue.prototype.$apiClient.post('/requests/', request);
  },

  getTeacherRequests(teacherId){
    return Vue.prototype.$apiClient.get(`/requests/mentor/` + teacherId + `/`);
  },

  approveRequestByMentor(requestId) {
    return Vue.prototype.$apiClient.get(`/requests/mentor/` + requestId + `/approve/`);
  },

  rejectRequestByMentor(requestId) {
    return Vue.prototype.$apiClient.get(`/requests/mentor/` + requestId + `/reject/`);
  },

  getExamboardRequests(examBoardId){
    return Vue.prototype.$apiClient.get(`/requests/examboard/all/`);
  },

  approveRequestByExamboard(requestId) {
    return Vue.prototype.$apiClient.get(`/requests/examboard/` + requestId + `/approve/`);
  },

  rejectRequestByExamboard(requestId) {
    return Vue.prototype.$apiClient.get(`/requests/examboard/` + requestId + `/reject/`);
  },


};