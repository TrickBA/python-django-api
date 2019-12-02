import Vue from "vue";

export default {
  getGrades(student_id) {
    return Vue.prototype.$apiClient.get(`/tree?pcn=` + student_id);
    //
    // let exampleResponce2= {
    //   data:{
    //   "passed_semesters":[
    //     {
    //       "index":2,
    //       "start_date":"2020-02-15T16:53:45Z",
    //       "courses":[
    //         {
    //           "course_id":{
    //             "id":9126,
    //             "name":"Math",
    //             "description":"Role include total.\nDuring model medical operation",
    //             "credits":32333,
    //             "grades":[
    //               {
    //                 "evaluation_date":"2019-06-12T00:00:00Z",
    //                 "grade":"5"
    //               }
    //             ],
    //             "requirements":[
    //               {
    //                 "depends_on_course_id":{
    //                   "course_id":{
    //                     "id":16951,
    //                     "name":"PRC",
    //                     "description":"Product somebody suffer those employee war central",
    //                     "credits":4
    //                   }
    //                 },
    //                 "credits":3
    //               }
    //             ]
    //           },
    //         },
    //       ]
    //     }
    //   ],
    //   "future_semesters":[
    //     {
    //       "index":3,
    //       "start_date":"2020-02-15T16:53:45Z",
    //       "courses":[
    //         {
    //           "course_id":{
    //             "id":16951,
    //             "name":"PRC",
    //             "description":"Role include total.\nDuring model medical operation",
    //             "credits":4,
    //             "grades":[
    //               {
    //                 "evaluation_date":"2019-06-12T00:00:00Z",
    //                 "grade":"3.5"
    //               }
    //             ],
    //             "requirements":[
    //             ]
    //           },
    //         },
    //       ]
    //     }
    //   ]
    // }};

    //
    // return new Promise(function(resolve, reject) {
    //   setTimeout(function() {
    //     resolve(exampleResponce2);
    //   }, 300);
    // });
  },

  getAllStudents() {
    return Vue.prototype.$apiClient.get(`/students/`);
  },

  getStudentsPerCourseTeacher(teacherId, courseId){
    return Vue.prototype.$apiClient.get(`/students/course?pcn=` + teacherId + `;course_id=` + courseId);
  },

  getStudentsPerMentor(teacherId){
    return Vue.prototype.$apiClient.get(`/students/mentor?pcn=` + teacherId);
  },

  getStudent(studentNr){
    return Vue.prototype.$apiClient.get(`/students/` + studentNr);
  }
};
