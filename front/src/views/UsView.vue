<template>
  <AddButon :privileges="this.privileges" @load-form="toggle_form"></AddButon>

  <AutoForm v-if="autoform_visible == true" @toggle_autoform="toggle_autoform" @reload-page="emit_reload"
    :page="this.page" :data="this.formdata">
  </AutoForm>

  <GlobalForm @toggle_form="toggle_form" v-if="form_visible == true" :placehoder_obj="this.placehoder_obj"
    :page="this.page" :key="this.compkey" @reload-page="emit_reload"></GlobalForm>

  <ConfirmationComp v-if="confirmation_visible == true" :post="this.delete_obj" :page="this.page" :key="this.compkey"
    @reload-page="emit_reload" @toggle_confirmation="toggle_confirmation"></ConfirmationComp>

  <div>
    <div class="info">
      <ModifyButtons :privileges="this.privileges" @modify-component="show_us"></ModifyButtons>
      <div class="heading">
        <h1>{{ main_data.title }}</h1>
      </div>

      <div class="separator-data">
        <h1>{{ main_data.history_title }}</h1>
      </div>
      <p class="text_us">{{ main_data.history }}</p>


      <div class="separator-data">
        <h1>{{ main_data.organization_title }}</h1>
      </div>
      <p class="text_us">{{ main_data.organization }}</p>

    </div>


    <body style="display: flex; justify-content: center; padding-top: 3rem">

      <div class="card-container" v-for="data in content" :key="data.id">
        <ModifyButtons :privileges="this.privileges" @modify-component="this.modify_form"
          @delete-compomodify-component="this.delete" :deletable="true"></ModifyButtons>
        <div class="card">
          <div class="front-content">
            <div>
              <img :src="data.image" style="border-radius: 2em">
            </div>
          </div>
          <div class="content">
            <div>
              <p class="name">{{ data.title }}</p><br>
              <p class="subtitle">{{ data.body }}</p>
            </div>
          </div>
        </div>
      </div>

    </body>

  </div>
</template>


