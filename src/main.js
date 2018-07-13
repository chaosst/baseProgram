// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import base from './lib/fant-base';
import vueEl from './lib/fant-element';
import './lib/fant-common';
import './my-theme/base.css';
Vue.use(base);
Vue.use(vueEl);
import store from './store';

import ElementUI from 'element-ui'
import './my-theme/index.scss';
import './my-theme/icon/iconfont.css';
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App />'
});
