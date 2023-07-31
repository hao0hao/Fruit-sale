import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    addData:{}
  },
  getters: {
  },
  mutations: {
    SetData(state,value){
      state.addData=value
    },
    clearData(state){
      state.addData={}
    }
  },
  actions: {
  },
  modules: {
  }
})
