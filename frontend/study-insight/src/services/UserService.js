import Vue from "vue";

export default {
  getUserStatus() {
    // return Vue.prototype.$apiClient.get(`/user/status`);

    let exampleResponse = {
      data:"student"
    };
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
        resolve(exampleResponse);
        }, 300);
      });
  },

};
