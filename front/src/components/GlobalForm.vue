<template>
    <div class="form-regenerating" id="1">
        <button class="button-class-out" name="salir" id="salir" v-on:click="toogle_form">
            <img src="@/assets/close.png" alt="exit icon"> </button>
        <div class="form-body-es">
            <p class="encabezado">Español</p>
            <form class="form-class-es">
                <table>
                    <tr>
                        <td>
                            <label for="title" class="colocar_title">Título</label>
                        </td>
                        <td class="col">
                            <input class="title-space" type="" id="title-id" name="introducir_title" ref="title_es" required
                                :value="this.placehoder_obj.es_title" maxlength="55">
                        </td>
                    </tr>
                    <tr>
                        <td><label for="description" class="colocar_description">Descripción</label></td>
                        <td class="col">
                            <textarea name="introducir_description" id="description-id-es" cols="30" rows="30"
                                class="desc-space" ref="body_es" required :value="this.placehoder_obj.es_body"></textarea>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
        <div class="form-body-en">
            <p class="encabezado">English</p>
            <form class="form-class-en">
                <table>
                    <tr>
                        <td>
                            <label for="title" class="colocar_title">Title</label>
                        </td>
                        <td class="col">
                            <input class="title-space" type="text" id="title-id" name="introducir_title" ref="title_en"
                                required :value="this.placehoder_obj.en_title"
                                maxlength="55">
                        </td>
                    </tr>
                    <tr>
                        <td><label for="description" class="colocar_description">Description</label></td>
                        <td class="col">
                            <textarea class="desc-space" name="introducir_description_en" id="description-id-en" cols="30"
                                rows="30" ref="body_en" required :value="this.placehoder_obj.en_body"></textarea>
                        </td>
                    </tr>

                </table>
            </form>
        </div>
        <div class="content-class">


            <label for="author" class="colocar_author">Author</label>


            <input class="author-space" type="" id="author-id" name="introducir_author" ref="author" required
                :value="this.placehoder_obj.author">

            <label for="url" class="colocar_imagen">Url</label>
            <input type="text" ref="url" :value="this.placehoder_obj.url">
            <div class="end-div">
                <label for="visible" class="visible">Visible:</label>
                <input type="checkbox" id="visible" name="visible" v-model="visible" value="true" style="margin: 0;">
                <button class="button-class-save" name="enviar_formulario" id="enviar" v-on:click="this.sendPost"> <img
                        src="@/assets/save.png" class="save-icon" alt="save icon"> </button>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
