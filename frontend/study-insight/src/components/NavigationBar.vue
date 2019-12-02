<template>
    <div class="wrapper">
        <!-- Sidebar -->

        <nav id="sidebar" class="shadow mb-5 rounded fixed-bottom" style="background-color: #653165">
                <ul class="list-unstyled components" >

                    <li
                            class="nav-li"
                            v-for="navElement in navigation.currentNavigationItems"
                            v-bind:key="navElement.name"
                            @click="changeActiveState(navElement.name)"
                            :class="{active: navElement.isActive, 'white-left-border': navElement.isActive}"
                    >
                        <div class="nav-icon-container">
                            <router-link :to="navElement.route + '/' + userPcn" :class="{active: navElement.isActive}" style="color: white; padding-left: 20px;  text-decoration: none;">{{navElement.name}}</router-link>
                        </div>
                    </li>
                </ul>

        </nav>
    </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    name: "NavigationBar",
    created(){
      this.$store.dispatch("navigation/fetchNavigationItems");
    },
    methods: {
      changeActiveState(navName) {
        this.$store
          .dispatch("navigation/changeActiveItem", {
            activeNavigationItemId: navName
          });
      }
    },
    computed: {
      userPcn() {
        let user = JSON.parse(localStorage.getItem("user"));
        return user.pcn;
      },
      ...mapState(["navigation"])
    }
  }
</script>

<style scoped>

    .nav-li {
        border-left: 8px solid transparent;
        padding-top: 1em;
        padding-bottom: 1em;
        padding-left: 0em;
        font-size: 18px;
        text-transform: uppercase;
    }

    .nav-li:hover {
        border-left: 8px solid white;
    }

    .white-left-border{
        border-left: 8px solid white;
    }
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
        left: 0;
        height: 100%;
        width: 200px;
        margin-bottom: 0!important;
        color: white;

    }

    #sidebar ul{
        margin-top: 60%;
        margin-bottom: 40%;
    }

    #sidebar ul.components {

        padding: 20px 0;
    }
</style>
