<template>
  <div>
    <NavBar/>
    <!-- disini HERO  -->
    <div class="container mt-3">
      <div class="row">
        <div class="col-md-6">
          <div class="d-flex h-100">
            <div class="float-right align-self-center text-left">
              <h1><strong>Wilujeng Sumping</strong></h1>
              <h3>di <strong>APK P3K</strong></h3>
              <p>
                <b>A</b>plikasi <br /><b>P</b>elaporan <br /><b>K</b>inerja
                <br /><b>P</b>egawai <b>P</b>emerintah dalam <b>P</b>erjanjian
                <b>K</b>erja dan Non ASN
              </p>
              <marquee behavior="slow" direction="">Sudah Bisa Digunakan Oleh Tenaga Kependidikan</marquee>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <img src="../assets/images/kerja.svg" width="500" />
        </div>
      </div>
    </div>
    <!-- HERO selesai  -->
    <!-- mulai MODAL  -->
    <div class="container">
      <b-button v-b-modal.modalPopover
        ><b-icon-person-circle></b-icon-person-circle> Registrasi</b-button
      >
    </div>
    <div>
      <b-modal
        id="modalPopover"
        title="Isilah Formulir di Bawah ini"
        ref="modalku"
        hide-footer
      >
        <form class="" v-on:submit.prevent>
          <div class="form-group">
            <label for="nip">NIP</label>
            <input type="number" class="form-control" v-model="nip" />
          </div>
          <div class="form-group">
            <label for="nama">Nama</label>
            <input type="text" class="form-control" v-model="nama" />
          </div>
          <div class="form-group">
            <label for="nama">Jenis Pegawai</label>
            <select class="form-control" v-model="jenis">
              <option value="guru">GURU</option>
              <option value="tu">Tata Usaha</option>
            </select>
          </div>
          <button class="btn btn-success" v-on:click="mulaiRegistrasi">
            <b-icon-upload></b-icon-upload> Submit
          </button>
        </form>
      </b-modal>
    </div>
    <!-- selesai MODAL  -->
    <!-- chart bar disini  -->
    <div class="container">
      <div class="row">
        <div class="col">

        <GChart
          type="ColumnChart"
          :data="chartData"
          :options="chartOptions"
        />
        </div>
      </div>
    </div>
    <!--  -->
    <FooTer/>
  </div>
</template>

<script>
import swal from "sweetalert";
import axios from "axios";
import NavBar from "../components/NavBar.vue";
import FooTer from "../components/FooTer.vue";
import {API_URL} from "../components/Url.js";
import { GChart } from 'vue-google-charts/legacy';

export default {
  name: "HomeView",
    components: {
    NavBar,
    FooTer,
    GChart
  },
  data() {
    return {
      nip: "",
      nama: "",
      jenis: "",
      dataASN:[],
      chartData: [
        ['ASN', 'Jumlah Laporan']
      ],
      chartOptions: {
        title: 'Rekaman Pelaporan Kinerja',
        width: 1020,
        height: 400,
      }
    };
  },
  mounted(){
    axios
    .get(API_URL+"hitunglaporan")
    .then((response) => {
      response.data.forEach(element => {
        axios
        .get(API_URL+"guru-nip/"+element.nip)
        .then((resp)=>{
          this.dataASN = [resp.data.nama,element.count];
          this.chartData.push(this.dataASN);
          })
        .catch()
      });
    })
    .catch()
    //coba local storage
  },
  methods: {
    mulaiRegistrasi() {
      if (this.nip && this.nama && this.jenis) {
        //pengecekan data guru
        axios
          .post(API_URL+"gurucek", { nip: this.nip })
          .then((response) => {
            // jika tidak ada nip yang sama
            if (response.data != 1) {
              axios
                .post(API_URL+"guru", {
                  nama: this.nama,
                  nip: this.nip,
                  jenis: this.jenis,
                })
                .then(() => {
                  swal("Terima Kasih", "Anda Sudah Didaftarkan", "success", {
                    timer: 2000,
                    button: false,
                  });
                  this.$refs["modalku"].hide();
                  this.nama = "";
                  this.nip = "";
                })
                .catch((err) => console.log(err));
            } else {
              swal("Peringatan", "NIP Anda Sudah Pernah Didaftarkan", "warning", {
                timer: 2000,
                button: false,
              });
            }
          })
          .catch((err) => console.log(err));
      } else {
        swal("Peringatan", "Formulir Belum Lengkap", "warning", {
          timer: 2000,
          button: false,
        });
      }
    },
  },
  
};
</script>

<style></style>
