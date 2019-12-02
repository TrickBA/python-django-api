<template>
    <div class="container-fluid" style="padding-left: 200px;">
        <Tree></Tree>
    </div>

</template>

<script>
  import Tree from "../../components/Tree.vue";
  import SideOptions from "../../components/SideOptions";

  export default {
    name: "Progress",
    created(){
    },
    components:{SideOptions, Tree}
  }
</script>