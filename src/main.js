import Vue from 'vue'
import Vuex from 'vuex'
// import './plugins/vuetify'
import VueSidebarMenu from 'vue-sidebar-menu'
import App from './App.vue'
import router from './router'
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbvue/build/css/mdb.css';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import store from './store'
Vue.config.productionTip = false

Vue.use(VueSidebarMenu)
Vue.use(Vuex)

new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
  store: store
})

