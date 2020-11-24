<template>
  <div id="recommend">
    <h2>오늘의 추천작!</h2>
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src="https://image.tmdb.org/t/p/original/cj9UsJEN5bNf6ZoF1BbKjKN81hc.jpg" alt="First slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="https://image.tmdb.org/t/p/original/qzCMXEwiH5ym4wBl9EwS8QtCzlN.jpg" alt="Second slide">
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'Recommend',
}

</script>

<style>
#recommend {
  text-align:center;
}
.carousel {
  width: 40%;
  margin: 0 auto;
}
@media (max-width: 576px) {
  .carousel {
    width: 90%;
    margin: 0 auto;
  }
}
@media (max-width: 768px) {
  .carousel {
    width: 70%;
    margin: 0 auto;
  }
}
@media (max-width: 992px) {
  .carousel {
    width: 70%;
    margin: 0 auto;
  }
}
@media (max-width: 1200px) {
  .carousel {
    width: 60%;
    margin: 0 auto;
  }
}
</style>