import UserService from "../../../services/UserService.js";

export const namespaced = true;

export const state = {
  currentNavigationItems: [],
  navigationItemsStudent: [
    {
      name: 'Progress',
      route: '/student/progress',
      isActive: true
    },
    {
      name: 'Dashboard',
      route: '/student/dashboard',
      isActive: false
    },
    {
      name: 'Requests',
      route: '/student/requests',
      isActive: false
    }
  ],
  navigationItemsTeacher: [
    {
      name: 'Overview',
      route: '/teacher/dashboard',
      isActive: false
    },
    {
      name: 'Requests',
      route: '/teacher/requests',
      isActive: false
    },
  ],
};

export const mutations = {
  SET_CURRENT_NAVIGATION_ITEMS(state, items) {
    state.currentNavigationItems = items;
  },
  SET_ACTIVE_NAVIGATION_ITEM(state, activeNavigationItemName) {
    for(let i=0; i<state.currentNavigationItems.length; i++){
      state.currentNavigationItems[i].isActive = state.currentNavigationItems[i].name === activeNavigationItemName;
    }
  }
};
export const actions = {
  fetchNavigationItems({ commit }) {
    return UserService.getUserStatus().then(response => {
      if(response.data === "student"){
        commit("SET_CURRENT_NAVIGATION_ITEMS", state.navigationItemsStudent);
      }
      else {
        commit("SET_CURRENT_NAVIGATION_ITEMS", state.navigationItemsTeacher);
      }
    });
  },

  changeNavigationItems({commit}, {status}){
    if(status==="student"){
      commit("SET_CURRENT_NAVIGATION_ITEMS", state.navigationItemsStudent);
    } else {
      commit("SET_CURRENT_NAVIGATION_ITEMS", state.navigationItemsTeacher);
    }
  },

  changeActiveItem({ commit }, { activeNavigationItemId }) {
    return commit("SET_ACTIVE_NAVIGATION_ITEM", activeNavigationItemId);
  }
};

export const getters = {

};
