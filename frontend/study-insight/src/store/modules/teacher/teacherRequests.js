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

  approveRequest({commit, rootState, dispatch}, {requestId}) {
    return RequestService.approveRequestByMentor(requestId);
  },

  denyRequest({commit, rootState, dispatch}, {requestId}) {
    return RequestService.rejectRequestByMentor(requestId);
  },

  fetchRequests({ commit, dispatch, state }, { teacher_id }) {
    return RequestService.getTeacherRequests(teacher_id)
      .then(response => {
        commit('SET_REQUESTS', response.data)
      })
  },

  approveRequestExamboard({commit, rootState, dispatch}, {requestId}) {
    return RequestService.approveRequestByExamboard(requestId);
  },

  denyRequestExamboard({commit, rootState, dispatch}, {requestId}) {
    return RequestService.rejectRequestByExamboard(requestId);
  },

  fetchRequestsExamboard({ commit, dispatch, state }) {
    return RequestService.getExamboardRequests()
      .then(response => {
        commit('SET_REQUESTS', response.data)
      })
  },
};

export const getters = {

};