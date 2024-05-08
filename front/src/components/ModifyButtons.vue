<template>
    <div v-if="privileges == true">
        <div class="buttons-div" style="display: flex; ">
            <button v-on:click="this.modify" type="button">
                <img src="@/assets/editIcon.png" alt="">
            </button>
            <button v-on:click="this.delete" type="button" v-if="deletable == true">
                <img src="@/assets/deleteIcon.png" alt="">
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        privileges: {
            type: Boolean
        },
        id:{
            type:String
        },
        deletable:{
            type:String
        }
    },
    methods: {
        modify(){
            this.$emit("modify-component",this.id);
        },
        delete(){
            this.$emit("delete-component",this.id);
        }
    },
}

</script>

<style scoped>
.buttons-div {
    display: block;
    position: absolute;
    top: 2vh;
    right: 2vw;
    z-index: 5;
    margin-top: .5rem;
}


/* CSS del boton*/
button {
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid var(--main-color);
    background-color: var(--main-color);
    font-size: 1rem;
    margin-left: 5px;
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

img{
    width: 1.5rem;
    height: 1.5rem;
}
</style>