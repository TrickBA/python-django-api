import TeacherService from "../../../services/TeacherService";

export const namespaced = true;

export const state = {
  subjects: [],
  selectedSubject: []
};

export const mutations = {
  SET_SUBJECTS(state, subjects) {
    state.subjects = subjects;
  },
  SET_SELECTED_SUBJECT(state, subject) {
    state.selectedSubject = subject;
  }
};

export const actions = {
  fetchSubjects({ commit }, { teacherId }) {
    return TeacherService.getTeacherCourses(teacherId).then(response => {
      commit("SET_SUBJECTS", response.data);
    });
  },

  changeSelectedSubject({ commit }, { subjectId }) {
    return commit("SET_SELECTED_COURSE", subjectId)
  }
};

export const getters = {

};