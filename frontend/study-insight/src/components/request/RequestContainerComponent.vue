<template>
    <div class="container">
        <div class="accordion md-accordion" role="tablist" aria-multiselectable="false">
            <div class="accordion">
                <div class="card" v-for="request in teacherRequests.requests" v-bind:key="request.id">
                    <div class="card-header" :id="request.id">
                        <h5 class="mb-0">
                            <button class="btn collapsed" type="button" data-toggle="collapse"
                                    :data-target="'#collapseOne'+ request.id" aria-expanded="false"
                                    :aria-controls="'collapseOne'+ request.id">

                                <div class="single-request -shadow">
                                    <div>
                                        {{request.sender.first_name}} {{request.sender.last_name}}
                                    </div>
                                </div>
                                <i class="fas fa-angle-down rotate-icon"></i>
                            </button>
                        </h5>
                    </div>
                    <div :id="'collapseOne'+ request.id" class="collapse" :aria-labelledby="'headingOne'+ request.id"
                         data-parent="#myaccordion">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm">
                                    <RequestedSubject :subjects="request.courses"/>
                                </div>
                                <div class="col-sm">
                                    <DescriptionComponent :description="request.request_description"/>
                                </div>
                                <div class="col-sm">
                                    <div class="btn-group" :id="'rbuttons'+request.id" style="margin-top: 5%">
                                        <button :id="'approve'+request.id" type="button" class="btn btn-success"
                                                style="margin-right: 5%" @click="approveRequest(request.id)">
                                            Approve
                                        </button>
                                        <button :id="'deny'+request.id" type="button" class="btn btn-danger"
                                                @click="denyRequest(request.id)">Deny
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DescriptionComponent from "./DescriptionComponent";
    import {mapState} from "vuex";
    import RequestedSubject from "./RequestedSubject";

    export default {
      name: "RequestContainerComponent",
      data: function() {
          return { user: JSON.parse(localStorage.user) }
      },
      components: {
        RequestedSubject,
        DescriptionComponent,
      },
      created() {
        if(this.user.is_mentor){
          this.$store.dispatch("teacherRequests/fetchRequests", { teacher_id: this.user.pcn });
        } else {
          this.$store.dispatch("teacherRequests/fetchRequestsExamboard");
        }

      },
      methods: {
          approveRequest(requestId) {
              if (this.user.is_mentor) {
                  this.$store
                      .dispatch("teacherRequests/approveRequest", {
                          requestId: requestId
                      });
              } else {
                  this.$store
                      .dispatch("teacherRequests/approveRequestExamboard", {
                          requestId: requestId
                      });
              }

              let currentDiv = document.getElementById("rbuttons" + requestId);
              document.getElementById("approve" + requestId).remove();
              document.getElementById("deny" + requestId).remove();
              var approve = document.createTextNode("Approved");
              currentDiv.appendChild(approve);
          },
          denyRequest(requestId) {
              if (this.user.is_mentor) {
                  this.$store
                      .dispatch("teacherRequests/denyRequest", {
                          requestId: requestId
                      });
              } else {
                  this.$store
                      .dispatch("teacherRequests/denyRequestExamboard", {
                          requestId: requestId
                      });
              }

              let currentDiv = document.getElementById("rbuttons" + requestId);
              document.getElementById("approve" + requestId).remove();
              document.getElementById("deny" + requestId).remove();
              var deny = document.createTextNode("Denied");
              currentDiv.appendChild(deny);

          }
      },
      computed: {
          ...mapState(["teacherRequests"])
      }
    }
</script>

<style scoped>
</style>
