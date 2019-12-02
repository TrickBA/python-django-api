<template>
    <div id="app" style="overflow: hidden">
        <NavigationBar></NavigationBar>
        <TopNavigationBar></TopNavigationBar>
        <router-view/>

    </div>

</template>

<script>

  import NavigationBar from "./components/NavigationBar";
  import TopNavigationBar from "./components/TopNavigationBar";

  export default {
    components: {
      NavigationBar,
      TopNavigationBar
    }
  }
</script>
<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
