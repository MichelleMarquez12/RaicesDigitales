<template>
    <div class="auto">
        <!-- <button class="button-class-out" name="salir" id="salir" v-on:click="toogle_form">
            <img src="@/assets/close.png" alt="exit icon"> </button> -->
        <div v-if="page == 'us'" class="form">
            <button class="button-class-out" name="salir" id="salir" v-on:click="toogle_form">
                <img src="@/assets/close.png" alt="exit icon"> </button>
            <div>
                <div class="form-body-es">
                    <p>Español</p>
                    <form class="form-class-es">
                        <table>
                            <tr>
                                <td>
                                    <label for="title" class="colocar_title">Título</label>
                                </td>
                                <td class="col">
                                    <input class="title-space" type="" id="title-id" name="introducir_title" ref="title_es"
                                        required :value="data.es.title">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for="title" class="colocar_title">Título</label>
                                </td>
                                <td class="col">
                                    <input class="title-space" type="" id="title-id" name="introducir_title"
                                        ref="history_title_es" required :value="data.es.history_title">
                                </td>
                            </tr>
                            <tr>
                                <td><label for="description" class="colocar_description">Descripción</label></td>
                                <td class="col">
                                    <textarea name="introducir_description" id="description-id-es" cols="30" rows="30"
                                        class="desc-space" ref="history_es" required :value="data.es.history"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for="title" class="colocar_title">Título</label>
                                </td>
                                <td class="col">
                                    <input class="title-space" type="" id="title-id" name="introducir_title"
                                        ref="organization_title_es" required :value="data.es.organization_title">
                                </td>
                            </tr>
                            <tr>
                                <td><label for="description" class="colocar_description">Descripción</label></td>
                                <td class="col">
                                    <textarea name="introducir_description" id="description-id-es" cols="30" rows="30"
                                        class="desc-space" ref="organization_es" required
                                        :value="data.es.organization"></textarea>
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
                                    <input class="title-space" type="text" id="title-id" name="introducir_title"
                                        ref="title_en" required :value="data.en.title">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for="title" class="colocar_title">Title</label>
                                </td>
                                <td class="col">
                                    <input class="title-space" type="text" id="title-id" name="introducir_title"
                                        ref="history_title_en" required :value="data.en.history_title">
                                </td>
                            </tr>
                            <tr>
                                <td><label for="description" class="colocar_description">Description</label></td>
                                <td class="col">
                                    <textarea class="desc-space" name="introducir_description_en" id="description-id-en"
                                        cols="30" rows="30" ref="history_en" required :value="data.en.history"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for="title" class="colocar_title">Title</label>
                                </td>
                                <td class="col">
                                    <input class="title-space" type="text" id="title-id" name="introducir_title"
                                        ref="organization_title_en" required :value="data.en.organization_title">
                                </td>
                            </tr>
                            <tr>
                                <td><label for="description" class="colocar_description">Description</label></td>
                                <td class="col">
                                    <textarea class="desc-space" name="introducir_description_en" id="description-id-en"
                                        cols="30" rows="30" ref="organization_en" required :value="data.en.body"></textarea>
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
            <div class="end-div">
                <button class="button-class-save" name="enviar_formulario" id="enviar" v-on:click="this.updatePost">
                    <img src="@/assets/save.png" class="save-icon" alt="save icon"> </button>
            </div>
        </div>
        <div v-if="page == 'regenerating'" :key="this.compkey" class="form">
            <button class="button-class-out" name="salir" id="salir" v-on:click="toogle_form">
                <img src="@/assets/close.png" alt="exit icon"> </button>
            <div v-if="this.visible_form == 'add'">
                <ValuesProfilesComp @reload-page="emit_reload" :placeholder_obj="this.placeholder_obj"
                    :section="data.section" :data="formdata">
                </ValuesProfilesComp>
            </div>
            <div v-else-if="this.visible_form == 'modify'">
                <ValuesProfilesComp @reload-page="emit_reload" :placeholder_obj="this.placeholder_obj"
                    :section="data.section" :data="formdata">
                </ValuesProfilesComp>
            </div>
            <div v-else>
                <div v-if="data.section == 'main_data'">
                    <div>
                        <div class="form-body-es">
                            <p>Español</p>
                            <form class="form-class-es">
                                <table>
                                    <tr>
                                        <td>
                                            <label for="title" class="colocar_title">Título</label>
                                        </td>
                                        <td class="col">
                                            <input class="title-space" type="" id="title-id" name="introducir_title"
                                                ref="title_es" required :value="data.es[0].title">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label for="description" class="colocar_description">Descripción</label></td>
                                        <td class="col">
                                            <textarea name="introducir_description" id="description-id-es" cols="30"
                                                rows="30" class="desc-space" ref="body_es" required
                                                :value="data.es[0].body"></textarea>
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
                                            <input class="title-space" type="text" id="title-id" name="introducir_title"
                                                ref="title_en" required :value="data.en[0].title">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label for="description" class="colocar_description">Description</label></td>
                                        <td class="col">
                                            <textarea class="desc-space" name="introducir_description_en"
                                                id="description-id-en" cols="30" rows="30" ref="body_en" required
                                                :value="data.en[0].body"></textarea>
                                        </td>
                                    </tr>
                                    <tr></tr>
                                </table>
                            </form>
                        </div>
                        <div class="content-class">
                            <label for="url" class="colocar_imagen">Url</label>
                            <input type="text" ref="url" :value="data.es[0].image">

                        </div>
                    </div>
                    <div class="end-div">
                        <button class="button-class-save" name="enviar_formulario" id="enviar" v-on:click="this.modifyregenerating('main_data')">
                            <img src="@/assets/save.png" class="save-icon" alt="save icon"> </button>
                    </div>
                </div>
                <div v-if="data.section == 'separator_data'">
                    <div>
                        <div class="form-body-es">
                            <p>Español</p>
                            <form class="form-class-es">
                                <table>
                                    <tr>
                                        <td>
                                            <label for="title" class="colocar_title">Título</label>
                                        </td>
                                        <td class="col">
                                            <input class="title-space" type="" id="title-id" name="introducir_title"
                                                ref="title_es" required :value="data.es[0].title">
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
                                            <input class="title-space" type="text" id="title-id" name="introducir_title"
                                                ref="title_en" required :value="data.en[0].title">
                                        </td>
                                    </tr>
                                </table>
                            </form>
                        </div>
                    </div>
                    <div class="end-div">
                        <button class="button-class-save" name="enviar_formulario" id="enviar" v-on:click="this.modifyregenerating('separator_data')">
                            <img src="@/assets/save.png" class="save-icon" alt="save icon"> </button>
                    </div>
                </div>
                <div v-if="data.section == 'vision'">
                    <div>
                        <div class="form-body-es">
                            <p>Español</p>
                            <form class="form-class-es">
                                <table>
                                    <tr>
                                        <td>
                                            <label for="title" class="colocar_title">Título</label>
                                        </td>
                                        <td class="col">
                                            <input class="title-space" type="" id="title-id" name="introducir_title"
                                                ref="title_es" required :value="data.es[0].title">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label for="description" class="colocar_description">Descripción</label></td>
                                        <td class="col">
                                            <textarea name="introducir_description" id="description-id-es" cols="30"
                                                rows="30" class="desc-space" ref="body_es" required
                                                :value="data.es[0].body"></textarea>
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
                                            <input class="title-space" type="text" id="title-id" name="introducir_title"
                                                ref="title_en" required :value="data.en[0].title">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label for="description" class="colocar_description">Description</label></td>
                                        <td class="col">
                                            <textarea class="desc-space" name="introducir_description_en"
                                                id="description-id-en" cols="30" rows="30" ref="body_en" required
                                                :value="data.en[0].body"></textarea>
                                        </td>
                                    </tr>
                                    <tr></tr>
                                </table>
                            </form>
                        </div>
                    </div>
                    <div class="end-div">
                        <button class="button-class-save" name="enviar_formulario" id="enviar" v-on:click="this.modifyregenerating('vision')">
                            <img src="@/assets/save.png" class="save-icon" alt="save icon"> </button>
                    </div>

                </div>
                <div v-if="data.section == 'values' || data.section == 'profiles'">
                    <div class="div-table">
                        <div class="table-half1">
                            <h3>
                                Español
                            </h3>
                            <div v-if="data.es[0].title" class="table-title">
                                <ModifyButtons :privileges="true"></ModifyButtons>
                                {{ data.es[0].title }}

                            </div>
                            <ul>
                                <li v-for="field in data.es" :key="field.id">
                                    <div v-if="!field.title" class="data-container">
                                        <div v-if="field.name">
                                            {{ field.name }}
                                        </div>
                                        <div v-if="field.body">
                                            {{ field.body }}
                                        </div>
                                        <div v-if="field.image">
                                            {{ field.image }}
                                        </div>
                                    </div>
                                    <ModifyButtons :privileges="true" :deletable="true"
                                        @modify-component="modify(field.id, data.section)"
                                        @delete-component="delet(field.id, data.section)"></ModifyButtons>
                                </li>
                            </ul>
                        </div>
                        <div class="table-half2">
                            <h3>
                                English
                            </h3>
                            <div v-if="data.en[0].title" class="table-title">
                                <ModifyButtons :privileges="true"></ModifyButtons>
                                {{ data.en[0].title }}
                            </div>
                            <ul>
                                <li v-for="field in data.en" :key="field.id">
                                    <div v-if="!field.title" class="data-container">
                                        <div v-if="field.name">
                                            {{ field.name }}
                                        </div>
                                        <div v-if="field.body">
                                            {{ field.body }}
                                        </div>
                                        <div v-if="field.image">
                                            {{ field.image }}
                                        </div>
                                    </div>
                                    <ModifyButtons :privileges="true" :deletable="true"
                                        @modify-component="modify(field.id, data.section)"
                                        @delete-component="delet(field.id, data.section)"></ModifyButtons>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div v-if="data.section == 'values'">
                        <button class="button-class-plus" name="salir" id="salir" v-on:click="additem('values')">
                            <img src="@/assets/plus.png" alt="plus icon"> </button>
                    </div>
                    <div v-if="data.section == 'profiles'">
                        <button class="button-class-plus" name="salir" id="salir" v-on:click="additem('profiles')">
                            <img src="@/assets/plus.png" alt="plus icon"> </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ValuesProfilesComp from './ValuesProfilesComp.vue';
