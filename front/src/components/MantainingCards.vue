<template>
    <body v-if="content.visible == true">
        <div class="card">
            <div>
                <ModifyButtons :privileges="this.privileges" :id="content.id" @modify-component="this.modify"
                    @delete-component="this.delete" :deletable="this.deletable"></ModifyButtons>
                <img :src="content.image" class="img_cont">
            </div>
            <div class="card-content">
                <h3>{{ content.title ? truncateText(content.title, 40) : '' }}</h3>
                <p>{{ content.body ? truncateText(content.body, 100) : '' }}
                    <a :href="'#popup-' + content.id">Leer mas</a>
                </p>
                Autor: <b>{{ content.author }}</b>
            </div>
        </div>




        <div :id="'popup-' + content.id" class="overlay">
            <div class="popup">
                <div class="cont-class-popup">
                    <div style="width: 50%;">
                        <h2>{{ content.title }}</h2>
                        Autor: <b>{{ content.author }}</b>
                    </div>
                    <div class="image-class-popup">
                        <img :src="content.image" :alt="content.title" class="image-popup">
                    </div>


                </div>
                <div class="cont-class-body">
                    <p>{{ content.body }}</p>
                </div>
                Autor: <b>{{ content.author }}</b>
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
            deletable: true
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
        }
    }

}

</script>


<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.cont-class-body {
    margin-bottom: 10px;
    white-space: pre-wrap;
}
.image-class-popup {
    max-width: 30%;
    height: auto;
    text-align: center;
    margin: 0 auto;
}

body {
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: row;
    flex: wrap;
    grid-template-columns: auto;
}


.card {
    width: 325px;
    background-color: #f0f0f0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    margin: 20px;
    height: 26rem;
}

.card img {
    width: 100%;
    height: 12rem;
}

.card-content {
    padding: 16px;
}

.card-content h3 {
    font-size: 28px;
    margin-bottom: 8px;
}

.card-content p {
    color: #666;
    font-size: 15px;
    line-height: 1.3;
}

.card-conten .btn {
    display: inline-block;
    padding: 0px 16px;
    background-color: #333;
    text-decoration: none;
    border-radius: 4px;
    margin-top: 16px;
    color: #fff;
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
}</style>