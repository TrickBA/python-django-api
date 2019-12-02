<template>
    <div v-if="userObject">
<!--        <p>StudentNumber: {{userObject.student_number}}</p>-->
<!--        <p>Name: {{userObject.first_name}}</p>-->
<!--        <p>Surname: {{userObject.last_name}}</p>-->
<!--        <p>Email: {{userObject.email}}</p>-->
<!--        <p>Class: {{userObject.class_id.name}}</p>-->
<!--        <p>PCN: {{userObject.pcn}}</p>-->
<!--        <p>Mentor: {{userObject.mentor_id.first_name}} {{userObject.mentor_id.last_name}}</p>-->
    </div>

</template>

<script>
  import axios from 'axios';
  import router from "../router";
  import { mapState } from "vuex";

  export default {
    name: "Login",
    data() {
      return {
        fhictPerson: 0,
        token: 0,
        userObject: 0
      }
    },
    computed: {
      ...mapState(["navigation"])
    },
    mounted() {
      let that = this;
      let data = that.getFragments(that.$route.hash);
      that.token = data.access_token;
      that.getPerson().then(function () {
        that.parsePersonResponse().then(function (response) {
          that.userObject = response.data;
          const parsed = JSON.stringify(response.data);
          localStorage.setItem('user', parsed);
          if(response.data.is_mentor!=undefined && response.data.is_exam_board!=undefined){
            if(response.data.is_mentor==0){
                if(response.data.is_exam_board==0){
                  localStorage.setItem('userStatus', 'teacher')
                } else {
                  localStorage.setItem('userStatus', 'examboard')
                }
            } else {
              localStorage.setItem('userStatus', 'mentor')
            }
          } else {
            localStorage.setItem('userStatus', 'student');
          }
          let status = localStorage.getItem('userStatus');
          that.$store
            .dispatch("navigation/changeNavigationItems", {
              status: status
            }).then(()=>{
            if(status === 'student'){
              router.push({ path: `/student/progress/` +  response.data.pcn});
            } else {
              router.push({ path: `/teacher/dashboard/`+response.data.pcn });
            }
          });


        });
      });
    },
    methods: {
      getFragments(hash) {
        if (hash.indexOf("#") === 0) {
          return this.parseQueryString(window.location.hash.substr(1));
        } else {
          return {};
        }
      },
      parseQueryString(queryString) {
        let data = {}, pairs, pair, separatorIndex, escapedKey, escapedValue, key, value;

        if (queryString === null) {
          return data;
        }

        pairs = queryString.split("&");

        for (let i = 0; i < pairs.length; i++) {
          pair = pairs[i];
          separatorIndex = pair.indexOf("=");

          if (separatorIndex === -1) {
            escapedKey = pair;
            escapedValue = null;
          } else {
            escapedKey = pair.substr(0, separatorIndex);
            escapedValue = pair.substr(separatorIndex + 1);
          }

          key = decodeURIComponent(escapedKey);
          value = decodeURIComponent(escapedValue);

          if (key.substr(0, 1) === '/')
            key = key.substr(1);

          data[key] = value;
        }

        return data;
      },
      getPerson() {
        return axios
          .get(
            'https://api.fhict.nl/people/me',
            {
              headers:
                {"Authorization": `Bearer ${this.token}`}
            })
          .then(response => {
            this.fhictPerson = response.data;
          })
      },
      parsePersonResponse() {
        if (this.fhictPerson != null) {
          if (this.fhictPerson.employeeId === "2958074"){
              let teacher = {
                id: this.fhictPerson.employeeId,
                first_name: this.fhictPerson.givenName,
                last_name: this.fhictPerson.surName,
                fhict_token: this.token,
                pcn: this.fhictPerson.id.substr(1),
                email: this.fhictPerson.mail,
                is_mentor: 1,
                is_exam_board: 0
              };
              return axios.post("http://localhost:8000/teachers/add/", teacher);
          }

          else if (this.fhictPerson.employeeId === "2933128"){
            let teacher = {
              id: this.fhictPerson.employeeId,
              first_name: this.fhictPerson.givenName,
              last_name: this.fhictPerson.surName,
              fhict_token: this.token,
              pcn: this.fhictPerson.id.substr(1),
              email: this.fhictPerson.mail,
              is_mentor: 0,
              is_exam_board: 1
            };
            return axios.post("http://localhost:8000/teachers/add/", teacher);
          }


          else if (this.fhictPerson.employeeId === "3024342"){
            let teacher = {
              id: this.fhictPerson.employeeId,
              first_name: this.fhictPerson.givenName,
              last_name: this.fhictPerson.surName,
              fhict_token: this.token,
              pcn: this.fhictPerson.id.substr(1),
              email: this.fhictPerson.mail,
              is_mentor: 0,
              is_exam_board: 0
            };
            return axios.post("http://localhost:8000/teachers/add/", teacher);
          }



          else if (this.fhictPerson.affiliations.includes("student") && !this.fhictPerson.affiliations.includes("teacher")) {
            console.log("We have a student logged in!");

            let student = {
              pcn: this.fhictPerson.id.substr(1),
              student_number: this.fhictPerson.employeeId,
              first_name: this.fhictPerson.givenName,
              last_name: this.fhictPerson.surName,
              email: this.fhictPerson.mail,
              start_date: "2019-06-11T22:29:07.349000Z",
              stream: "Software",
              fhict_token: this.token,
              credits: 0,
              mentor_id_id: 2958074,
              class_name: this.fhictPerson.personalTitle
            };
            return axios.post("http://localhost:8000/students/", student);
          }

        }
      }
    }
  }
</script>

<style scoped>

</style>


