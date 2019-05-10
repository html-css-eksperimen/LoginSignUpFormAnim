import Vue from 'vue';
import Vuex from 'vuex';
import httpstore from './httpstores';


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';


export default new Vuex.Store({
  modules: {
    httpstore,
  },
  strict: debug,
});
