<template>
  <div>
    <NavBar />
    <div class="container">
      <!-- membuat breaccrumb  -->
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/laporan">Laporan</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            <strong>Detail Laporan</strong>
          </li>
        </ol>
      </nav>
      <!-- membuat card identitas guru  -->
      <div class="card" style="width: 25rem">
        <div class="card-header"><strong>Identitas ASN</strong></div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            {{ this.guruku.nama }}<br />
            NIP. {{ this.guruku.nip }}<br />
          </li>
        </ul>
      </div>
      <hr />
      <!-- membuat card inputan kegiatan  -->
      <div class="card" style="width: auto">
        <div class="card-header"><strong>Input Kegiatan Disini</strong></div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <!-- dibagi dua kolom  -->
            <form class="" v-on:submit.prevent>
              <div class="row">
                <div class="col-md-6">
                  <!-- isi kolom ke 1 -->
                  <!-- -->
                  <label for="nip">Tanggal</label>
                  <div @click="munculkanLaporan">
                    <b-form-datepicker
                      v-model="tanggal"
                      id="datepicker-dateformat2"
                      placeholder="Klik Tanggal"
                      :date-format-options="{
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                      }"
                      locale="en"
                    ></b-form-datepicker>
                  </div>

                  <!--  -->
                  <div class="form-group mt-3">
                    <label for="nip">Hari</label>
                    <select
                      v-model="hari"
                      class="form-control"
                      id="exampleFormControlSelect1"
                    >
                      <option>Senin</option>
                      <option>Selasa</option>
                      <option>Rabu</option>
                      <option>Kamis</option>
                      <option>Jumat</option>
                    </select>
                  </div>
                  <!--  -->
                  <div class="form-group">
                    <label for="nama">Lama Kegiatan (Dalam Menit)</label>
                    <input
                      v-model="durasi"
                      type="number"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label for="nama">Deskripsi Kegiatan</label>
                    <input
                      v-model="kegiatan"
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <button v-on:click="uploadKegiatan" class="btn btn-info">
                    <b-icon-upload></b-icon-upload> Upload
                  </button>
                  <!--  -->
                </div>
                <div class="col-md-6">
                  <!-- isi kolom ke 2  -->
                  <div class="form-group">
                    <label for="nama">Link Foto 1</label>
                    <input
                      v-model="foto1"
                      type="text"
                      class="form-control"
                      placeholder="Wajib link Google Drive"
                    />
                  </div>
                  <div class="form-group">
                    <label for="nama">Link Foto 2</label>
                    <input
                      v-model="foto2"
                      type="text"
                      class="form-control"
                      placeholder="Wajib link Google Drive"
                    />
                  </div>
                  <div class="form-group">
                    <label for="nama">Link Foto 3</label>
                    <input
                      v-model="foto3"
                      type="text"
                      class="form-control"
                      placeholder="Wajib link Google Drive"
                    />
                  </div>
                  <i>Ket. Untuk Foto Minimal satu buah yang diisi</i>
                </div>
              </div>
            </form>
          </li>
        </ul>
      </div>
      <hr />
      <div class="card" style="width: auto">
        <div class="card-header">
          <strong v-if="this.tanggal"
            >List Kegiatan Pada Tanggal
            {{
              this.tanggal.split("-")[2] +
              "-" +
              this.tanggal.split("-")[1] +
              "-" +
              this.tanggal.split("-")[0]
            }}
            <button
              @click="munculkanLaporan"
              class="btn btn-success btn-sm float-right"
            >
              <b-icon-save></b-icon-save> RELOAD
            </button>
            <router-link
              target="blank"
              class="btn btn-info btn-sm float-right mr-1"
              :to="'/cetak/' + this.guruku.nip"
              ><b-icon-printer></b-icon-printer> CETAK
            </router-link>
          </strong>
          <strong v-else
            >Silahkan Tentukan Tanggal Untuk Melihat List Kegiatan</strong
          >
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <!-- tabel list kegiatan disini  -->
            <table id="tabelLaporan" class="table table-hover">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Hari</th>
                  <th>Tanggal</th>
                  <th>Jumlah Menit</th>
                  <th>Uraian Kegiatan</th>
                  <th width="400">Foto</th>
                  <th width="20">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(laporans, index) in laporan" :key="laporans.id">
                  <th>{{ index + 1 }}</th>
                  <td>{{ laporans.hari }}</td>
                  <td>
                    {{ laporans.tanggal }}-{{ laporans.bulan }}-{{
                      laporans.tahun
                    }}
                  </td>
                  <td>{{ laporans.durasi }} Menit</td>
                  <td>{{ laporans.kegiatan }}</td>
                  <td>
                    <span v-if="laporans.foto1.split('/')[5]">
                      <img
                        width="120"
                        :src="
                          'http://drive.google.com/uc?export=view&id=' +
                          laporans.foto1.split('/')[5]
                        "
                      />
                    </span>
                    <span v-if="laporans.foto2.split('/')[5]">
                      <img
                        class="ml-1"
                        width="120"
                        :src="
                          'http://drive.google.com/uc?export=view&id=' +
                          laporans.foto2.split('/')[5]
                        "
                      />
                    </span>
                    <span v-if="laporans.foto3.split('/')[5]">
                      <img
                        class="ml-1"
                        width="120"
                        :src="
                          'http://drive.google.com/uc?export=view&id=' +
                          laporans.foto3.split('/')[5]
                        "
                      />
                    </span>
                  </td>
                  <td>
                    <button
                      class="btn btn-warning btn-sm"
                      @click="hapusLaporan(laporans.id)"
                    >
                      <b-icon-trash></b-icon-trash>
                    </button>
                  </td>
                </tr>
                <tr v-if="this.totalMenit">
                  <td></td>
                  <td></td>
                  <td><strong>Total</strong></td>
                  <td>
                    <strong>{{ this.totalMenit }} Menit</strong>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr v-if="this.totalMenit">
                  <td></td>
                  <td></td>
                  <td>
                    <strong v-if="this.totalMenit < 450" style="color: orange"
                      >Kekurangan</strong
                    >
                    <strong v-if="this.totalMenit > 450" style="color: blue"
                      >Kelebihan</strong
                    >
                  </td>
                  <td>
                    <strong v-if="this.totalMenit < 450"
                      >{{ 450 - this.totalMenit }} Menit</strong
                    >
                    <strong v-if="this.totalMenit > 450"
                      >{{ this.totalMenit - 450 }} Menit</strong
                    >
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <!--  -->
          </li>
        </ul>
      </div>
    </div>
    <FooTer />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import FooTer from "../components/FooTer.vue";