import ModifyButtons from './ModifyButtons.vue';
export default {
    props: {
        data: {
            type: Array
        },
        page: {
            type: String
        },
    },
    components: {
        ValuesProfilesComp,
        ModifyButtons
    },
    data() {
        return {
            formdata: this.data,
            visible_form: "none",
            compkey: 0,

            placeholder_obj: {
                "title_es": "Ingrese un titulo",
                "body_es": "Ingrese una descripcion",
                "title_en": "Submit a title",
                "body_en": "Submit a description",
                "image": "url"
            }
        }

    },
    methods: {
        toogle_form() {
            this.$emit('toggle_autoform')
        },

        updatePost() {
            var temp_obj = {
                "es": {
                    "title": this.$refs.title_es.value,
                    "history_title": this.$refs.history_title_es.value,
                    "history": this.$refs.history_es.value,
                    "organization_title": this.$refs.organization_title_es.value,
                    "organization": this.$refs.organization_es.value
                },
                "en": {
                    "title": this.$refs.title_en.value,
                    "history_title": this.$refs.history_title_en.value,
                    "history": this.$refs.history_en.value,
                    "organization_title": this.$refs.organization_title_en.value,
                    "organization": this.$refs.organization_en.value
                }

            }
            axios.post("http://127.0.0.1:8000/RaicesDigitales/usfetch/update", temp_obj).then((result) => {
                if (result.status == 200) {
                    console.log(result.data)

                }
                if (this.compkey == 0) {
                    this.compkey += 1
                } else {
                    this.compkey -= 1
                }
            }).catch(function (error) {
                console.log(error)
            })
            
            this.$emit("reload-page")
        },
        modifyregenerating(section) {
            this.autoformbody = {
                "es": {},
                "en": {},

            }

            switch (section) {
                case "main_data":
                    this.autoformbody = {
                        "es": {
                            "title": this.$refs.title_es.value,
                            "body": this.$refs.body_es.value,
                            "image": this.$refs.url.value,
                        },
                        "en": {
                            "title": this.$refs.title_en.value,
                            "body": this.$refs.body_en.value,
                            "image": this.$refs.url.value,
                        }
                    }

                    break;
                case "vision":
                    this.autoformbody = {
                        "es": {
                            "title": this.$refs.title_es.value,
                            "body": this.$refs.body_es.value,
                        },
                        "en": {
                            "title": this.$refs.title_en.value,
                            "body": this.$refs.body_en.value,
                        }
                    }

                    break;
                case "separator_data":
                    this.autoformbody = {
                        "es": {
                            "title": this.$refs.title_es.value,
                        },
                        "en": {
                            "title": this.$refs.title_en.value,
                        }
                    }

                    break;
                default:
                    break;
            }

            axios.post("http://127.0.0.1:8000/RaicesDigitales/regenerating/update/" + section, this.autoformbody).then((result) => {
                console.log(result)
            }).catch(function (error) {
                console.log("Error");
                console.log(error.response);
            }).finally(() => {
                this.loading = !(this.loading);
            });

            setTimeout(() => {

                if (this.compkey == 0) {
                    this.compkey += 1
                } else {
                    this.compkey -= 1
                }
                this.$emit('reload-page')

            }, 1000);


        },
        additem(val) {
            this.autoformbody = {
                "es": {},
                "en": {},
                "section": val
            }
            this.placeholder_obj['action'] = 'add'
            axios.post("http://127.0.0.1:8000/RaicesDigitales/regenerating/get/" + val, this.lan).then((result) => {
                this.autoformbody.es = result.data.es;
                this.autoformbody.en = result.data.en;
                setTimeout(() => {
                    if (this.compkey == 0) {
                        this.compkey += 1
                    } else {
                        this.compkey -= 1
                    }
                    console.log(this.autoformbody)
                    this.visible_form = "add"
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
        modify(id, section) {
            this.autoformbody = {
                "es": {},
                "en": {},

            }
            axios.post("http://127.0.0.1:8000/RaicesDigitales/regenerating/get/" + section, this.lan).then((result) => {
                this.autoformbody.es = result['data']['es'].find((element) => element.id == id);
                this.autoformbody.en = result['data']['en'].find((element) => element.id == id);

                setTimeout(() => {
                    if (section == "values") {
                        this.placeholder_obj = {
                            "id": id,
                            "title_es": this.autoformbody.es.name,
                            "body_es": this.autoformbody.es.body,
                            "title_en": this.autoformbody.en.name,
                            "body_en": this.autoformbody.en.body,
                            "section": section,
                            "action": "modify"
                        }

                    } else if (section == "profiles") {
                        this.placeholder_obj = {
                            "id": id,
                            "title_es": this.autoformbody.es.name,
                            "title_en": this.autoformbody.en.name,
                            "image": this.autoformbody.es.image,
                            "section": section,
                            "action": "modify"
                        }
                    }

                    if (this.compkey == 0) {
                        this.compkey += 1
                    } else {
                        this.compkey -= 1
                    }
                    this.visible_form = "modify"

                }, 1000);
                //console.log(this.autoformbody)
            }).catch(function (error) {
                console.log("Error");
                console.log(error.response);
            }).finally(() => {
                this.loading = !(this.loading);
            });




        },
        delet(id, section) {
            var temp_id = {
                "id": id,
                "section": section,

            }
            axios.post("http://127.0.0.1:8000/RaicesDigitales/regenerating/delete/" + section, temp_id).then((result) => {
                console.log(result)
                setTimeout(() => {
                    if (this.compkey == 0) {
                        this.compkey += 1
                    } else {
                        this.compkey -= 1
                    }
                    this.$emit('reload-page')
                }, 1000);
                //console.log(this.autoformbody)
            }).catch(function (error) {
                console.log("Error");
                console.log(error.response);
            }).finally(() => {
                this.loading = !(this.loading);
            });

        }
    },
    mounted() {
        // console.log(this.formdata.action);
        //console.log(this.formdata)
        if (Object.keys(this.formdata.es).length > 1) {
            console.log();
        }
    },
}
</script>

<style scoped>
/* * {
    border: 1px solid red;
} */

.auto {
    overflow-y: auto;
    max-height: 80vh;

}

.col {
    padding-left: 2vw;
    width: 50vw;
}

.desc-space {
    height: 5vw;
    width: 100%;
}

.title-space {
    width: 100%;
}

.form {
    overflow-y: auto;
    max-height: 80vh;
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

.end-div {
    margin-top: 3vh;
    margin-bottom: 8vh;
    display: flex;
    position: relative;
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

.button-class-plus:hover {
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

.button-class-plus {
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

.button-class-plus:active {
    background-color: var(--main-color);
}

.div-table {
    display: flex;

}

.table-half1 {
    width: 50%;
    box-shadow: 0 0px 10px rgba(0, 0, 0, 0.1);
    background-color: rgb(181, 227, 181);
    border-collapse: collapse;
    border-radius: 20px;
    padding: 20px;
}

.table-half2 {
    width: 50%;
    box-shadow: 0 0px 10px rgba(0, 0, 0, 0.1);
    background-color: rgb(181, 227, 181);
    border-collapse: collapse;
    border-radius: 20px;
    padding: 20px;
    margin-left: 10px;
    margin-right: 10px;
}

.table-title {
    position: relative;
    height: 10vh;
    font-size: 2rem;

}

.data-container {
    border: 1px solid gray;
    width: 100%;
    padding: 12px;
}

li {
    text-decoration: none;
    list-style: none;
    position: relative;
    text-align: left;
    background-color: whitesmoke;
}

ul {
    padding: 0px;
}

input,
textarea {
    border-radius: 5px;
    border: none;
    margin-bottom: 10px;
}

img {
    width: 1.5rem;
    height: 1.5rem;
}

p,
h3 {
    font-weight: bold;
}
</style>