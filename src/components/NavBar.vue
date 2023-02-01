<template>
  <div>
    <b-navbar toggleable="sm" type="light" variant="light">
    <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

    <b-navbar-brand><img src="../assets/images/jabar.png" width="30"> APK P3K</b-navbar-brand>

    <b-collapse id="nav-text-collapse" is-nav class="ml-3">
      <b-navbar-nav>
        <router-link to="/laporan" id="nav-link"><b-icon-card-list></b-icon-card-list> Laporan</router-link>
      </b-navbar-nav>
      <b-navbar-nav>
        <router-link to="/tutorial" id="nav-link"><b-icon-camera-video></b-icon-camera-video> Tutorial</router-link>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style>
</style>