import axios from "axios";
import swal from "sweetalert";
import { API_URL } from "../components/Url";

export default {
  name: "DetailLaporan",
  components: {
    NavBar,
    FooTer,
  },
  data() {
    return {
      guruku: [],
      laporan: [],
      tanggal: "",
      hari: "",
      durasi: "",
      kegiatan: "",
      foto1: "",
      foto2: "",
      foto3: "",
      totalMenit: "",
    };
  },
  methods: {
    uploadKegiatan() {
      // pastikan tidak ada form yang kosong
      if (
        this.tanggal &&
        this.hari &&
        this.durasi &&
        this.kegiatan &&
        this.foto1
      ) {
        axios
          .post(API_URL + "laporan", {
            nip: this.guruku.nip,
            tanggal: this.tanggal.split("-")[2],
            bulan: this.tanggal.split("-")[1],
            tahun: this.tanggal.split("-")[0],
            hari: this.hari,
            durasi: this.durasi,
            kegiatan: this.kegiatan,
            foto1: this.foto1,
            foto2: this.foto2,
            foto3: this.foto3,
          })
          .then(() => {
            swal("Terima Kasih", "Kegiatan Berhasil Di Upload", "success", {
              timer: 2000,
              button: false,
            });
            this.durasi = "";
            this.kegiatan = "";
            this.foto1 = "";
            this.foto2 = "";
            this.foto3 = "";
          })
          .catch();
      } else {
        swal("Peringatan", "Daftar Isian Belum Lengkap", "warning", {
          timer: 2000,
          button: false,
        });
      }
    },
    munculkanLaporan() {
      //munculkal laporan
      axios
        .post(API_URL + "laporan-khusus", {
          nip: this.guruku.nip,
          tanggal: this.tanggal.split("-")[2],
          bulan: this.tanggal.split("-")[1],
          tahun: this.tanggal.split("-")[0],
        })
        .then((response) => {
          this.laporan = response.data;
          // console.log("list laporan loaded");
        })
        .catch();
      // munculkan jumlah menit
      axios
        .post(API_URL + "laporan-sum", {
          nip: this.guruku.nip,
          tanggal: this.tanggal.split("-")[2],
          bulan: this.tanggal.split("-")[1],
          tahun: this.tanggal.split("-")[0],
        })
        .then((response) => {
          this.totalMenit = response.data;
          // console.log(response);
        })
        .catch();
    },
    hapusLaporan(id) {
      swal({
        title: "Yakin Akan Menghapus Ini ?",
        text: "Kegiatan ini akan terhapus secara permanen",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          // skrip delete
          axios
            .delete(API_URL + "laporan/" + id)
            .then(() => {
              //munculkan laporan
              axios
                .post(API_URL + "laporan-khusus", {
                  nip: this.guruku.nip,
                  tanggal: this.tanggal.split("-")[2],
                  bulan: this.tanggal.split("-")[1],
                  tahun: this.tanggal.split("-")[0],
                })
                .then((response) => {
                  this.laporan = response.data;
                  console.log("list laporan loaded");
                })
                .catch();
              // munculkan jumlah menit
              axios
                .post(API_URL + "laporan-sum", {
                  nip: this.guruku.nip,
                  tanggal: this.tanggal.split("-")[2],
                  bulan: this.tanggal.split("-")[1],
                  tahun: this.tanggal.split("-")[0],
                })
                .then((response) => {
                  this.totalMenit = response.data;
                  // console.log(response);
                })
                .catch();
            })
            .catch();
          //
          swal("Kegiatan Telah Dihapus", {
            icon: "success",
          });
        } else {
          // swal("Sip, Data Anda Aman !");
        }
      });
    },
  },
  mounted() {
    axios
      .get(API_URL + "guru/" + this.$route.params.id)
      .then((response) => {
        this.guruku = response.data;
      })
      .catch();
  },
};
</script>

<style>
</style>