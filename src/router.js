import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue';

Vue.use(Router);

const LoginForm = () => import(/* webpackChunkName: "login-page" */ './views/loginforms/LoginFormView.vue');

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginForm,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '*',
      redirect: { name: 'login' },
    },
  ],
});
