<template>
  <AddButon :privileges="this.privileges" @load-form="toggle_form"></AddButon>
  <GlobalForm @toggle_form="toggle_form" v-if="form_visible == true" :placehoder_obj="this.placehoder_obj"
    :page="this.page" :key="this.compkey" @reload-page="emit_reload"></GlobalForm>

  <ConfirmationComp v-if="confirmation_visible == true" :post="this.delete_obj" :page="this.page" :key="this.compkey"
    @reload-page="emit_reload" @toggle_confirmation="toggle_confirmation"></ConfirmationComp>

  <body style="justify-content: center;">
    <div class="heading">
      <h1 v-for="section in main_data" :key="section.id">{{ section.title }}</h1>
    </div>

    <div class="card-container">
      <MantainingCards v-for="advice in content" :key="advice.id" :content="advice" :privileges="this.privileges"
        @modify="this.modify_form" @delete="this.delete">
      </MantainingCards>
    </div>
  </body>
</template>

<script>
import MantainingCards from '@/components/MantainingCards.vue';
import AddButon from '@/components/AddButon.vue';
import GlobalForm from '@/components/GlobalForm.vue';
import ConfirmationComp from '@/components/ConfirmationComp.vue';

import axios from 'axios';
export default {
  components: {
    MantainingCards,
    AddButon,
    GlobalForm,
    ConfirmationComp,
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
      form_visible: false,
      confirmation_visible: false,
      page: "mantaining",
      compkey: 0,

      main_data: {
        type: Array
      },
      content: {
        type: Array
      },

      placehoder_obj: {
        "es_title": "Titulo...",
        "es_body": "Descripcion...",
        "en_title": "Title...",
        "en_body": "Description...",
        "url": "Insert you url"
      },
      delete_obj: {
        "id": "",
        "title_es": "",
        "title_en": ""
      }
    }
  },
  methods: {
    toggle_form() {
      this.placehoder_obj = {
        "es_title": "",
        "es_body": "",
        "en_title": "",
        "en_body": "",
        "url": "",
        // "visible": ""
      }
      this.form_visible = !this.form_visible
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
          es_array = result.data.mantaining.content;
          es_object = es_array.find(post => post.id == id);
          // console.log(es_object)
        }
      }).catch(function (error) {
        console.log(error)
      })

      axios.post("http://127.0.0.1:8000/RaicesDigitales/" + this.page + "/get", { lan: "EN" }).then((result) => {
        if (result.status == 200) {
          en_array = result.data.mantaining.content;
          en_object = en_array.find(post => post.id == id)
          // console.log(en_object)
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
          "author":es_object.author,
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
          let es_array = result.data.mantaining.content;
          let es_object = es_array.find(post => post.id == id);
          this.delete_obj['title_es'] = es_object.title;
          console.log(es_object)
        }
      }).catch(function (error) {
        console.log(error)
      })

      axios.post("http://127.0.0.1:8000/RaicesDigitales/" + this.page + "/get", { lan: "EN" }).then((result) => {
        if (result.status == 200) {
          let en_array = result.data.mantaining.content;
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
  },
  created() {
    axios.post("http://127.0.0.1:8000/RaicesDigitales/mantaining/get", this.lan).then((result) => {
      console.log(result);
      if (result.status == 200) {
        this.error_handler = false
        this.main_data = result.data.mantaining.main_data;
        this.content = result.data.mantaining.content;
      }
    }).catch(function (error) {
      console.log(error)
    })
  },
}
</script>

<style scoped>
.card-container {
    width: 100%;
    display: flex;
    flex-direction: row;
   flex-wrap: wrap;
    justify-content: center;
    margin-top: 10px;
   
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
</style>

