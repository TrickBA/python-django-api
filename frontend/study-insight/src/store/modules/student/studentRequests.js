import RequestService from "../../../services/RequestService";

export const namespaced = true;

export const state = {
  requests: [],
  selectedRequest: [],

};

export const mutations = {
  SET_REQUESTS(state, requests) {
    state.requests = requests;
  },
  SET_SELECTED_REQUEST(state, request) {
    state.selectedRequest = request;
  }
};
export const actions = {

  createRequest({commit, rootState, dispatch}, {request}) {
    if(request.request_description===""){
      request.request_description = "No description"
    }
    return RequestService.postStudentRequest(request);
  },

  fetchRequests({ commit, dispatch, state }, {student_id}) {
    return RequestService.getStudentRequests(student_id)
      .then(response => {
        console.log(response.data);
        commit('SET_REQUESTS', response.data)
      })
  },
};

export const getters = {

};