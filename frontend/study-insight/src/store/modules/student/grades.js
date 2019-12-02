import StudentService from "../../../services/StudentService";

export const namespaced = true;

export const state = {
  allData:[],
  gradesCourses: [],
  averagePerSemester:[],
  selectedCourse: {},
  treeNodesEdges:{
    nodes:[],
    edges:[]
  },
  treeNodesSelected:{
    nodes:[],
    edges:[]
  },
  percentagesData:null,
  selectedCourseId: -1,
  requirements: [],
  initialTreeNodesEdges:{
    nodes:[],
    edges:[]
  }
};

export const mutations = {
  SET_ALL_DATA(state, data) {
    state.allData = data;
  },
  SET_GRADES_COURSE(state, gradesCourses) {
    console.log(gradesCourses);
    state.gradesCourses = gradesCourses;
  },
  SET_AVERAGE_PER_SEMESTER(state, averages) {
    state.averagePerSemester = averages;
  },
  SET_TREE_NODES_EDGES(state, treeData) {
    state.treeNodesEdges = treeData;
  },
  SET_SELECTED_COURSE(state,selectedCourse){
    state.selectedCourse = selectedCourse;
  },
  SET_SELECTED_COURSE_ID(state, selectedCourseId){
    state.selectedCourseId = selectedCourseId;
  },
  SET_REQUIREMENTS(state, requirements){
    state.requirements = requirements;
  },
  SET_NEW_TREE_NODES_EDGES(state, newTreeData){
    state.treeNodesSelected = newTreeData;
    state.initialTreeNodesEdges = newTreeData;
  },
  SET_PERCENTAGES_DATA(state, percentagesData){
    state.percentagesData = percentagesData;
  },

};
export const actions = {
  fetchGrades({ commit }, { student_id }) {
    return StudentService.getGrades(student_id).then(response => {
        commit("SET_ALL_DATA", response.data);

        let gradesCourses = [];
        let averagePerSemester = [];

        let nodes=[];
        let edges=[];

        let passed=[];
        let failed=[];
        let failedWithFive=[];

        let requirements=[];

        for(let i=0; i<response.data.passed_semesters.length; i++){
          let averageObject={semesterIndex: response.data.passed_semesters[i].index, grades:[], average:-1};
          nodes.push({
            id: "S" + response.data.passed_semesters[i].index,
            label: "S" + response.data.passed_semesters[i].index,
            level: 0,
            group: "semestersGroup"
          });
          for(let a=0; a<response.data.passed_semesters[i].courses.length; a++){
            let gradeCourseObejct={
              semesterIndex: response.data.passed_semesters[i].index,
              semesterStatus: "passed",
              course: response.data.passed_semesters[i].courses[a],
              grades: response.data.passed_semesters[i].courses[a].course_id.grades,
              highestGrade: -1,
              status:""
            };
            requirements.push({
              course: response.data.passed_semesters[i].courses[a],
              relations: response.data.passed_semesters[i].courses[a].course_id.requirements
            });
            let maxGrade = -1;
            for(let k=0; k<response.data.passed_semesters[i].courses[a].course_id.grades.length; k++){
              if(Number(response.data.passed_semesters[i].courses[a].course_id.grades[k].grade)>maxGrade){
                maxGrade = Number(response.data.passed_semesters[i].courses[a].course_id.grades[k].grade);
              }
            }
            if(maxGrade!==-1){
              averageObject.grades.push(maxGrade);
              if(maxGrade>5.5){
                gradeCourseObejct.status="Passed";
                passed.push(maxGrade)
              } else if(maxGrade===5){
                gradeCourseObejct.status="Failed with 5";
                failedWithFive.push(maxGrade);
              } else {
                gradeCourseObejct.status="Failed";
                failed.push(maxGrade);
              }
              gradeCourseObejct.highestGrade=maxGrade;
            } else {
              gradeCourseObejct.status="Not taken yet";
            }
            gradesCourses.push(gradeCourseObejct);
            nodes.push({
              id: response.data.passed_semesters[i].courses[a].course_id.id,
              label: response.data.passed_semesters[i].courses[a].course_id.name,
              level: a+1,
              group: "defaultGroup"
            });

            if(a!==0){
              edges.push({
                from: response.data.passed_semesters[i].courses[a-1].course_id.id,
                to: response.data.passed_semesters[i].courses[a].course_id.id,
              })
            } else {
              edges.push({
                from: "S" + response.data.passed_semesters[i].index,
                to: response.data.passed_semesters[i].courses[a].course_id.id,
              })
            }

            if(i!==0){
              edges.push({
                from: "S" + response.data.passed_semesters[i-1].index,
                to: "S" + response.data.passed_semesters[i].index,
              })
            }
          }

          averagePerSemester.push(averageObject);
        }

      for(let i=0; i<response.data.future_semesters.length; i++){
        let averageObject={semesterIndex: response.data.passed_semesters[i].index, grades:[], average:-1};
        nodes.push({
          id: "S" + response.data.future_semesters[i].index,
          label: "S" + response.data.future_semesters[i].index,
          level: 0,
          group: "semestersGroup"
        });
        for(let a=0; a<response.data.future_semesters[i].courses.length; a++){
          let gradeCourseObject={
            semesterIndex: response.data.future_semesters[i].index,
            semesterStatus: "future",
            course: response.data.future_semesters[i].courses[a],
            grades: response.data.future_semesters[i].courses[a].course_id.grades,
            highestGrade: -1,
            status:""
          };
          requirements.push({
            course: response.data.future_semesters[i].courses[a],
            relations: response.data.future_semesters[i].courses[a].course_id.requirements
          });
          let maxGrade = -1;
          for(let k=0; k<response.data.future_semesters[i].courses[a].course_id.grades.length; k++){
            if(Number(response.data.future_semesters[i].courses[a].course_id.grades[k].grade)>maxGrade){
              maxGrade = Number(response.data.future_semesters[i].courses[a].course_id.grades[k].grade);
            }
          }
          if(maxGrade!==-1){
            averageObject.grades.push(maxGrade);
            if(maxGrade>5.5){
              gradeCourseObject.status = "Passed";
              passed.push(maxGrade)
            } else if(maxGrade===5){
              gradeCourseObject.status = "Failed with 5";
              failedWithFive.push(maxGrade);
            } else {
              gradeCourseObject.status = "Failed";
              failed.push(maxGrade);
            }
            gradeCourseObject.highestGrade=maxGrade;
          } else {
            gradeCourseObject.status = "Not taken yet";
          }
          gradesCourses.push(gradeCourseObject);
          nodes.push({
            id: response.data.future_semesters[i].courses[a].course_id.id,
            label: response.data.future_semesters[i].courses[a].course_id.name,
            level: a+1,
            group: "defaultGroup"
          });
          if(a!==0){
            edges.push({
              from: response.data.future_semesters[i].courses[a-1].course_id.id,
              to: response.data.future_semesters[i].courses[a].course_id.id,
            })
          } else {
            edges.push({
              from: "S" + response.data.future_semesters[i].index,
              to: response.data.future_semesters[i].courses[a].course_id.id,
            })
          }

        }
        averagePerSemester.push(averageObject);

        if(i===0){
          edges.push({
            from: "S" + response.data.passed_semesters[response.data.passed_semesters.length-1].index,
            to: "S" + response.data.future_semesters[i].index,
          })
        } else {
          edges.push({
            from: "S" + response.data.future_semesters[i-1].index,
            to: "S" + response.data.future_semesters[i].index,
          })
        }
      }

      let allCount = passed.length + failedWithFive.length + failed.length;
      let passedPercentage = passed.length/allCount*100;
      let failedWithFivePercentage = failedWithFive.length/allCount*100;
      let failedPercentage = failed.length/allCount*100;

      for(let i=0; i<averagePerSemester.length; i++){
        averagePerSemester[i].average = averagePerSemester[i].grades.reduce((a, b) => a + b, 0)/averagePerSemester[i].grades.length;
      }
      let treeData={
        nodes: nodes,
        edges: edges
      };

      let percentagesData = [failedPercentage, passedPercentage, failedWithFivePercentage];

      commit("SET_ALL_DATA", response.data);
      commit("SET_GRADES_COURSE", gradesCourses);
      commit("SET_AVERAGE_PER_SEMESTER", averagePerSemester);
      commit("SET_TREE_NODES_EDGES", treeData);
      commit("SET_PERCENTAGES_DATA", percentagesData);
      commit("SET_REQUIREMENTS", requirements);

      localStorage.setItem("treeNodesEdgesInitial", JSON.stringify(treeData.edges));



    });
  },

  changeEdgesAndNodes({ commit }, { selectedCourseId }) {
    console.log(state.initialTreeNodesEdges.edges);
    let newNodes=[];
    let newEdges=[];
    // newEdges=state.treeNodesEdges.edges;
    newEdges = JSON.parse(localStorage.getItem("treeNodesEdgesInitial"));
    let relationsIds =[];

    for(let i=0; i<state.requirements.length; i++){
      if(state.requirements[i].course.course_id.id===selectedCourseId){
        for(let a=0; a<state.requirements[i].relations.length; a++){
          if(state.requirements[i].relations[a].depends_on_course_id!=undefined)
            relationsIds.push(state.requirements[i].relations[a].depends_on_course_id.id);
        }
      }
    }

    for (let i=0; i<state.treeNodesEdges.nodes.length; i++){
      var foundCourse = state.gradesCourses.find(group => group.course.course_id.id === state.treeNodesEdges.nodes[i].id);
      let groupName="defaultGroup";
      if(foundCourse==null || !foundCourse){
        groupName="semestersGroup";
      } else {
        if(foundCourse.status==="Passed"){
          groupName="passedGroup";
        } else if(foundCourse.status==="Failed"){
          groupName="failedGroup";
        } else if(foundCourse.status==="Failed with 5"){
          groupName="failedWithFiveGroup";
        } else {
          groupName="notTakenGroup";
        }
      }
      let isNodeAdded = false;
      if(state.treeNodesEdges.nodes[i].id===selectedCourseId){
        newNodes.push({
          id: selectedCourseId,
          label: state.treeNodesEdges.nodes[i].label,
          level: state.treeNodesEdges.nodes[i].level,
          group:groupName
        });
        isNodeAdded = true;
      } else {
        for(let k=0; k<relationsIds.length; k++){
          if(relationsIds[k]===state.treeNodesEdges.nodes[i].id){
            newNodes.push({
              id: relationsIds[k],
              label: state.treeNodesEdges.nodes[i].label,
              level: state.treeNodesEdges.nodes[i].level,
              group:groupName
            });
            isNodeAdded = true;
          }
        }
      }
      if(!isNodeAdded){
        if(groupName!=="semestersGroup"){
          groupName="defaultGroup"
        }
        newNodes.push({
          id: state.treeNodesEdges.nodes[i].id,
          label: state.treeNodesEdges.nodes[i].label,
          level: state.treeNodesEdges.nodes[i].level,
          group:groupName
        });
      }
    }

    for(let i=0; i<relationsIds.length; i++){
      newEdges.push({
        from: selectedCourseId,
        to: relationsIds[i]
      })
    }

    let newTreeData={
      nodes: newNodes,
      edges: newEdges
    };

    commit("SET_NEW_TREE_NODES_EDGES", newTreeData);

  },

  changeSelectedCourseId({ commit }, { selectedCourseId }) {
    return commit("SET_SELECTED_COURSE_ID", selectedCourseId);
  },

  fetchCourse({ commit, getters }) {
    var course = getters.getCourseById(state.selectedCourseId);
    if (course) {
      commit("SET_SELECTED_COURSE", course);
      return course;
    } else {
      return null;
  }
}
};

export const getters = {
  getCourseById: state => id => {
    return state.gradesCourses.find(group => group.course.course_id.id === id);
  }
};
