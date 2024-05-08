<template>
    <div class="container">
        <div class="popup">
            <h5>Estas seguro de querer borrar el post?</h5>
            <p><b>Titulo:</b>{{ post.title_es }}</p>
            <h5>Are you sure that you want to delete the post?</h5>
            <p><b>Title:</b>{{ post.title_en }}</p>
            <button v-on:click="toogle_form" class="button-class-out"><img src="@/assets/close.png" alt=""></button>
            <button v-on:click="confirm_delete" class="button-class-save"><img src="@/assets/check.png" alt=""></button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    props: {
        post: {
            type: Object,
            required: true
        },
        page: {
            type: String
        }
    },
    methods: {
        toogle_form() {
            this.$emit('toggle_confirmation')
        },
        confirm_delete() {
            axios.post("http://127.0.0.1:8000/RaicesDigitales/" + this.page + "/delete", this.post).then((result) => {
                if (result.status == 200) {
                    this.$emit("reload-page")
                    console.log("borrao");
                }
            }).catch(function (error) {
                console.log(error)
            })
        }
    },


}
</script>
<style scoped>
.popup {
  position: fixed;
  top: 25vh;
  z-index: 99;
  background-color: rgb(181, 227, 181);
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.5);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 30vw;
  height: 50%;
}

.container:target .popup {
  visibility: visible;
  opacity: 1;
}

.popup p,
.popup h2 {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
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

display: flex;
align-items: center;
justify-content: center;
width: 2.5rem;
height: 2.5rem;
margin-top: 1rem;
}
.button-class-out:hover {
    background-color: red;
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

.button-class-out:active {
    background-color: solid red;
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


img{
    width: 1.5rem;
    height: 1.5rem;
}
.button-class-save {
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid var(--main-color);
    background-color: var(--main-color);
    margin-top: 1rem;
    position: absolute;
    right: 2%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    margin-right: .5rem;
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

</style>