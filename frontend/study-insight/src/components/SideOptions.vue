<template>
    <div class="wrapper">
        <!-- Sidebar -->
        <nav id="sidebar" class="shadow mb-5 rounded fixed-right fix" style="background-color: white">
            <div style="padding-top: 5em; padding-left: 1em; padding-right: 1em;" >
                <div >
                    <h2>Description</h2>
                    <p v-if="course.course!=undefined">ECS: {{course.course.course_id.credits}} </p>
                    <p v-else>ECS: --- </p>
                    <p v-if="course.status!=undefined">Status: {{course.status}} </p>
                    <p v-else>Status: --- </p>
                    <div v-if="course.highestGrade!=-undefined">
                        <p v-if="course.highestGrade!=-1">Grade: {{course.highestGrade}} </p>
                    </div>
                    <p v-else>Grade: --- </p>
                    <button type="button" class="btn btn-primary" style="margin-bottom: 0.5em;" @click="addToRequest(course)">Add to request</button>
                    <hr>
                    <div>
                        <h2 style="padding-top: 0.5em;">Add message</h2>

                        <ul class="list-unstyled">
                            <li v-for="course in requestSubjects" v-bind:key="course.course.course_id.id">{{course.course.course_id.name}}</li>
                        </ul>
                        <div class="form-group">
                            <label for="comment">Comment:</label>
                            <textarea class="form-control" rows="5" id="comment"></textarea>
                        </div>
                        <button type="button" class="btn btn-success" @click="sendRequest()">Send request</button>
                    </div>
                </div>
            </div>

        </nav>
    </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    name: "SideOptions",
    props: {
      course: {
        type: Object,
        required: true
      }
    },
    data(){
      return{
        requestSubjects:[],
        user: JSON.parse(localStorage.user)
      }
    },
    methods: {
      addToRequest(course) {
        if(course === {} || course == null || !course){

        } else {
          console.log(course);
          let found=false;
          for(let i=0; i<this.requestSubjects.length; i++){
            if(this.requestSubjects[i].course.course_id.id === course.course.course_id.id){
              found=true;
            }
          }
          if(!found){
            this.requestSubjects.push(course);
          }
        }

      },
      sendRequest(){
        let request = {
          courses:"",
          request_description:"",
          sender_number: this.user.student_number
        };
        request.request_description = document.getElementById("comment").value;
        for(let i=0; i<this.requestSubjects.length; i++){
          request.courses = request.courses + this.requestSubjects[i].course.course_id.name;
          if(i!==this.requestSubjects.length-1){
            request.courses += ", ";
          }
        }
        this.$store
          .dispatch("studentRequests/createRequest", {
            request: request
          }).then(()=>{
            this.requestSubjects = [];
          document.getElementById("comment").value = "";
        });
      }
    },
    computed: {
      ...mapState(["studentRequests, students"])
    }
  }
</script>

<style scoped>
    .wrapper {
        display: flex;
        width: 100%;

    }

    #sidebar {
        text-align: left;
        position: fixed;
        z-index: 999;
        transition: all 0.3s;
        top: 0;
        right: 0;
        height: 100%;
        width: 17em;
        margin-bottom: 0!important;
        color: black;

    }

    hr {
        margin-top: 1rem;
        margin-bottom: 1rem;
        border: 0;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
</style>