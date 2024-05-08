<template>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CARH</title>
  </head>

  <HeaderComp :AdminMode="AdminMode" @change-language="toggle_language"></HeaderComp>

  <body>
    <div style="margin-top: 8%;">
      <router-view @admin-mode="toggleAdminMode" @reload-page="reloadPage" :lan="language" :privileges="AdminMode" :key="componentKey"/>
    </div>
    <ToTopVue></ToTopVue>
  </body>

  <FooterComp :AdminMode="AdminMode" @admin-mode="toggleAdminMode" :key="this.componentKey"></FooterComp>
</template>

<script>
import HeaderComp from './components/HeaderComp.vue';
import FooterComp from './components/FooterComp.vue';
import ToTopVue from './components/ToTop.vue';


export default {
  data() {
    return {
      AdminMode:false,
      language:{
        "lan":"ES"
      },
      componentKey:0
    }
  },
  components: { HeaderComp, FooterComp, ToTopVue},
  methods:{
    toggleAdminMode(){
      this.AdminMode = !this.AdminMode
      this.reloadPage();
    },
    reloadPage(){
      if(this.componentKey ==1){
        this.componentKey -=1
      }else{
        this.componentKey +=1
      }
    },
    toggle_language(){
      if(this.language.lan=="ES"){
        this.language.lan ="EN";
      }else{
        this.language.lan="ES";
      }
      this.reloadPage()
    }
  }
}
</script>

<style>
:root {
  --main-color: rgba(30, 92, 52);
  --button-text-color: rgb(225,225,225);
  --anchor-text-color: rgb(255,255,255);
  
}
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
*{
  font-family: 'Roboto', sans-serif;
}

</style>

<style scoped>
body {
  min-height: 100vh;
}
</style>