import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

//导入日志插件
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user
  },
  strict: debug,//严格模式，发布的时候自动取消严格模式
  plugins: debug ? [createLogger()] : []
})
