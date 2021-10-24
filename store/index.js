import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const state = () => ({
    token: null,
    username: null,
})

export const mutations = {
    set_token(state, token) {
        return (state.token = token);
    }
}

export const getters = {
}

export const actions = {
    login(context, user) {
        // eslint-disable-next-line no-new
        return new Promise((resolve, reject) => {
            this.$axios.post('login', user).then(response => {
                context.commit('set_token', response.data.token)
                resolve(response.data.token)
            }).catch(err => reject(err))
        })
    }
}