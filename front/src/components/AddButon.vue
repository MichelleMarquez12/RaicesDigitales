<template>
    <div v-if="privileges == true" v-on:click="this.createForm">
        <button class="Btn">

            <div class="sign">+</div>

            <div class="text"> Create</div>
        </button>
    </div>
</template>

<script>
export default{
    props:{
        privileges:{
            type:Boolean
        }
    },
    methods: {
        createForm(){
            this.$emit('load-form');
        }
    },
}

</script>

<style>
.Btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 0px;
    cursor: pointer;

    overflow: hidden;
    transition-duration: .3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    background-color: var(--main-color);
    border-radius: 0 20% 20% 0;


    position: fixed;
    top: 50%;
    z-index: 1;
}

/* plus sign */
.sign {
    width: 100%;
    font-size: 2em;
    color: white;
    transition-duration: .3s;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* text */
.text {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: white;
    font-size: 1.2em;
    font-weight: 500;
    transition-duration: .3s;
}

/* hover effect on button width */
.Btn:hover {
    width: 125px;
    border-radius: 0px;
    transition-duration: .3s;
    border-radius: 0 5% 5% 0;
}

.Btn:hover .sign {
    width: 30%;
    transition-duration: .3s;
    padding-left: 20px;
}

/* hover effect button's text */
.Btn:hover .text {
    opacity: 1;
    width: 70%;
    transition-duration: .3s;
    padding-right: 20px;

}

/* button click effect*/
.Btn:active {
    transform: translate(2px, 2px);
}</style>