<template>
  <div>
    <NavBar />
    <div class="container mt-3">
      <div class="row">
        <!-- card ke 2  -->
        <div class="col-md-5">
          <div class="card" style="width: 25rem">
            <div class="card-header">
              <strong>Properties</strong>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                Nama Sekolah<br />
                <input class="form-control mb-1" v-model="smk" />
                Nama Kepala Sekolah
                <input class="form-control mb-1" v-model="kepsek" />
                NIP Kepala Sekolah
                <input class="form-control mb-1" v-model="nipkepsek" />
                Titi Mangsa
                <input class="form-control mb-1" v-model="tmt" />
                <input type="checkbox" v-model="agreement" name="agreement" />
                <label for="agreement" class="ml-2">
                  Saya Setuju NIP Saya Dicetak </label
                ><br />
                <input type="checkbox" v-model="printttd" name="printttd" />
                <label for="printttd" class="ml-2">
                  Memakai Cover dan Tanda Tangan </label>                
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-5">
          <!-- card penginputan kriteria  -->
          <div class="card" style="width: 25rem">
            <div class="card-header">
              <strong
                >Print Laporan Bulanan Tahun
                <span style="color: orange">{{ this.tahun }}</span></strong
              >
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <div class="form-group">
                  <label for="Labelku">Pilih Bulan</label>
                  <select
                    class="custom-select"
                    v-model="bulan"
                    @change="bulanDipilih"
                  >
                    <option value="01" selected>Januari</option>
                    <option value="02">Februari</option>
                    <option value="03">Maret</option>
                    <option value="04">April</option>
                    <option value="05">Mei</option>
                    <option value="06">Juni</option>
                    <option value="07">Juli</option>
                    <option value="08">Agustus</option>
                    <option value="09">September</option>
                    <option value="10">Oktober</option>
                    <option value="11">November</option>
                    <option value="12">Desember</option>
                  </select>
                </div>
              </li>
              <li class="list-group-item">
                <button class="btn btn-info btn-sm" @click="print">
                  <b-icon-printer></b-icon-printer> Cetak
                </button>
              </li>
            </ul>
          </div>
          <!--  -->
          <!-- Costumize -->
          <div class="card mt-2" style="width: 25rem">
            <div class="card-header">
              <input type="checkbox" v-model="kolhilang" name="kolhilang" />
              <label for="kolhilang" class="ml-2">
                <strong>Mode Edit</strong>
              </label>
            </div>
            <ul :hidden="!kolhilang" class="list-group list-group-flush">
              <li class="list-group-item">
                <div class="row">
                  <div class="col">
                    <input v-model="dariNomor" type="number" placeholder="Dari Nomor " class="form-control mb-1"/>
                    <input v-model="sampaiNomor" type="number" placeholder="Sampai Nomor " class="form-control"/>
                  </div>
                  <div class="col">
                    <button @click="hilangkanKegiatan(dariNomor,sampaiNomor)" class="btn btn-info btn-sm">Hilangkan Sekaligus</button><br>
                    <span style="font-size:12px"><i>* matikan kembali mode edit sebelum mencetak</i></span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!--  -->
        </div>
      </div>
      <!-- disini preview laporan  -->
      <div id="printMe">
        <div class="row mt-3">
          <div class="col">
            <table
              border="1"
              style="font-size: small"
              width="100%"
              cellpadding="5px"
            >
              <tr :hidden="!printttd">
                <td colspan="8" align="center" :hidden="!printttd">
                  <strong
                    >LAPORAN KINERJA HARIAN P3K/NON ASN TENAGA KEPENDIDIKAN</strong
                  >
                </td>
              </tr>
              <tr :hidden="!printttd">
                <td colspan="8" align="center">
                  <strong>{{ this.smk }}</strong>
                </td>
              </tr>
              <tr :hidden="!printttd">
                <td colspan="8" align="center">
                  CABANG DINAS PENDIDIKAN WILAYAH XIII
                </td>
              </tr>
              <tr :hidden="!printttd">
                <td colspan="8">NAMA : {{ this.nama }}</td>
              </tr>
              <tr :hidden="!printttd">
                <td colspan="8">BULAN : {{ namanamaBulan(this.bulan) }}</td>
              </tr>
              <tr :hidden="!printttd">
                <td align="center"><strong> No.</strong></td>
                <td align="center"><strong> Hari</strong></td>
                <td align="center"><strong> Tanggal</strong></td>
                <td align="center">
                  <strong> Dari Jam</strong>
                </td>
                <td align="center">
                  <strong> Sampai Jam</strong>
                </td>
                <td align="center">
                  <strong> Uraian Pekerjaan</strong>
                </td>
                <td align="center"><strong> Foto</strong></td>
                <td align="center"><strong> Paraf</strong></td>
              </tr>
              <tr
                :hidden="!printttd"
                style="background-color: grey; color: white"
              >
                <td align="center">1</td>
                <td align="center">2</td>
                <td align="center">3</td>
                <td align="center">4</td>
                <td align="center">5</td>
                <td align="center">6</td>
                <td align="center">7</td>
                <td align="center">8</td>
              </tr>
              <tr v-for="(laporans, index) in laporan" :key="laporans.id">
                <td align="center" width="10" :hidden="baris[index + 1]">
                  {{ index + 1 }}
                </td>
                <td align="center" width="70" :hidden="baris[index + 1]">
                  {{ laporans.hari }}
                </td>
                <td align="center" width="90" :hidden="baris[index + 1]">
                  {{ laporans.tanggal }}-{{ laporans.bulan }}-{{
                    laporans.tahun
                  }}
                </td>
                <td align="center" width="80" :hidden="baris[index + 1]">
                  {{ laporans.dari }} Menit
                </td>
                <td align="center" width="80" :hidden="baris[index + 1]">
                  {{ laporans.sampai }} Menit
                </td>
                <td align="left" width="300" :hidden="baris[index + 1]">
                  {{ laporans.kegiatan }}
                </td>
                <td align="center" :hidden="baris[index + 1]">
                  <span v-if="laporans.foto1.split('/')[5]">
                    <img
                      class="mr-2"
                      width="150"
                      :src="
                        'http://drive.google.com/uc?export=view&id=' +
                        laporans.foto1.split('/')[5]
                      "
                    />
                  </span>
                  <span v-if="laporans.foto2.split('/')[5]">
                    <img
                      class="mr-2"
                      width="120"
                      :src="
                        'http://drive.google.com/uc?export=view&id=' +
                        laporans.foto2.split('/')[5]
                      "
                    />
                  </span>
                  <span v-if="laporans.foto3.split('/')[5]">
                    <img
                      class="mr-2"
                      width="120"
                      :src="
                        'http://drive.google.com/uc?export=view&id=' +
                        laporans.foto3.split('/')[5]
                      "
                    />
                  </span>
                </td>
                <td align="center" width="100" :hidden="baris[index + 1]"></td>
                <td align="center" :hidden="!kolhilang">
                  <input
                    type="checkbox"
                    v-model="baris[index + 1]"
                    name="barisu"
                  />
                  <label for="barisu" class="ml-2" style="font-size: 10px">
                    Hilangkan
                  </label>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <!--  -->
        <!-- tanda tangan  -->
        <div class="row mt-3" :hidden="!printttd">
          <div class="col">
            <table width="100%" border="0">
              <tr>
                <td align="left">
                  Kepala SMKN 1 Padaherang
                  <br /><br /><br />
                  <u>{{ this.kepsek }}</u>
                  <br />
                  NIP. {{ this.nipkepsek }}
                </td>
                <td align="right">
                  Pangandaran, {{ this.tmt }} {{ namanamaBulan(this.bulan) }}
                  {{ this.tahun }} <br /><br /><br />
                  <u>{{ this.nama }}</u>
                  <br />
                  <div :hidden="!agreement">
                    NIP. {{ this.$route.params.nip }}
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <!--  -->
      </div>
    </div>
    <FooTer />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import FooTer from "../components/FooTer.vue";
