<template>
    <div class="container">
        <div class="well">
            <form class="form-inline">
                <h3><label>Request</label></h3>
            </form>
        </div>
        <div class="accordion md-accordion" role="tablist" aria-multiselectable="false">
            <div class="accordion">
                <div class="card" v-for="request in studentRequests.requests" v-bind:key="request.id">
                    <div class="card-header" :id="request.id">
                        <h5 class="mb-0">
                            <button class="btn collapsed" type="button" data-toggle="collapse"
                                    :data-target="'#collapseOne'+ request.id" aria-expanded="false"
                                    :aria-controls="'collapseOne'+ request.id">
                                <RequestComponent>
                                    Request {{request.id}}
                                    <i class="fas fa-angle-down rotate-icon"></i>
                                </RequestComponent>
                            </button>
                        </h5>
                    </div>
                    <div :id="'collapseOne'+ request.id" class="collapse"
                         :aria-labelledby="'headingOne'+ request.id"
                         data-parent="#myaccordion">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm">
                                    <StatusComponent :approved-mentor="request.approved_mentor" :approved-exam-board="request.approved_examboard"/>
                                </div>
                                <div class="col-sm">
                                    <RequestedSubject :subjects="request.courses"/>
                                </div>
                                <div class="col-sm">
                                    <DescriptionComponent :description="request.request_description"/>
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
    import RequestComponent from "./RequestComponent";
    import DescriptionComponent from "./DescriptionComponent";
    import StatusComponent from "./StatusComponent";
    import RequestedSubject from "./RequestedSubject";
    import { mapState } from "vuex";

    export default {
        name: "RequestContainerComponent",
        data: function() {
        return { user: JSON.parse(localStorage.user) }
        },
        components: {
            RequestComponent,
            DescriptionComponent,
            StatusComponent,
            RequestedSubject
        },
      created(){
        this.$store.dispatch("studentRequests/fetchRequests", { student_id: this.user.pcn });
      },
      computed: {
        ...mapState(["studentRequests"])
      }
    }
</script>

<style scoped>
    .single-request {
        padding: 20px;
        margin-bottom: 24px;
        transition: all 0.2s linear;
        cursor: pointer;
    }

    .single-request:hover {
        transform: scale(1.01);
        box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
    }

    .single-request > .title {
        margin: 0;
    }

    .single-request-link {
        color: black;
        text-decoration: none;
        font-weight: 100;
    }

</style>
