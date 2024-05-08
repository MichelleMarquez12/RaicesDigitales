<template>
    <div class="container">
        <div class="form-body-es">
            <p>Español</p>
            <form class="form-class-es">
                <table>
                    <tr>
                        <td>
                            <label for="title" class="colocar_title">Título</label>
                        </td>
                        <td class="col">
                            <input class="title-space" type="" id="title-id" name="introducir_title" ref="title_es" required
                                :value="placeholder.title_es">
                        </td>
                    </tr>
                    <tr v-if="section == 'values'">
                        <td><label for="description" class="colocar_description">Descripción</label></td>
                        <td class="col">
                            <textarea name="introducir_description" id="description-id-es" cols="15" rows="2"
                                class="desc-space" ref="body_es" required :value="placeholder.body_es"></textarea>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
        <div class="form-body-en">
            <p>English</p>
            <form class="form-class-en">
                <table>
                    <tr>
                        <td>
                            <label for="title" class="colocar_title">Title</label>
                        </td>
                        <td class="col">
                            <input class="title-space" type="text" id="title-id" name="introducir_title" ref="title_en"
                                required :value="placeholder.title_en">
                        </td>
                    </tr>
                    <tr v-if="section == 'values'">
                        <td><label for="description" class="colocar_description">Description</label></td>
                        <td class="col">
                            <textarea class="desc-space" name="introducir_description_en" id="description-id-en" cols="15"
                                rows="2" ref="body_en" required :value="placeholder.body_en"></textarea>
                        </td>
                    </tr>
                    <tr></tr>
                </table>
            </form>
        </div>
        <div class="content-class" v-if="section == 'profiles'">
            <label for="url" class="colocar_imagen">Url</label>
            <input type="text" ref="url" :value="placeholder.image">

        </div>
        <div class="end-div">
            <div v-if="placeholder.action == 'add'">
                <button class="button-class-save" name="enviar_formulario" id="enviar" v-on:click="this.sendPost">
                    <img src="@/assets/save.png" class="save-icon" alt="save icon"> </button>
            </div>
            <div v-else>
                <button class="button-class-save" name="enviar_formulario" id="enviar" v-on:click="this.updatePost">
                    <img src="@/assets/save.png" class="save-icon" alt="save icon"> </button>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: {
        placeholder_obj: {
            type: Object
        },
        section: {
            type: String
        },
        data: {
            type: Object
        }
    },
    data() {
        return {
            formdata: this.data,
            placeholder: this.placeholder_obj
        }
    },
    mounted() {

        // console.log(this.placeholder_obj)
        // console.log(this.formdata)

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
        sendPost() {
            var en_post_body;
            var es_post_body;
            const dateString = Date.now().toString(36);
            const randomness = Math.random().toString(36).substring(2);
            var unicID = dateString + randomness;

            if (this.formdata.section == 'values') {

                es_post_body = {
                    "name": this.$refs.title_es.value,
                    "body": this.$refs.body_es.value,
                    "id": unicID
                }
                en_post_body = {
                    "name": this.$refs.title_en.value,
                    "body": this.$refs.body_en.value,
                    "id": unicID
                }

                this.formdata.es.push(es_post_body);
                this.formdata.en.push(en_post_body);

                axios.post("http://127.0.0.1:8000/RaicesDigitales/regenerating/add/" + this.formdata.section, this.formdata).then((result) => {
                    console.log(result);
                    setTimeout(() => {
                        this.$emit("reload-page")
                    }, 1000);

                }).catch(function (error) {
                    console.log("Error");
                    console.log(error.response);
                }).finally(() => {
                    this.loading = !(this.loading);
                });

            } else if (this.formdata.section == 'profiles') {
                es_post_body = {
                    "name": this.$refs.title_es.value,
                    "image": this.$refs.url.value,
                    "id": unicID
                }
                en_post_body = {
                    "name": this.$refs.title_en.value,
                    "image": this.$refs.url.value,
                    "id": unicID
                }
                this.formdata.es.push(es_post_body);
                this.formdata.en.push(en_post_body);
                console.log(this.formdata);
                axios.post("http://127.0.0.1:8000/RaicesDigitales/regenerating/add/" + this.formdata.section, this.formdata).then((result) => {
                    console.log(result);
                    setTimeout(() => {
                        this.$emit("reload-page")
                    }, 1000);

                }).catch(function (error) {
                    console.log("Error");
                    console.log(error.response);
                }).finally(() => {
                    this.loading = !(this.loading);
                });

            }

        },
        updatePost() {
            console.log("updatePost")
            var temp_obj = {};

            switch (this.formdata.section) {
                case 'values':
                    temp_obj = {
                        "es": {
                            "name": this.$refs.title_es.value,
                            "body": this.$refs.body_es.value,
                        },
                        "en": {
                            "name": this.$refs.title_en.value,
                            "body": this.$refs.body_en.value,
                        },
                        "id": this.placeholder.id
                    }

                    break;
                case 'profiles':
                    temp_obj = {
                        "es": {
                            "name": this.$refs.title_es.value,
                            "image": this.$refs.url.value,
                        },
                        "en": {
                            "name": this.$refs.title_en.value,
                            "image": this.$refs.url.value,
                        },
                        "id": this.placeholder.id
                    }

                    break;

                default:
                    break;
            }
            console.log(this.placeholder);
            axios.post("http://127.0.0.1:8000/RaicesDigitales/regenerating/update/" + this.placeholder.section, temp_obj).then((result) => {
                console.log(result);
                setTimeout(() => {
                    this.$emit('reload-page')
                }, 1000);

            }).catch(function (error) {
                console.log("Error");
                console.log(error.response);
            }).finally(() => {
                this.loading = !(this.loading);
            });

        },
    },

}
</script>
<style scoped>
.container {
    display: absolute;
    z-index: 999;
}

.end-div {
    margin-top: 3vh;
    margin-bottom: 8vh;
    display: flex;
    position: relative;
}

.desc-space {
    height: 5vw;
    width: 100%;
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

img{
    width: 1.5rem;
    height: 1.5rem;
}




</style>