import StudentService from "../../../services/StudentService";

export const namespaced = true;

export const state = {
  studentsAll: [],
  studentsPerCourse: [],
  studentsPerMentor: [],
  selectedStudent: []
};

export const mutations = {
  SET_STUDENTS(state, students) {
    state.studentsAll = students;
  },
  SET_STUDENTS_PER_COURSE(state, students) {
    state.studentsPerCourse = students;
  },
  SET_STUDENTS_PER_MENTOR(state, students) {
    state.studentsPerMentor = students;
  },
  SET_SELECTED_STUDENT(state, student) {
    state.selectedStudent = student;
  }
};
export const actions = {

  fetchStudentAll({ commit }) {
    return StudentService.getAllStudents().then(response => {
      commit("SET_STUDENTS", response.data);
    });
  },

  fetchStudentPerCourse({ commit }, { teacherId, courseId }) {
    return StudentService.getStudentsPerCourseTeacher(teacherId, courseId).then(response => {
      commit("SET_STUDENTS_PER_COURSE", response.data);
    });
  },

  fetchStudentPerMentor({ commit }, { teacherId }) {
    return StudentService.getStudentsPerMentor(teacherId).then(response => {
      commit("SET_STUDENTS_PER_MENTOR", response.data);
    });
  },

  fetchStudent({ commit }, { studentId }) {
    return StudentService.getStudent(studentId).then(response => {
      commit("SET_SELECTED_STUDENT", response.data);
    });
  },

  changeSelectedStudent({ commit }, { studentId }) {
    return commit("SET_SELECTED_STUDENT", studentId)
  }
};

export const getters = {

};

