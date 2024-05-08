<template>
    <button v-on:click="scrollToTop">^</button>
</template>
<script>
export default {
    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        }
    }


}
</script>
<style scoped>
button{
    border-radius: 50%;
    border: none;
    height: 5vh;
    width: 5vh;
    z-index: 100;
    position: fixed;
    right: 1vw;
    bottom: 2vh;
    box-shadow: 2px 2px 4px #606060;
    font-size: 1.5rem;
    color: #808080;
    align-items: center;
    vertical-align: middle;
}


</style>
