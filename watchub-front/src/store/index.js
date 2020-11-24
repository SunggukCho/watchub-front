import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    LatestList: [],
    PopularList: [],
    ClassicList: [],
    wishList: [],
    alreadyList: [],
    favoriteList: [],
  },
  mutations: {
    SET_LATEST_MOVIE_LIST: function (state, movies) {
      state.LatestList = movies
    },
    SET_POPULAR_MOVIE_LIST: function (state, movies) {
      state.PopularList = movies
    },
    SET_CLASSIC_MOVIE_LIST: function (state, movies) {
      state.ClassicList = movies
    },
    SET_WISH_LIST: function (state, wish) {
      state.wishList.push(wish)
    },
  },
  actions: {
    getLatestMovieList: function({commit}, movies) {
      commit('SET_LATEST_MOVIE_LIST', movies)
    },
    getPopularMovieList: function({commit}, movies) {
      commit('SET_POPULAR_MOVIE_LIST', movies)
    },
    getClassicMovieList: function({commit}, movies) {
      commit('SET_CLASSIC_MOVIE_LIST', movies)
    },
    getWishList: function({commit}, wish) {
      commit('SET_WISH_LIST', wish)
    },
  },
  modules: {
  },
  plugins: [
    createPersistedState(),
  ]
})