<script>
import axios from 'axios';
import AddButon from '@/components/AddButon.vue';
import ModifyButtons from '@/components/ModifyButtons.vue';
import GlobalForm from '@/components/GlobalForm.vue';
import AutoForm from '@/components/AutoForm.vue';
export default {
  components: {
    AddButon, ModifyButtons, GlobalForm, AutoForm
  },
  props: {
    lan: {
      type: Object
    },
    privileges: {
      type: Boolean
    }
  },
  data() {
    return {
      compkey: 0,
      autoform_visible: false,
      form_visible: false,
      page: "us",

      main_data: {
        type: Array
      },
      content: {
        type: Array
      },
      formdata: {},
      error_handler: true,
    };
  },
  created() {
    axios.post("http://127.0.0.1:8000/RaicesDigitales/us/get", this.lan).then((result) => {

      if (result.status == 200) {
        this.error_handler = false
        this.main_data = result.data.us.main_data;
        this.content = result.data.us.content;
      }
    }).catch(function (error) {
      console.log(error)
    })
    axios.post("http://127.0.0.1:8000/RaicesDigitales/usfetch/get", this.lan).then((result) => {

      if (result.status == 200) {
        this.formdata = result.data;

      }
    }).catch(function (error) {
      console.log(error)
    })


  },
  mounted() {
    axios.post("http://127.0.0.1:8000/RaicesDigitales/us/get", this.lan).then((result) => {
      console.log(result)
      if (result.status == 200) {
        this.error_handler = false
        this.main_data = result.data.us.main_data;
        this.content = result.data.us.content;
      }
    }).catch(function (error) {
      console.log(error)
    })
    axios.post("http://127.0.0.1:8000/RaicesDigitales/usfetch/get", this.lan).then((result) => {
      console.log(result)
      if (result.status == 200) {
        this.formdata = result.data;

      }
    }).catch(function (error) {
      console.log(error)
    })
  },

  methods: {
    toggle_form() {
      this.placehoder_obj = {
        "es_title": "",
        "es_body": "",
        "en_title": "",
        "en_body": "",
        "url": "",
        // "visible": "" quitarle a las demás pages también
      }
      this.form_visible = !this.form_visible
    },
    toggle_autoform() {
      this.autoformbody = {
        "es": {},
        "en": {}
      }
      this.autoform_visible = false;
    },
    show_us() {
      this.autoform_visible = true;
    },
    toggle_confirmation() {
      this.delete_obj = {
        "id": "",
        "title_es": "",
        "title_en": ""
      }
      this.confirmation_visible = !this.confirmation_visible
    },
    modify_form(id) {
      var es_array;
      var en_array;
      var es_object;
      var en_object;

      axios.post("http://127.0.0.1:8000/RaicesDigitales/" + this.page + "/get", { lan: "ES" }).then((result) => {
        console.log(result)
        if (result.status == 200) {
          es_array = result.data.us.content;
          es_object = es_array.find(post => post.id == id);
          console.log(es_object)
        }
      }).catch(function (error) {
        console.log(error)
      })

      axios.post("http://127.0.0.1:8000/RaicesDigitales/" + this.page + "/get", { lan: "EN" }).then((result) => {
        if (result.status == 200) {
          en_array = result.data.us.content;
          en_object = en_array.find(post => post.id == id)
          console.log(en_object)
        }
      }).catch(function (error) {
        console.log(error)
      })

      setTimeout(() => {

        this.placehoder_obj = {
          "id": id,
          "es_title": es_object.title,
          "es_body": es_object.body,
          "en_title": en_object.title,
          "en_body": en_object.body,
          "url": es_object.image,
          "visible": es_object.visible
        }

        if (this.compkey == 0) {
          this.compkey += 1
        } else {
          this.compkey -= 1
        }
        this.form_visible = !this.form_visible
      }, 1000);


    },
    emit_reload() {
      this.$emit("reload-page")
    },
    delete(id) {
      this.delete_obj["id"] = id;

      axios.post("http://127.0.0.1:8000/RaicesDigitales/" + this.page + "/get", { lan: "ES" }).then((result) => {
        console.log(result)
        if (result.status == 200) {
          let es_array = result.data.us.content;
          let es_object = es_array.find(post => post.id == id);
          this.delete_obj['title_es'] = es_object.title;
          console.log(es_object)
        }
      }).catch(function (error) {
        console.log(error)
      })

      axios.post("http://127.0.0.1:8000/RaicesDigitales/" + this.page + "/get", { lan: "EN" }).then((result) => {
        if (result.status == 200) {
          let en_array = result.data.us.content;
          let en_object = en_array.find(post => post.id == id)
          this.delete_obj['title_en'] = en_object.title;
          console.log(en_object)
        }
      }).catch(function (error) {
        console.log(error)
      })

      setTimeout(() => {

        if (this.compkey == 0) {
          this.compkey += 1
        } else {
          this.compkey -= 1
        }
        this.confirmation_visible = !this.confirmation_visible
      }, 1000);

    }

  }
};
</script>

<style scoped>
/* *{
  border: 1px solid red;
} */

body {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  z-index: -1;
}

.info {
  position: relative;
  z-index: 0;
}

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

.separator-data {
  width: 80%;
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
  padding: 1vh 0 0 2vw;
  margin-left: 10%; white-space: pre-wrap;
}

.text_us {
  width: 80%;
  margin-left: 10%;
  color: black; white-space: pre-wrap;
}

.card-container {
  margin: 1vw 1vw;
  width: 20%;
  height: 300px;
  position: relative;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.card {
  width: 100%;
  height: 100%;
  border-radius: inherit;
}

.card .front-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1)
}

.card .front-content p {
  font-size: 32px;
  font-weight: 700;
  opacity: 1;
  background: linear-gradient(-45deg, rgba(30, 92, 52) 0%, rgb(39, 145, 76) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1)
}

.card .content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;
  background: linear-gradient(-45deg, rgba(30, 92, 52) 0%, rgb(39, 145, 76) 100%);
  color: #e8e8e8;
  padding: 20px;
  line-height: 1.5;
  border-radius: 5px;
  pointer-events: none;
  transform: translateX(-96%);
  transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
}

.card .content .heading {
  font-size: 32px;
  font-weight: 700;
}

.card:hover .content {
  transform: translateY(0);
}

.card:hover .front-content {
  transform: translateX(-30%);
}

.card:hover .front-content p {
  opacity: 0;
}


.name {
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin: 20px auto 0 auto;
  font-size: 1.6rem;
}

.subtitle {
  margin-top: 0;
  font-size: 0.8rem; white-space: pre-wrap;
}
</style>

