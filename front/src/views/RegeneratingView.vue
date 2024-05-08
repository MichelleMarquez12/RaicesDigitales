<template>
  <AutoForm :data="autoformbody" v-if="autoform_visible == true" @toggle_autoform="toggle_autoform" @reload-page="emit_reload" :page="this.page">
  </AutoForm>
  <!-- :src="getImgUrl(data.image)" -->
  <div class="regenerating-view" :key="this.compkey">
    <div class="main-data">
      <ModifyButtons :privileges="this.privileges" @modify-component="toggle('main_data')"></ModifyButtons>
      <div v-for="data in main_data" :key="data.id">
        <div class="heading">
          <h1>{{ data.title }}</h1>
        </div>
        <p>{{ data.body }}</p>
        <center><img :src="data.image" class="title-image"> </center>
      </div>
    </div>
    <!-- <center><img src="@/imagenes/imagencuidando.jpg" style="width: 1000px; height: 500px;"> </center><br> -->


    <div style="position: relative;">
      <ModifyButtons :privileges="this.privileges" @modify-component="toggle('separator_data')"></ModifyButtons>
      <div class="separator-data" style="position: relative;">
        <div v-for="data in separator_data" :key="data.id">
          <h2>{{ data.title }}</h2>
        </div>
      </div>
    </div>


    <div class="container" style="position: relative;">
      <ModifyButtons :privileges="this.privileges" @modify-component="toggle('profiles')"></ModifyButtons>
      <div id="profileCarousel" class="carousel slide" data-bs-ride="carousel" style="border-radius: 10px;">
        <div class="carousel-inner" style="border-radius: 10px;">
          <div v-for="(profile, index) in profiles" :key="index" :class="['carousel-item', { 'active': index === 0 }]">
            <img :src="profile.image" alt="Profile Photo" @click="showQuote(profile)">
            <div class="carousel-caption">
              <h1>{{ profile.name }}</h1>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#profileCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#profileCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <!-- Muestra la frase al lado derecho del perfil seleccionado -->
      <div v-if="selectedProfile" class="quote-container">
        <p class="card-text">{{ selectedProfile.quote }}</p>
      </div>
    </div>
    <br>


    <div class="separator2-data" style="position: relative;">
      <ModifyButtons :privileges="this.privileges" @modify-component="toggle('vision')"></ModifyButtons>
      <div v-for="data in vision" :key="data.id">
        <h2>{{ data.title }}</h2><br>
        <p>{{ data.body }}</p>
      </div>
    </div><br>

    <div style="position: relative;">
      <ModifyButtons :privileges="this.privileges" @modify-component="toggle('values')"></ModifyButtons>
      <div class="separator3-data">
        <div v-for="data in values" :key="data.id">
          <h2 class="values-title" v-if="data.title">{{ data.title }}</h2>
        </div>
        <div v-for="data in values" :key="data.id">
          <ul>
            <div>
              <li v-if="data['name']">{{ data['name'] }}</li>
              <span v-if="data.body"><i>"{{ data.body }}..."</i></span>
            </div>
          </ul>
        </div>
      </div>

      <br>

    </div>

  </div>
</template>

