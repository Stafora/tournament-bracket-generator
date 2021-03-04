import axios from 'axios'

export default {
    state: {
        layout: 'DefaulLayout'
    },

    mutations: {
        setLayout(state, payload) {
            state.layout = payload
        }
    },

    actions: {},

    getters: {
        layout(state) {
            return state.layout
        }
    }
  }