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
import vuetable from 'vuetable-2'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyA2D4zkjHNrWMn0kX_YV8VkezWi9gPMkFQ",
  authDomain: "vnpttg-7c1fc.firebaseapp.com",
  databaseURL: "https://vnpttg-7c1fc.firebaseio.com",
  projectId: "vnpttg-7c1fc",
  storageBucket: "vnpttg-7c1fc.appspot.com",
  messagingSenderId: "885790426721",
  appId: "1:885790426721:web:7f4eeebfcf7fdbe1"
};

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()
Vue.config.productionTip = false
Vue.use(vuetable)
Vue.use(VueSidebarMenu)
Vue.use(Vuex)
Vue.use(firebase)
messaging
    .requestPermission()
    .then(() => firebase.messaging().getToken())
    .then((token) => {
        console.log(token) // Receiver Token to use in the notification
    })
    .catch(function(err) {
        console.log("Unable to get permission to notify.", err);
    });
new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
  store: store
})