export default {
    data() {
        return {
            image: '',
            visible: true,
            edit: false,
            post_data: {
                "id": this.placehoder_obj.id,
                "es_title": this.placehoder_obj.es_title,
                "es_body": this.placehoder_obj.es_body,
                "en_title": this.placehoder_obj.en_title,
                "en_body": this.placehoder_obj.en_body,
                "author": this.placehoder_obj.author,
                "image": this.placehoder_obj.url,
                "visible": this.placehoder_obj.visible
            }
        }
    },
    props: {
        page: {
            type: String,
            require: true
        },
        placehoder_obj: {
            type: Object,
        }

    },
    methods: {
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            const isImage = files[0].type.startsWith('image/');
            if (!isImage) {
                alert('Por favor, selecciona un archivo de imagen.');
                return;
            }
            this.createImage(files[0]);
        },
        createImage(file) {
            var reader = new FileReader();
            var vm = this;

            reader.onload = (e) => {
                vm.image = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        toogle_form() {
            this.$emit('toggle_form')
        },
        // nuevo método para manejar el evento de cambio del checkbox
        handleChange() {
            this.visible = this.$refs.visible.checked;
        },
        sendPost() {
            if (this.edit == true) {
                var temp_data = {
                    "es_title": this.$refs.title_es.value,
                    "es_body": this.$refs.body_es.value,
                    "en_title": this.$refs.title_en.value,
                    "en_body": this.$refs.body_en.value,
                    "author": this.$refs.author.value,
                    "image": this.$refs.url.value,
                    "visible": this.visible
                }
                console.log(temp_data)
                console.log(this.post_data);
                console.log(temp_data)
                console.log(this.post_data);

                Object.entries(temp_data).forEach(entry => {
                    const [key, value] = entry;
                    this.post_data[key] = value;
                    if (key == "visible") {
                        if (value != this.post_data[key]) {
                            this.post_data[key] = value;
                        }
                    }
                    // console.log(key, value);
                });
                console.log(this.post_data);
                console.log(this.post_data);

                axios.post("http://127.0.0.1:8000/RaicesDigitales/" + this.page + "/update", this.post_data).then((result) => {
                    console.log(result);
                    if (result.status == 200) {
                        this.$emit("reload-page")
                    }
                }).catch(function (error) {
                    console.log(error)
                })

            } else {
                this.post_data = {
                    "es_title": this.$refs.title_es.value,
                    "es_body": this.$refs.body_es.value,
                    "en_title": this.$refs.title_en.value,
                    "en_body": this.$refs.body_en.value,
                    "author": this.$refs.author.value,
                    "image": this.$refs.url.value,
                    "visible": this.visible
                }
                axios.post("http://127.0.0.1:8000/RaicesDigitales/" + this.page + "/create", this.post_data).then((result) => {
                    console.log(result);
                    if (result.status == 200) {
                        this.$emit("reload-page")
                    }
                }).catch(function (error) {
                    console.log(error)
                })

            }

        }
    },
    mounted() {
        console.log(this.placehoder_obj);

        if (Object.keys(this.placehoder_obj).length > 6) {
            this.edit = true;
            this.visible = this.placehoder_obj.visible
        }


    },

}
</script>

<style scoped>
/* * {
    border: 1px solid red;
} */

.form-regenerating {
    position: fixed;
    top: 18vh;
    left: 10vw;
    width: 80vw;
    height: fit-content;
    display: block;
    padding: 2vw 5vw 5px;
    margin: 0 15px 25px;
    z-index: 100;
    border-radius: 20px;
    background-color: rgb(152, 204, 152);
    box-shadow: 0 0 10px rgba(0, 0, 0, .5);
}

.form-body-es {
    padding: 10px 20px 2px;
    margin: 2px 15px 5px;
    box-shadow: 0 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    background-color: rgb(181, 227, 181);
}

.form-body-en {
    padding: 10px 20px 2px;
    margin: 5px 15px 5px;
    box-shadow: 0 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    background-color: rgb(181, 227, 181);
}

.form-class-es {
    padding: 0 5px 5px;
    margin: 5px 15px 25px;
}

.form-class-en {
    padding: 0 5px 2px;
    margin: 25px 15px 25px;
}

.content-class {
    display: grid;
    padding: 10px 20px 10px;
    margin: 5px 15px 25px;
    box-shadow: 0 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    background-color: rgb(181, 227, 181);
}

.button-class-save {
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid var(--main-color);
    background-color: var(--main-color);
    margin-top: .5vw;
    position: absolute;
    right: 2%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
}

.button-class-save:hover {
    background-color: var(--main-color);
    color: white;
    transform: scale(1.1);
    font-weight: 35000;
    -webkit-box-shadow: 7px 7px 23px -12px var(--main-color);
    -moz-box-shadow: 7px 7px 23px -12px var(--main-color);
    box-shadow: 7px 7px 23px -12px var(--main-color);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
}

.button-class-save:active {
    background-color: var(--main-color);
}

.button-class-out {

    border-radius: 5px;
    background-color: red;
    border-radius: 5px;
    border: red;
    width: 10vw;
    max-width: 4vw;
    position: absolute;
    right: 2%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
}

.button-class-out:hover {
    background-color: red;
    color: whitesmoke;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
}

.button-class-out:active {
    background-color: rgb(106, 20, 20);
    color: white;
}

.title-space {
    width: 100%;
}

.desc-space {
    height: 5vw;
    width: 100%;
}

.form-regenerating {
    overflow-y: auto;
    max-height: 80vh;
}

.visible {
    margin-right: 2vw;
}

.end-div {
    margin-top: 3vh;
    margin-bottom: 5vh;
    display: flex;
    position: relative;
}

.col {
    padding-left: 2vw;
    width: 50vw;
}



input, textarea {
    border-radius: 5px;
    border: none;
    margin-bottom: 10px;
}
.encabezado{
    font-weight: bold;
    margin-top: 1rem;
    margin-left: 1.3rem;
    
}

img{
    width: 1.5rem;
    height: 1.5rem;
}
</style>