<script>
import axios from 'axios';
import ModifyButtons from '@/components/ModifyButtons.vue';
import AutoForm from '@/components/AutoForm.vue';
export default {
  data() {
    return {
      compkey: 0,
      autoform_visible: false,
      page: "regenerating",

      main_data: {
        type: Array
      },
      separator_data: {
        type: Array
      },
      profiles: {
        type: Array
      },
      vision: {
        type: Array
      },
      values: {
        type: Array
      },
      autoformbody: {
        "es": {},
        "en": {}
      }
    };
  },
  props: {
    lan: {
      type: Object
    },
    privileges: {
      type: Boolean,
    }
  },
  methods: {
    showQuote(profile) {
      this.selectedProfile = profile;
    },
    getImgUrl(path) {
      var images = require.context('../imagenes/', false)
      return images('./' + path)
    },
    toggle_autoform() {
      this.autoformbody = {
        "es": {},
        "en": {}
      }
      this.autoform_visible = false;
    },

    toggle(query) {
      axios.post("http://127.0.0.1:8000/RaicesDigitales/regenerating/get/" + query, this.lan).then((result) => {
        this.autoformbody = result.data;
        this.autoformbody['section'] = query;
        setTimeout(() => {
          if (this.compkey == 0) {
            this.compkey += 1
          } else {
            this.compkey -= 1
          }
          this.autoform_visible = true
        }, 1000);
      }).catch(function (error) {
        console.log("Error");
        console.log(error.response);
      }).finally(() => {
        this.loading = !(this.loading);
      });
    },
    emit_reload() {
      this.$emit("reload-page")
    },
    // additem(query) {
    //   axios.post("http://127.0.0.1:8000/RaicesDigitales/regenerating/add/" + query, this.lan).then((result) => {
    //     this.autoformbody = result.data;
    //     this.autoformbody['section'] = query;
    //     setTimeout(() => {
    //       if (this.compkey == 0) {
    //         this.compkey += 1
    //       } else {
    //         this.compkey -= 1
    //       }
    //       this.autoform_visible = true
    //     }, 1000);
    //   }).catch(function (error) {
    //     console.log("Error");
    //     console.log(error.response);
    //   }).finally(() => {
    //     this.loading = !(this.loading);
    //   });
    // },
  },

  created() {
    axios.post("http://127.0.0.1:8000/RaicesDigitales/regenerating/getall", this.lan).then((result) => {
      this.main_data = result.data.regenerating.main_data;
      this.separator_data = result.data.regenerating.separator_data;
      this.profiles = result.data.regenerating.profiles;
      this.values = result.data.regenerating.values;
      this.vision = result.data.regenerating.vision;
    }).catch(function (error) {
      console.log("Error");
      console.log(error.response);
    }).finally(() => {
      this.loading = !(this.loading);
    });
  },
  components: {
    ModifyButtons,
    AutoForm
  }
};
</script>

<style scoped>
.heading {
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin: 20px auto;
  margin-top: 150px;
}

.heading h1 {
  color: var(--main-color);
  margin-bottom: 1.5rem;
  position: relative;
}

.heading h1::after {
  content: "";
  position: absolute;
  width: 100%;
  height: .25rem;
  display: block;
  margin: 0 auto;
  background-color: rgba(30, 92, 52);
}

.heading p {
  color: #666;
  margin-bottom: 2rem;
}

/* *{
  border: 1px solid red;
} */
.regenerating-view {
  padding: 0 10vw;
}

.main-data {
  text-align: left;
  margin-bottom: 50px;
  width: 80vw;
  position: relative; white-space: pre-wrap;
}

.title-image {
  border-radius: 10px;
  width: 80vw;
  max-height: 80vh;
}

.container {
  margin: 0;
  padding: 0 0 0 2vw;
}

.carousel-inner img {
  filter: brightness(0.5);
  border-radius: 10px;
  max-width: 100vw;
  width: 100vw;
  max-height: 100vh;
  overflow: hidden;
}

.carousel-inner .carousel-caption {
  text-shadow: 0 0 3px black;
  background-color: rgba(0, 0, 0, 0.3);
}

.separador1 {
  font-family: monospace;
  font-size: 3em;
}

.quote-container {
  margin-top: 10px;
  padding: 10px;
  background-color: rgb(22, 12, 12);
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}



.separator-data,
.separator2-data {
  width: 102%;
  height: 50px;
  /* Altura de la barra de separación */
  margin: 30px 0 50px 0;
  /* Espaciado superior e inferior */
  background: linear-gradient(to right, #40aa59, #6cd887, #15702a);
  /* Colores de fondo verdes pastel */
  opacity: 0.7;
  /* Opacidad de la barra de separación */
  animation: separatorAnimation 4s ease-in-out infinite;
  /* Animación CSS */
  background-size: 200% 100%;
  /* Doble del tamaño para el desplazamiento */
  border-radius: 10px;
  text-align: left;
  padding: 1vh 0 0 2vw;white-space: pre-wrap;
}

.separator3-data {
  text-align: left;
  margin-bottom: 75px;
  margin-top: 50px;
  z-index: 98;white-space: pre-wrap;
}

.separator3-data span {
  font-size: 0.8rem;
}

.values-title {
  margin-bottom: 20px;
}

@keyframes separatorAnimation {

  0%,
  100% {
    background-position: 100% 0;
    /* Inicia desde la derecha */
  }

  50% {
    background-position: 0 0;
    /* Llega hasta la izquierda */
  }
}
</style>

  