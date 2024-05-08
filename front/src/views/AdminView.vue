<template>
  <!-- Aqui agregen un selector entre comentarios y soporte yo lo hago funcionar -->
  <div class="admin-panel" >
    <!-- Agrengenle por aquí un boton de salida y yo lo hago funcionar -->


    <div class="list">
      <div class="selector">
        <select name="introducir_asunto" required ref="asunto" v-model="section" @change="changeContent">
          <option value="comments" selected>Comentarios/Comments</option>
          <option value="support">Soporte técnico/Technical support</option>
        </select>
      </div>
      <ul>
        <li v-for="message in messages" :key="message.id" v-on:click="openMessage(message.id)">
          <div v-if="message.status == 'unwatched'" class="message-card">
            <p>{{ message.time }}</p>
            <p>{{ message.message ? truncateText(message.message, 30) : '' }}</p>
          </div>
          <div v-else class="message-card" style="background-color: gray;">
            <p> {{ message.time }}</p>
            <p>{{ message.message ? truncateText(message.message, 30) : '' }}</p>
          </div>
        </li>
      </ul>

    </div>
    <div class="form-container">
      <div :key="compkey" class="content-container" v-if="content_container_visible == true">
        <div class="card">
          <button type="button" class="button-close" v-on:click="close_this"><img src="@/assets/close.png"  alt=""></button>
          <span class="title">Comentario</span>
          <form class="form">
            <div class="group">
              <label for="name">Nombre</label>
              <p>{{ this.body.name }}</p>
            </div>
            <div class="group">
              <label for="email">Correo</label>
              <p>{{ this.body.email }}</p>
            </div>
            <div class="group">
              <label for="phone">Telefono</label>
              <p>{{ this.body.phone }}</p>
            </div>
            <div class="group">
              <label for="comment">Comentario</label>
              <p>{{ this.body.message }}</p>
            </div>
            <div class="buttons-div">
              <button type="button" class="button-delete" v-on:click="delet(this.body.id)"><img
                  src="@/assets/deleteIcon.png" alt=""></button>

            </div>
          </form>
        </div>


        <!-- Los campos puedes verlos en mongo en el documento que se llama comments -->


      </div>
      <!-- Agregar un boton para borrar mensajes -->


    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "AdminPanel",
  data() {
    return {
      content_container_visible: false,
      compkey: 0,
      section: "comments",
      messages: [],
      body: {}
    }

  },
  methods: {
    openMessage(id) {
      this.body = this.messages.find((element) => element.id == id);
      var submit_obj = {
        "new_array": {},
        "section": this.section
      }

      submit_obj['new_array'] = this.messages.map(function (message) {
        if (message.id == id) {
          message.status = 'watched';
        }
        return message;
      });
      axios.post("http://127.0.0.1:8000/RaicesDigitales/messages/updateStatus", submit_obj).then((result) => {
        console.log(result)
      }).catch(function (error) {
        console.log("Error");
        console.log(error.response);
      }).finally(() => {
        this.loading = !(this.loading);
      });
      if (this.compkey == 0) {
        this.compkey += 1
      } else {
        this.compkey -= 1
      }
      this.content_container_visible = true
    },
    delet(id) {
      console.log(id);
      console.log(this.messages)
      var temp_array = this.messages.filter(comment => comment.id != id);
      var send_obj = {
        "section": this.section,
        "new_array": temp_array
      }
      axios.post("http://127.0.0.1:8000/RaicesDigitales/messages/delete", send_obj).then((result) => {
        console.log(result)
      }).catch(function (error) {
        console.log("Error");
        console.log(error.response);
      }).finally(() => {
        this.content_container_visible=false
        this.changeContent();

      });

    },
    changeContent() {
      axios.post("http://127.0.0.1:8000/RaicesDigitales/messages/" + this.section).then((result) => {
        var temp_array = result.data
        this.messages = temp_array.reverse()
      }).catch(function (error) {
        console.log("Error");
        console.log(error.response);
      }).finally(() => {
        if (this.compkey == 0) {
          this.compkey += 1
        } else {
          this.compkey -= 1
        }
      });

    },
    truncateText(text, limit) {
      return text.length > limit ? text.slice(0, limit) + '...' : text;
    },close_this(){
      this.content_container_visible = false;
    }
  },
  mounted() {
    axios.post("http://127.0.0.1:8000/RaicesDigitales/messages/" + this.section).then((result) => {
      var temp_array = result.data
      this.messages = temp_array.reverse()
    }).catch(function (error) {
      console.log("Error");
      console.log(error.response);
    }).finally(() => {
      this.loading = !(this.loading);
    });
  },
  created() {
    axios.post("http://127.0.0.1:8000/RaicesDigitales/messages/comments").then((result) => {
      var temp_array = result.data
      this.messages = temp_array.reverse()
    }).catch(function (error) {
      console.log("Error");
      console.log(error.response);
    }).finally(() => {
      this.loading = !(this.loading);
    });
  },
}