import axios from "axios";
import { API_URL } from "../components/Url";

let date = new Date().getFullYear();

export default {
  name: "CetakLaporan",
  components: {
    NavBar,
    FooTer,
  },
  data() {
    return {
      bulan: "",
      tahun: date,
      nama: "",
      laporan: [],
      output: null,
      smk: "SMK NEGERI 1 PADAHERANG",
      kepsek: "Drs. NGADINO RIADI, M.Pd",
      nipkepsek: "19660116 198610 1 001",
      nip: "",
      tmt: "",
      agreement: false,
      printttd: false,
      baris: [],
      kolhilang: false,
      dariNomor:"",
      sampaiNomor:"",
    };
  },
  methods: {
    bulanDipilih() {
      //cari nama guru
      axios
        .get(API_URL + "guru-nip/" + this.$route.params.nip)
        .then((response) => {
          this.nama = response.data.nama;
        })
        .catch();
      //get laporan bulanan
      axios
        .post(API_URL + "laporan-bulan/", {
          nip: this.$route.params.nip,
          bulan: this.bulan,
        })
        .then((response) => {
          this.laporan = response.data;
        })
        .catch();
    },
    namanamaBulan(nomor) {
      if (nomor == "01") {
        return "Januari";
      } else if (nomor == "02") {
        return "Februari";
      } else if (nomor == "03") {
        return "Maret";
      } else if (nomor == "04") {
        return "April";
      } else if (nomor == "05") {
        return "Mei";
      } else if (nomor == "06") {
        return "Juni";
      } else if (nomor == "07") {
        return "Juli";
      } else if (nomor == "08") {
        return "Agustus";
      } else if (nomor == "09") {
        return "September";
      } else if (nomor == "10") {
        return "Oktober";
      } else if (nomor == "11") {
        return "November";
      } else {
        return "Desember";
      }
    },
    print() {
      // Pass the element id here
      this.$htmlToPaper("printMe");      
    },
    hilangkanKegiatan(awal,akhir) {
      var i = 0;
      for (i = awal; i <= akhir; i++) {
        this.baris[i] = true;
      }
      //cari nama guru
      axios
        .get(API_URL + "guru-nip/" + this.$route.params.nip)
        .then((response) => {
          this.nama = response.data.nama;
        })
        .catch();
      //get laporan bulanan
      axios
        .post(API_URL + "laporan-bulan/", {
          nip: this.$route.params.nip,
          bulan: this.bulan,
        })
        .then((response) => {
          this.laporan = response.data;
        })
        .catch();
    },
  },
  mounted() {
    // this.hilangkanKegiatan(1, 5);
    // console.log(baris);
  },
};
</script>

<style>
</style>