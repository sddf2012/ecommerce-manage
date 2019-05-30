import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {isCollapse: false},
  getters
})

export default store