</script>


<style scoped>
.admin-panel {
  width: 80vw;
  min-width: 80vh;
  height: 93vh;
  margin: 50px 10vw;
  margin-top: 10vh;
  display: flex;
  background-color: rgb(152, 204, 152);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .5);
  border: 1px rgb(152, 204, 152);
}

li {
  list-style: none;
}

.selector {
  display: flex;
  margin-top: 5vh;
  margin-bottom: 5vh;
  justify-content: center;
}

.message-card {
  border: 1px rgb(152, 204, 152);
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  border-radius: 10px;
  margin-bottom: 2vh;
  margin-top: 3vh;
  margin-right: 2vw;
  min-height: 8vh;
  padding: 0.5vh;
}

.list {
  width: 40vw;
  overflow-y: scroll;
}

.form-container {
  width: 40vw;
  margin-top: 5vh;
}

.content-container {

  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  margin-left: 2vw;
  margin-right: 2vw;
  margin-bottom: 2vh;
}

p {
  padding-left: 2vw;
  margin-top: 2vh;
  font-size: 0.8rem;
}


button {
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid var(--main-color);
  background-color: var(--main-color);
  font-size: 1rem;
  margin-left: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;

}

button:hover {
  background-color: var(--main-color);
  color: white;
  transform: scale(1.1);
  font-weight: 35000;
  -webkit-box-shadow: 7px 7px 23px -12px var(--main-color);
  -moz-box-shadow: 7px 7px 23px -12px var(--main-color);
  box-shadow: 7px 7px 23px -12px var(--main-color);
  border: none;
}

button:active {
  background-color: var(--main-color);
}

.button-close {

  border-radius: 5px;
  border: 1px solid red;
  background-color: red;
  font-size: 1rem;
  margin-left: 90%;
  width: 2.5rem;
  height: 2.5rem;

}

.button-close:hover {
  background-color: red;
  color: white;
  transform: scale(1.1);
  font-weight: 35000;
  -webkit-box-shadow: 7px 7px 23px -12px var(--main-color);
  -moz-box-shadow: 7px 7px 23px -12px var(--main-color);
  box-shadow: 7px 7px 23px -12px var(--main-color);
  border: none;
}

.button-close:active {
  background-color: rgb(131, 7, 7);
}


img {
  width: 1.5rem;
  height: 1.5rem;
}



.card {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 36vw;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 24px;
  font-weight: 600;
  text-align: center;
}

.form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.group {
  position: relative;
  border: 1px solid gray;
  border-radius: 10px;
  margin: 1vh;
}

.form .group label {
  font-size: 14px;
  color: rgb(99, 102, 102);
  position: absolute;
  top: -10px;
  left: 10px;
  background-color: #fff;
  transition: all .3s ease;
}

.form .group input,
.form .group textarea {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  outline: 0;
  width: 100%;
  background-color: transparent;
}

.form .group input:placeholder-shown+label,
.form .group textarea:placeholder-shown+label {
  top: 10px;
  background-color: transparent;
}

.form .group input:focus,
.form .group textarea:focus {
  border-color: #3366cc;
}

.form .group input:focus+label,
.form .group textarea:focus+label {
  top: -10px;
  left: 10px;
  background-color: #fff;
  color: #3366cc;
  font-weight: 600;
  font-size: 14px;
}

.form .group textarea {
  resize: none;
  height: 100px;
}

.form button {
  background-color: rgb(131, 7, 7);
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.form button:hover {
  background-color: red;
}
</style>