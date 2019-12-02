<template>
    <div>
        <div>
            <div id="network"></div>
        </div>
        <SideOptions :course="selectedCourse" style="float: right;"></SideOptions>
    </div>

</template>

<script>
  import vis from 'vis';
  import { mapState } from "vuex";
  import SideOptions from "./SideOptions";

  export default {
    name: "Tree.vue",
    data(){
      return{
        edgeId: "",
        selectedCourse:{},
        user: JSON.parse(localStorage.user)
      }
    },
    components:{
      SideOptions
    },
    created(){
      this.$store.dispatch("grades/fetchGrades", { student_id: this.$route.params.pcn });
    },
    mounted() {
      // this.main();
      // console.log(this.nodes);
      // console.log(this.nodes);
      // console.log(this.edges);
      // console.log(vis);

    },
    computed: {
      nodesEdges () {
        return this.$store.state.grades.treeNodesEdges;
      },
      selectedNodesEdges() {
        return this.$store.state.grades.treeNodesSelected;
      },
      ...mapState({
        treeNodes: state => state.grades.treeNodes,
        treeNodesSelected: state => state.grades.treeNodesSelected
      })
    },
    watch: {
      nodesEdges: {
        immediate: true,
        deep: false,
        handler(newValue, oldValue) {
          if(newValue!==null){
            if(newValue.nodes.length!=0&&newValue.edges.length!=0){
              this.main(newValue.nodes, newValue.edges);
            }
          }


        }
      },
      selectedNodesEdges:{
        immediate: true,
        deep: true,
        handler(newValue, oldValue) {
          console.log("update graph");
          console.log(newValue);
          if(newValue!==null) {
            if (newValue.nodes.length != 0 && newValue.edges.length != 0) {
              this.main(newValue.nodes, newValue.edges);
            }
          }
        }
      }
    },
    methods: {
      main(treeNodes, treeEdges) {
        let self = this;
        var graph = {
          nodes: new vis.DataSet(treeNodes),
          edges: new vis.DataSet(treeEdges)
        };
        var options = {
          autoResize: true,
          nodes: {
            borderWidth: 1,
            borderWidthSelected: 1,
            color: {
              border: '#616161',
              background: '#616161',
              highlight: {
                border: 'purple',
                background: 'purple'
              },
              hover: {
                border: 'purple',
                background: 'purple'
              }
            },
            font:{
              color: 'white',
              size: 25,
            },
          },
          edges: {
            smooth: {
              type: 'cubicBezier',
              forceDirection: 'vertical',
              roundness: 1
            },
            color: 'lightgray'
          },
          layout: {
            hierarchical: {
              direction: 'UD',
              nodeSpacing: 150
            }
          },
          groups: {
            semestersGroup: {color:{background:'#653165'}, borderWidth:0},
            passedGroup: {color:{background:'#4CAF50'}, borderWidth:0},
            defaultGroup: {color:{background:'#653165'}, borderWidth:0},
            failedGroup: {color:{background:'#F44336'}, borderWidth:0},
            failedWithFiveGroup: {color:{background:'#FFC107'}, borderWidth:0},
            notTakenGroup: {color:{background:'#9E9E9E'}, borderWidth:0}
          },
          interaction: {dragNodes :false, zoomView: false, dragView: false},
          physics:false,
          width: (window.innerWidth - 250) + "px",
          height: (window.innerHeight - 75) + "px"
        };
        var network = new vis.Network(document.getElementById("network"), graph, options);
        network.fit();
        network.on( 'click', function(properties) {
         // console.log(properties.nodes[0]);
          let selectedid = properties.nodes[0];


          // if(self.edgeId!==""){
          //    network.body.data.edges.remove(self.edgeId);
          // }
          //
          // self.edgeId = network.body.data.edges.add([{from: selectedid, to: "2.1"}])[0];
          // console.log(self.edgeId);

          // var clickedNode = network.body.data.nodes.get("2.1");
          // clickedNode.color = {
          //   border: '#000000',
          //   background: '#000000',
          //   highlight: {
          //     border: '#2B7CE9',
          //     background: '#D2E5FF'
          //   }};
          //
          // network.body.data.nodes.update(clickedNode);
            self.$store.dispatch("grades/changeEdgesAndNodes", {
              selectedCourseId: selectedid
            });
            self.$store
              .dispatch("grades/changeSelectedCourseId", {
                selectedCourseId: selectedid
              })
              .then(() => {
                self.$store.dispatch("grades/fetchCourse").then((foundCourse) => {
                  if(foundCourse!==null){
                    self.selectedCourse = foundCourse;
                  }
                });
              });
        }
        );
      },

    }
  }
</script>

<style scoped>
canvas{
    padding-right: 15em;
}
</style>
