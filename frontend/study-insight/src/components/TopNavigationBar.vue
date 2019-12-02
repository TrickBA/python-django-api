<template>
    <div class="wrapper">
    <nav class="navbar navbar-default navbar-static-top shadow" style="padding: 0!important; z-index: 1500;  width: 100%;">
        <div class="container-fluid" style=" height: 4em; width: 100%; ">
            <div class="sidebar-header" >
                <h3>Study Insight</h3>
            </div>
            <div></div>
<!--            <div class="float-right">-->
<!--                <i class="fa fa-bell fa-lg" aria-hidden="true" style="color:white; margin-right: 20px;"></i>-->
<!--                <img src="./../assets/img/default-user.jpg" class=" rounded-circle " style="width: auto; height: 1.8em; margin-right: 1em;">-->
<!--            </div>-->
            <div class="float-right">
                <img src="../assets/img/fontys-logo.png" alt="" style="width: auto; height: 3em;">
            </div>



        </div>
    </nav>
    </div>
</template>

<script>
  export default {
    name: "TopNavigationBar"
  }
</script>

<style scoped>
    .wrapper {
        display: flex;
        width: 100%;

    }
    .sidebar-header{
        color: white;
    }
    .navbar-static-top{
        background-color: #653165;
    }
</style>