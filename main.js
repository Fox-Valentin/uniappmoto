import Vue from 'vue'
import App from './App'
import store from './store/index.js'
Vue.config.productionTip = false

// 挂载全局方法
import config from "./common/config.js"
Vue.prototype.config=config

import lib from "./common/lib.js"
Vue.prototype.lib=lib

import $http from './common/http.js'
Vue.prototype.$http=$http

App.mpType = 'app'

const app = new Vue({
	store,
    ...App,
	config,
	lib,
})
app.$mount()
