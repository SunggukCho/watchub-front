<template>
  <div id="favorite">
    <div class="nav">
      <router-link :to="{name: 'Favorite'}" class="innerLink"> 좋아하는 영화</router-link> |
      <router-link :to="{name: 'Already'}" class="innerLink"> 본 영화</router-link> |
      <router-link :to="{name: 'WishList'}" class="innerLink"> 나중에 볼 영화</router-link> 
    </div>
    <h2>내가 좋아하는 영화</h2>
  </div>
</template>

<script>
export default {
  name: 'Favorite',
}
</script>

<style>
.nav {
  display: block;
  padding: 30px;
}
.nav a {
  font-weight: bold;
  color: #d2d7db;
}
.nav a.router-link-exact-active {
  color: #42b983;
}
#favorite{
  text-align: center;
}
.innerLink {
  color: #fff;
  font-size: 1rem;
}
</style>