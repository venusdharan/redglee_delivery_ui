import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
const token = localStorage.getItem('auth._token.local');
const options = { }; //Options object to pass into SocketIO
const connection = token == null ? 'http://192.168.0.104:4600' : 'http://192.168.0.104:4600?token='+token;
Vue.use(new VueSocketIO({
    debug: true,
    connection: connection , //options object is Optional
    options:options
  })
);
