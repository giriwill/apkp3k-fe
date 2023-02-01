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
          <li class="breadcrumb-item active" aria-current="page">
            <strong>Laporan</strong>
          </li>
        </ol>
      </nav>
      <!-- membuat form pencarian  -->
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-text"><b-icon-search></b-icon-search></div>
        </div>
        <input
          type="text"
          class="form-control"
          id="inlineFormInputGroup"
          placeholder="Ketikan Nama Yang Dicari..."
          v-model="pilarian"
          @keyup="pilarianGuru"
        />
      </div>
      <!-- membuat card list guru  -->
      <div class="row">
        <div
          id="card-cols"
          class="col-md-3"
          v-for="gurukus in guruku"
          :key="gurukus.id"
        >
          <div class="card bg-light mb-3" style="max-width: 18rem">
            <div class="card-header">
              NIP. {{ gurukus.nip }}              
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ gurukus.nama }}</h5>
              <router-link
                :to="'/laporan/' + gurukus.id"
                class="btn btn-info btn-sm"
                ><b-icon-receipt></b-icon-receipt> Isi Laporan</router-link
              > 
              <!-- tombol edit  -->
              <b-button @click="setGuruToEdit(gurukus.id)" v-b-modal.modal-1 hide-footer size="sm" style="color:grey" variant="link" class="float-right"><b-icon-pencil-square></b-icon-pencil-square></b-button>
              <!--  -->
            </div>
          </div>
        </div>
        <!-- disclaimer  -->
        <div class="row">
          <h4>
            <span class="badge badge-info ml-5"
              >Guru Tidak Ditampilakan Semua, Silahkan Ketikan Nama Guru Untuk
              Mencarinya..</span
            >
          </h4>
        </div>
      </div>
      <!-- modal edit biodata  -->      
      <div>
      <b-modal
        id="modal-1"
        title="Edit Biodata"
        ref="modalku"
        hide-footer
      >
        <form class="" v-on:submit.prevent>
          <div class="form-group">
            
            <label for="nip">NIP</label>
            <input type="hidden" class="form-control" v-model="this.$route.params.id" />
            <input type="number" class="form-control" v-model="nip" />
          </div>
          <div class="form-group">
            <label for="nama">Nama</label>
            <input type="text" class="form-control" v-model="nama" />
          </div>
          <button class="btn btn-success btn-sm" @click="editGuru">
            <b-icon-pencil-fill></b-icon-pencil-fill> Edit
          </button>
        </form>
      </b-modal>
      </div>
      <!-- selesai   -->
    </div>
    <FooTer />
  </div>
</template>

<script>
import axios from "axios";
import NavBar from "../components/NavBar.vue";
import FooTer from "../components/FooTer.vue";
import swal from 'sweetalert';
import {API_URL} from "../components/Url"

export default {
  name: "LaporanView",
  components: {
    NavBar,
    FooTer,
  },
  data() {
    return {
      guruku: [],
      pilarian: "",
      id:"",
      nip:"",
      nama:""
    };
  },
  methods: {
    pilarianGuru() {
      if (this.pilarian == "") {
        axios
          .get(API_URL+"guru")
          .then((response) => {
            this.guruku = response.data;
            // console.log(response.data);
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .get(API_URL+"guru-cari/" + this.pilarian)
          .then((response) => {
            this.guruku = response.data;
            // console.log(response.data);
          })
          .catch((err) => console.log(err));
      }
    },
    setGuruToEdit(val){
      this.id = val;
      axios
      .post(API_URL+"guru-edit/",{id:val})
      .then((response) => {
        this.nip = response.data.nip
        this.nama = response.data.nama
      })
      .catch()
    },
    editGuru(){
      axios
      .put(API_URL+"guru/"+this.id,{nip:this.nip,nama:this.nama})
      .then((response) => {
        this.$refs["modalku"].hide();
        swal("Selamat", "Data Anda Sudah Dirubah", "success", {
          timer: 2000,
          button: false,          
        });
         //list semua data guru
          axios
            .get(API_URL+"guru")
            .then((response) => {
              this.guruku = response.data;
              // console.log(response.data);
            })
            .catch((err) => console.log(err));
      })
      .catch()
    }

  },
  mounted() {
    //list semua data guru
    axios
      .get(API_URL+"guru")
      .then((response) => {
        this.guruku = response.data;
        // console.log(response.data);
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style>
</style>