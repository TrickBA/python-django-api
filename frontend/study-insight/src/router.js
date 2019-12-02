import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/student/Dashboard.vue';
import RequestTeacher from './views/teacher/Requests.vue';
import DashboardTeacher from './views/teacher/Dashboard.vue';
import Progress from "./views/student/Progress.vue";
import RequestStudent from './views/student/Requests.vue';
import Login from "./views/Login";
import FhictLogin from "./views/FhictLogin";

Vue.use(Router);


let router = new Router({
  routes: [
    {
      path: '/',
      component: Login,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/student/progress/:pcn',
      name: 'progress',
      component: Progress,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/student/dashboard/:pcn',
      name: 'studentDashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/teacher/dashboard/:pcn',
      name: 'teacherDashboard',
      component: DashboardTeacher,
      props:true,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/teacher/requests/:pcn',
      name: 'teacherRequest',
      component: RequestTeacher,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/student/requests/:pcn',
      name: 'studentRequest',
      component: RequestStudent,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: '/fhict-login',
      name: 'fhict-login',
      component: FhictLogin,
      meta: {
        requiresAuth: false,
      }
    }
  ],
  mode: 'history'
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('user') == null) {
      next({
        path: "/fhict-login",
        params: { nextUrl: to.fullPath }
      });
    } else {
      let user = JSON.parse(localStorage.getItem("user"));
      next();
    }
  } else {
    next();
  }
});

export default router
