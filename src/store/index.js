import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie';
import router from '../router';


Vue.use(Vuex);
let store = new Vuex.Store({
  state: {
    token: Cookies.get('Y-Token')&&Cookies.get('Y-Token')!='null' ? Cookies.get('Y-Token') : '',
    userId: Cookies.get('userId')&&Cookies.get('userId')!='null' ? Cookies.get('userId') : '',
    isFirstLogin: Cookies.get('isFirstLogin')&&Cookies.get('isFirstLogin')!='null' ? Cookies.get('isFirstLogin') : '',
  },
  getters: {},
  mutations: {

    setToken(state, data) {
      state.token = data.token;
      state.userId = data.id;
      state.isFirstLogin = data.isFirstLogin;
      Cookies.set('Y-Token', data.token);
      Cookies.set('userId', data.id);
      Cookies.set('isFirstLogin', data.isFirstLogin);
      if(data.isFirstLogin==0){
        router.push('/');
      }else{
        router.push('/myCompletion');
      }

    },
    signOUT(state) {
      state.token = null;
      state.userId = null;
      Cookies.set('Y-Token', null);
      Cookies.set('userId', null);
      Cookies.set('isFirstLogin', '');
      router.push('/login');
    },


  },
  actions: {
  },
});

export default store;
