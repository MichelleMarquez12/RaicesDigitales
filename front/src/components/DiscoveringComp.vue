<template>
    <body v-if="content.visible == true">

        <ModifyButtons :privileges="this.privileges" :id="content.id" @modify-component="this.modify"
            @delete-component="this.delete" :deletable="this.deletable"></ModifyButtons>
        <div class="container">
            <div class="img_cont">
                <img :src="content.image" class="image-layout">
            </div>
            <div class="box">
                <div class="box-content">
                    <div>
                        <h2>{{ content.title }}</h2>
                    </div>
                    <div>
                        <p>{{ content.body ? truncateText(content.body, 260) : '' }}
                            <a :href="'#popup-' + content.id">Leer mas</a>
                        </p>
                    </div>
                    <div class="author-label">
                        <p> Autor: <b>{{ content.author }}</b></p>
                    </div>
                </div>
            </div>
        </div>

        <div :id="'popup-' + content.id" class="overlay">
            <div class="popup">
                <div class="cont-class-popup">
                    <div style="width: 50%;">
                        <h2>{{ content.title }}</h2>
                        <div class="autor-label">
                            <p>Autor: <b>{{ content.author }}</b></p>
                        </div>
                    </div>
                    <div class="image-class-popup">
                        <img :src="content.image" :alt="content.title" class="image-popup">
                    </div>
                </div>
                <div>
                    <p class="cont-class-body">{{ content.body }}</p>
                </div>
                <a class="close" href="#"><img src="@/assets/close.png" alt=""></a>
            </div>
        </div>
    </body>

    <body v-if="content.visible != true && privileges == true" style="opacity: 0.5;">
        <ModifyButtons :privileges="this.privileges" :id="content.id" @modify-component="this.modify"
            @delete-component="this.delete" :deletable="this.deletable"></ModifyButtons>
        <div class="container">
            <div class="img_cont">
                <img :src="content.image" class="image-layout">
            </div>
            <div class="box">
                <div class="box-content">
                    <div>
                        <h2>{{ content.title }}</h2>
                    </div>
                    <div >
                        <p>{{ content.body ? truncateText(content.body, 260) : '' }}
                            <a :href="'#popup-' + content.id">Leer mas</a>
                        </p>
                    </div>
                    <div class="author-label">
                        <p> Autor: <b>{{ content.author }}</b></p>
                    </div>
                </div>
            </div>
        </div>

        <div :id="'popup-' + content.id" class="overlay">
            <div class="popup">
                <div class="cont-class-popup">
                    <div style="width: 50%;">
                        <h2>{{ content.title }}</h2>
                        <p>Autor: <b>{{ content.author }}</b></p>
                    </div>
                    <div class="image-class-popup">
                        <img :src="content.image" :alt="content.title" class="image-popup">
                    </div>
                </div>
                <div>
                    <p class="cont-class-body">{{ content.body }}</p>
                </div>
                <p>Autor: <b>{{ content.author }}</b></p>
                <a class="close" href="#"><img src="@/assets/close.png" alt=""></a>
            </div>
        </div>
    </body>
</template>

<script>
import ModifyButtons from './ModifyButtons.vue';
export default {
    data() {
        return {
            deletable: true,
            new_body:""
        }
    },
    props: {
        content: {
            type: Object,
            require: true
        },
        privileges: {
            type: Boolean
        }
    },
    components: {
        ModifyButtons
    },
    methods: {
        modify(id) {
            console.log(id)
            this.$emit("modify", id)
        },
        delete(id) {
            this.$emit("delete", id)
        },
        truncateText(text, limit) {
            return text.length > limit ? text.slice(0, limit) + '...' : text;
        },

    },

}

</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* border: 1px solid red; */
}

.image-class-popup{
    max-width: 33%;
    height: auto;
    text-align: center;
    margin: 0 auto;
}

body {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

}

.container {
    width: 80vw;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;

}

.image-popup {
    width: 100%;
    height: auto;
}

.image-layout {
    width: 100%;
    height: 100%;
    border-radius: 5% 0 0 5%;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    border: 1px solid rgba(255, 255, 255, 0.1);
    max-height: 500px;
    max-width: 500px;
    overflow: hidden;
    object-fit: cover;
    object-position: center top;
}

.cont-class-popup {
    display: flex;
    padding: 2%;
}

.box {
    background: #b4e4b4;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    padding: 10px;
    border-radius: 0 5% 5% 0;
    width: 600px;
    height: 350px;
    overflow: hidden;
    max-height: 300px;
    border: #fff 1px;
    display: block;
}

.box h2 {
    margin-top: 20px;
    margin-bottom: 0;
    line-height: 6vh;
    height: 18vh;
    height: fit-content;
}

.box p {
    opacity: 0.9;
    margin-top: 10px;
    height: 17vh;
}

.box-content {
    height: 100%;
    position: relative;
}

.author-label {
    margin-top: 1%;
}

.img_cont {
    height: 300px;
    width: 500px;
}

/* Estilos generales */
.overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;
    opacity: 0;
    backdrop-filter: blur(5px);
    height: 100%;
    z-index: 999;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);


}

.cont-class-body {
    margin-bottom: 10px;
    white-space: pre-wrap;
}

.popup {
    padding: 20px;
    background: #fff;
    border-radius: 5px;
    max-width: 70vw;
    /* Máximo ancho del popup */
    position: relative;
    overflow-y: scroll;
    max-height: 90vh;
}

.popup h2 {
    margin-top: 0;
}

.popup .close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}

/* Mostrar el popup cuando el enlace es seleccionado (:target) */
.overlay:target {
    visibility: visible;
    opacity: 1;
}

a {
    text-decoration: none;
}

.close {
    background-color: red;
    border-radius: 20%;
    width: 1.5rem;
    height: 1.6rem;
}

img {
    width: 100%;
    height: 100%;
}
</style>