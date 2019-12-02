<template>
    <div class="tabs" style="margin-left: 20%; margin-right:5%;">
        <ul class="nav nav-tabs nav-justified md-tabs indigo tab-teacher" id="myTabJust" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" role="tab" aria-controls="home-just"
                   aria-selected="true"  @click="selectTab(1)">Courses Overview</a>
            </li>
            <li class="nav-item" v-show="user.is_mentor">
                <a class="nav-link" data-toggle="tab" role="tab" aria-controls="profile-just"
                   aria-selected="false"  @click="selectTab(2)">Mentor Overview</a>
            </li>
            <li class="nav-item" v-show="user.is_exam_board">
                <a class="nav-link" data-toggle="tab" role="tab" aria-controls="contact-just"
                   aria-selected="false" @click="selectTab(3)  ">Exam board Overview</a>
            </li>
        </ul>
        <div class="container info">
            <div v-if="currentTab===1">
                <IndividualSubjectComponent :user="user"/>
            </div>
            <div v-if="currentTab===2">
                <div class="row justify-content-center">
                    <div class="col-12" style="border:1px solid #cecece;">
                        <SearchStudentComponent :user="this.user"/>
                    </div>
                </div>
            </div>
            <div v-if="currentTab===3">
                <div class="row justify-content-center">
                    <div class="col-12" style="border:1px solid #cecece;">
                        <SearchStudentComponent :user="this.user"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import IndividualSubjectComponent from "../subject/IndividualSubjectComponent";
    import SearchStudentComponent from "./SearchStudentComponent";

    export default {
        name: "TabsComponent",
        props: {},
        data: function () {
            return {
                currentTab: 1,
                user: JSON.parse(localStorage.user)
            }
        },
        methods: {
            selectTab(selectedTab) {
                this.currentTab = selectedTab
            }
        },
        components: {
            IndividualSubjectComponent,
            SearchStudentComponent
        }

    }
</script>

<style scoped>
    .tabs {
        padding-top: 3%;
    }

    .info {
        padding-top: 3%;
    }
    /**{*/
    /*    box-sizing: border-box;*/
    /*    padding: 0;*/
    /*    margin: 0;*/
    /*}*/

    /*body{*/
    /*    font-family: 'Open Sans', sans-serif;*/
    /*    color: rgb(80, 85, 90);*/
    /*    padding: 100px 20px;*/
    /*}*/

    /*nav{*/
    /*    z-index: 9;*/
    /*    border-bottom: 1px solid rgba(0, 0, 0, .1);*/
    /*    color: white;*/
    /*    position: fixed;*/
    /*    top: 0;*/
    /*    left: 0;*/
    /*    width: 100%;*/
    /*    padding: 20px 0;*/
    /*    text-align: center;*/
    /*}*/

    /*.bg-color{*/
    /*    background-color: #46a1de;*/
    /*    transition-duration: .5s;*/
    /*}*/

    /*.text-color{*/
    /*    color: #46a1de;*/
    /*    transition-duration: .5s;*/
    /*}*/

    /*footer{*/
    /*    padding: 40px 0;*/
    /*    text-align: center;*/
    /*    opacity: .33;*/
    /*    color: white;*/
    /*}*/

    /*.wrapper{*/
    /*    min-width: 600px;*/
    /*    max-width: 900px;*/
    /*    margin: 0 auto;*/
    /*}*/

    /*.tabs{*/
    /*    display: table;*/
    /*    table-layout: fixed;*/
    /*    width: 100%;*/
    /*    -webkit-transform: translateY(5px);*/
    /*    transform: translateY(5px);*/

    .li {
        transition-duration: .25s;
        display: table-cell;
        list-style: none;
        text-align: center;
        padding: 20px 20px 25px 20px;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        color: white;
    }

    .tab-teacher{
        border-color:black;
        color: #FFFFFF;
        background-color: #653165;
        border-radius: 10px;
    }

</style>
