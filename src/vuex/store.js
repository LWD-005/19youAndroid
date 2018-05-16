import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        dlztm:'1'
    },
    mutations:{
        setDlztm(state,dlztm){
            state.dlztm = dlztm
        }
    }
})