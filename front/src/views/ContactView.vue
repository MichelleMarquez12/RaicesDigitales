<template>
  <body>
    <div class="form-div">
      <div class="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d2139.319725414112!2d-99.26456828977!3d22.016160369004606!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses-419!2smx!4v1700953933491!5m2!1ses-419!2smx"
          width="600" height="525" style="border:0;" allowfullscreen="" loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div>
        <div class="form-body" v-if="loading == false">
          <h3>Contacto y Soporte Tecnico</h3>
          <p>Escríbenos y en breve nos pondremos en contacto contigo</p>
          <table>
            <tr>
              <td>
                <label for="nombre" class="colocar_nombre">Nombre/Full name
                </label>
              </td>
              <td>
                <input type="text" name="introducir_nombre" ref="nombre" required placeholder="Escribe tu nombre" maxlength="50">

              </td>
            </tr>
            <tr>
              <td> <label for="email" class="colocar_email"><img src="@/assets/mail.png" class="icon"
                    alt="mail icon"></label></td>
              <td>
                <input type="email" name="introducir_email" ref="email" required placeholder="Escribe tu Email" maxlength="40">
              </td>
            </tr>
            <tr>
              <td> <label for="telefone" class="colocar_telefono"> <img src="@/assets/phone.png" class="phone-icon"
                    alt="phone icon"> </label></td>
              <td> <input name="introducir_telefono" ref="telefono" placeholder="Escribe tu teléfono" maxlength="10">
              </td>
            </tr>
            <tr>
              <td> <label for="website" class="colocar_website">Web
                </label></td>
              <td> <input name="introducir_website" ref="website" placeholder="Escribe la URL de tu web" maxlength="50">
              </td>
            </tr>
            <tr>
              <td> <label for="asunto" class="colocar_asunto">Asunto/Subject
                </label></td>
              <td>
                <select name="introducir_asunto" required ref="asunto">
                  <option value="comments" selected>Comentarios/Comments</option>
                  <option value="support">Soporte técnico/Technical support</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label for="mensaje" class="colocar_mensaje"><img src="@/assets/msj.png" class="msj-icon"
                    alt="phone icon"></label></td>
              <td> <textarea name="introducir_mensaje" class="texto_mensaje" ref="mensaje" required
                  placeholder="Deja aquí tu comentario..." cols="30" rows="30" maxlength="255"></textarea>
              </td>
            </tr>
          </table>
          <div class="tyc">
            <table>
              <tr>
                <td>
                  <label>Acepta los terminos y condiciones para enviar tu comentario.</label>
                  <label for="mycheckbox">Acepto los <a href="http://localhost:8000/documents/PPES.pdf">Terminos y
                      condiciones</a>
                    /I accept the <a href="http://localhost:8000/documents/PPEN.pdf">Terms and conditions</a> </label>
                </td>
                <td>
                  <input type="checkbox" name="marcar_tyc" class="check-class" id="mycheckbox" v-model="isChecked">
                </td>
              </tr>
            </table>
          </div>
          <div class="button-div"><button class="button" name="enviar_formulario" id="enviar"
              v-on:click="this.submitForm">
              <img src="@/assets/enviar.png" class="enviar-icon" alt="phone icon">
            </button></div>
        </div>
        <div class="cargando" v-if="loading == true"> 
          <div class="loader"></div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import axios from 'axios';
export default {

  data() {
    return {
      loading: false
    };
  },
  methods: {
    submitForm() {
      if (this.isChecked == true) {
        var comment_body = {
          "name": this.$refs.nombre.value,
          "email": this.$refs.email.value,
          "phone": this.$refs.telefono.value,
          "website": this.$refs.website.value,
          "message": this.$refs.mensaje.value,
          "subject": this.$refs.asunto.value
        }
        // if (!this.$refs.email.value.includes('@') || !this.$refs.email.value.includes('.')) {
        //   this.errors.email = 'El correo electrónico no es válido';
        //   return;
        // }

      // // Validar el teléfono
      // if (!this.phone.match(/^[0-9]+$/) || this.phone.length > 10) {
      //   this.errors.phone = 'El teléfono debe ser solo números y tener un máximo de 10 dígitos';
      //   return;
      // }
      // Aquí puedes manejar la lógica de envío del formulario
      setTimeout(() => {
        this.loading = !(this.loading);
      }, 1000);

        axios.post("http://127.0.0.1:8000/RaicesDigitales/messages/create", comment_body).then((result) => {
          // console.log(comment_body);
          if (result.status == 200) {
            // this.loading = !(this.loading);
            console.log(result.data)
          }
        }).catch(function (error) {
          console.log("Error");
          console.log(error.response.data);
        }).finally(() => {
          this.loading = !(this.loading);
        });
      } else {
        console.log("falta verificar la casilla")
      }

    }
  }
};
</script>

<style scoped>
/* * {
  border: 1px solid red;
} */


a {
  color: black;
}

.tyc{
  text-align: left;
}

input[type="checkbox"] {
  /* -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none; */
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
}



input[type="checkbox"]:checked {
  background-color: whitesmoke;
}

.form-div {
  display: flex;
  width: 100%;
  color: black;
  padding: 4vh 2vw;
  justify-content: center;
}


.form-body {
  padding-left: 1vw;
  padding-top: 0.5%;
  padding-right: 1vw;
  background-color: #b4e4b4;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  padding-bottom: 2vh;
}

.form-body table td {
  margin: auto 0;
  padding: 1.36vh 1vw;

}

.form-div {
  padding-left: 1vw;
  padding-right: 1vw;
}


input,
textarea,
select {
  border: 1px solid #808080;
  background-color: whitesmoke;
  color: black;
  width: 25vw;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.8);
  font-size: 0.8rem;
  max-height: 8.5vh;
}

select option {
  background-color: whitesmoke;
  color: black;
  font-size: 0.8rem;
}


label {
  font-size: 0.8rem;
}


::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: black;
  opacity: 0.9;
  font-size: 0.8rem;
}

.cargando{
  min-width: 20vw;
  align-items: center;
  justify-items: center;
  justify-content: center;
  margin-left: 50%;
  margin-top: 50%;
}
.loader {
  --dim: 5rem;
  width: var(--dim);
  height: var(--dim);
  border: 7px solid var(--main-color);
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: spin_51 1.5s infinite linear;
}

@keyframes spin_51 {
  from {
    transform: rotate(0)
  }

  to {
    transform: rotate(360deg)
  }
}

.enviar-icon {
  width: 2vw;
  height: 4vh;
}

.phone-icon {
  width: 1.9vw;
  height: 5.5vh;
}

.msj-icon {
  width: 2.5vw;
  height: 5.5vh;
}

.icon {
  width: 1.9vw;
  height: 4vh;
}

.www-icon{
  width: 2vw;
}
.buttons-div {
  display: block;
  position: absolute;
  top: 2vh;
  right: 2vw;
  z-index: 99;
}


/* CSS del boton*/
button {
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid var(--main-color);
  background-color: var(--main-color);
  font-size: 1rem;
  margin-right: 5%;
  margin-bottom: 1rem;

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
body{
  text-align: right;
}
p,h3{
  text-align: left;
}
</style>
