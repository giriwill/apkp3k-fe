<template>
  <div>
    <NavBar />
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <strong>Tutorial Penggunaan APK P3K</strong>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/w7OKw_GH2Uk"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <strong>Fitur Untuk Guru Yang Ingin Validasi 1 Minggu Sekali</strong>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/5jfUSOYaxuc"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <strong>Fitur Edit Nama Guru</strong>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/X5OSyG0mjN4"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
    <FooTer />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import FooTer from "../components/FooTer.vue";

export default {
  name: "TutorialView",
  components: {
    NavBar,
    FooTer,
  },
};
</script>

<style>
</style>