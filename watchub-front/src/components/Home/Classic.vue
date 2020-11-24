<template>
  <section class="glide glide--ltr glide--carousel glide--swipeable">
    <vue-glide
      class="glide__track"
      data-glide-el="track3"
      ref="slider"
      type="carousel"
      :breakpoints="{3000: {perView: 7}, 1500: {perView: 3}, 600: {perView: 1}}">
      <vue-glide-slide v-for="(movie, idx) in Classic" :key="idx">
        <div class="item" data-toggle="modal" data-target="#ModalLong3" data-whatever="@mdo" @click="clickModal(movie)">
          <img :src="movie.poster_path" >
        </div>
      </vue-glide-slide>
      <template slot="control">
        <a class="arrow" data-glide-dir="<">‹</a>
        <a class="arrow" data-glide-dir=">">›</a>
      </template>
    </vue-glide>
    <!-- Modal Detail -->
    <div class="modal fade" id="ModalLong3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">{{ movieDetail.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body container">
            <div class="box row">
              <img :src="movieDetail.poster_path">
            </div>
          </div>
          <div class="box mx-4">
            <!-- 좋아요 -->
            <button class="btn btn-link" @click="postLike(movieDetail)">
              <i class="fas fa-heart fa-lg" style="color:crimson;" v-if="liked === true"></i>
              <i class="fas fa-heart fa-lg" style="color:#fff;" v-else></i>
            </button>
            <p>좋아요 수: {{ this.numberOfLikes }} </p>
            <!-- 평점 -->
            <p>리뷰를 입력해주세요 (1~10)
              <input type="number" v-model="review" min="1" max="10" @keypress.enter="sendReview(review, movieDetail)">
              <button @click="sendReview(review, movieDetail)">ADD</button>
            </p>
            <p>내 평점: {{ this.rank }}</p>
            <!-- <p v-else> {{ myRank }} </p> -->
            <!-- 영화 정보 -->
            <p>평균 평점: {{ movieDetail.vote_average }}</p>
            <p>개봉: {{ movieDetail.release_date }}</p>
            <p>장르:<span v-for="(genre, idx) in movieDetail.genre_ids" :key="idx">  {{ genre.name }}</span></p>
            <span>줄거리:</span>
            <p> {{ movieDetail.overview }}</p>
            <hr>
            <!-- 댓글 -->
            <h4>댓글</h4>
            <input type="text" v-model="comment" @keypress.enter="createComment(comment, movieDetail)">
            <button @click="createComment(comment, movieDetail)">ADD</button>
              <p v-for="(comment, idx) in comments" :key="idx"> 
                {{ comment.content }} |
                {{ comment.user_id }} |
                작성:{{ comment.created_at.substr(5, 5) }} |
                수정:{{ comment.updated_at.substr(5, 5) }} |
                <button @click="deleteComment(comment, movieDetail)">삭제</button>
              </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Glide, GlideSlide } from 'vue-glide-js'
import axios from 'axios'

const API_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'Classic',
  components: {
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
  },
  props: {
    Classic: Array,
  },
  data: function () {
    return {
      movieDetail: {},
      numberOfLikes: 0,
      likes: [],
      review: 0,
      rank: 0,
      comment: '',
      comments: [],
      liked: false,
    }
  },
  computed: {
    likeNum: function () {
      return this.numberOfLikes
    },
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
    clickModal: function (movie) {
      this.movieDetail = movie
      this.getLike(movie)
      this.getReview(movie)
      this.getComment(movie)
    },
    getLike: function (movie) {
      const config = this.setToken()
      const movieId = movie.id

      axios.get(`${API_URL}/movies/${movieId}/like/`, config)
      .then((res) => {
        const userId = localStorage.getItem('user_id')**1
        this.numberOfLikes = res.data.like_users.length
        if (res.data.like_users.includes(userId)) {
          this.liked = true
        } else {
          this.liked = false
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    postLike: function (movie) {
      const config = this.setToken()
      const movieId = movie.id
      axios.post(`${API_URL}/movies/${movieId}/like/`, {}, config)
      .then((res) => {
        const userId = localStorage.getItem('user_id')**1
        this.likes = res.data.like_users
        this.numberOfLikes = res.data.like_users.length
        if (res.data.like_users.includes(userId)) {
          this.liked = true
        } else {
          this.liked = false
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    getReview: function (movie) {
      const config = this.setToken()
      const movieId = movie.id

      axios.get(`${API_URL}/movies/${movieId}/reviews/`, config)
      .then((res) => {
        const myRank = res.data.rank
        if (myRank != null || myRank != undefined) {
          this.rank = myRank
        } else {
          this.rank = 0
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    sendReview: function (review, movie) {
      const config = this.setToken()
      const movieId = movie.id
      axios.post(`${API_URL}/movies/${movieId}/reviews/`, {'rank': review}, config)
      .then((res) =>{
        this.rank = res.data.rank
        this.getReview(movie)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    createComment: function (comment, movie) {
      const config = this.setToken()
      const movieId = movie.id

      axios.post(`${API_URL}/movies/${movieId}/comments/`, {'content': comment}, config)
      .then(() => {
        this.comment = ''
        this.getComment(movie)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    getComment: function (movie) {
      const config = this.setToken()
      const movieId = movie.id
      axios.get(`${API_URL}/movies/${movieId}/comments/`, config)
      .then((res) => {
        this.comments = res.data
      })
      .catch((err) => {
        console.log(err)
      })
    },
    deleteComment: function (comment, movie) {
      const config = this.setToken()
      const movieId = movie.id
      const commentId = comment.id
      console.log(movieId, commentId)
      axios.post(`${API_URL}/movies/${movieId}/comments/${commentId}`, {}, config)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}

</script>

<style>
hr {
  border-color: #fff
}
.modal-dialog {
  max-width: 60%;
}
.modal-content {
  background-color: black;
  width: 90%;
  max-width: 100%;
  display: block;
}
.modal-content .box{
  height: auto;
  max-width: 100%;
}
.modal-content .box img{
  max-width: 50%;
  height: auto;
  margin: 0 auto;
}
.modal-content .box p{
  white-space:normal;
}

</style>