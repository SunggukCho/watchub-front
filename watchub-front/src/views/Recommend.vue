<template>
  <div id="recommend" class="container">
    <div class="row justify-content-center">
      <h2>오늘의 추천작!</h2>
      <button @click="getRecommendList()">영화추천받기</button>
      <RecommendCarousel :recommendMovieList="recommendList" />
    </div>
  </div>
</template>

<script>
import RecommendCarousel from './RecommendCarousel.vue'
import axios from 'axios'

const API_URL = process.env.VUE_APP_SERVER_URL
// const userId = localStorage.getItem('user_id')**1

export default {
  name: 'Recommend',
  components: {
    RecommendCarousel,
  },
  data: function () {
    return {
      recommendList: [],
      tmp: this.$store.state.favoriteList[0],
    }
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        headers: {
          Authorization: `JWT ${token}`
        }
      }
      return config
    },
    getRecommendList: function () {
      const config = this.setToken()
      const movieId = this.tmp.id

      axios.get(`${API_URL}/movies/${movieId}/recommend_like/`, config)
      .then((res) => {
        this.recommendList = res.data
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}

</script>

<style>
</style>