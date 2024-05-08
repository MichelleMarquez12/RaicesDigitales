<template>
  <header>
    <div class="title-page">
      <router-link to="/"><a class="logo" v-on:click="scrollToTop"><img src="@/assets/logoCARH.png" alt="logo_empresa">
          Raices Digitales</a>
      </router-link>
      <span v-if="AdminMode == true"><i>DEVELOPER</i></span>
    </div>
    <div class="links">
      <nav>
        <div v-if="language == true">
          <router-link to="/"><button>Regenerando</button></router-link>
          <router-link to="/thinking"><button>Desarrollando</button></router-link>
          <router-link to="/discovering"><button>Descubriendo</button></router-link>
          <router-link to="/maintaining"><button>Cuidando</button></router-link>
          <router-link to="/us"><button>Nosotros</button></router-link>
          <router-link to="/contact"><button>Contactanos</button></router-link>
          <!-- <router-link to="/admin"><button>🙎‍♂️Admin</button></router-link> -->
        </div>
        <div v-else>
          <router-link to="/"><button>Regenerating</button></router-link>
        <router-link to="/thinking"><button>Thinking</button></router-link>
        <router-link to="/discovering"><button>Discovering</button></router-link>
        <router-link to="/maintaining"><button>Mantaining</button></router-link>
        <router-link to="/us"><button>Us</button></router-link>
        <router-link to="/contact"><button>Contact us</button></router-link>
        <!-- <router-link to="/admin"><button>🙎‍♂️Admin</button></router-link> -->
        </div>

      </nav>
      <ToggleLanguage @change-language="toggle_language"></ToggleLanguage>
    </div>
  </header>
</template>
<script>
import ToggleLanguage from './ToggleLanguage.vue';
export default {
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    toggle_language() {
      this.$emit('change-language', true);
      this.language = !this.language
    }
  },
  props: {
    AdminMode: {
      type: Boolean
    }
  },
  components: {
    ToggleLanguage
  },
  data() {
    return {
      language: true
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* border: 1px solid red; */
}

.title-page span {
  color: var(--button-text-color);
  z-index: 100;
  position: absolute;
  display: flex;
  left: 5.75vw;
  bottom: 1.5vh;
}

.title-page {
  width: 25vw;
  max-width: 25vw;
  display: block;
}

.title-page a {
  text-decoration: none;
}


.links {
  width: 70vw;
  max-width: 70vw;
  margin-left: 10vw;
  position: relative;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.1rem 2vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  background: var(--main-color);
  backdrop-filter: blur(50px);
  height: 15vh;
  max-height: 15vh;
}

.logo {
  font-size: 2rem;
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  vertical-align: middle;
}


header img {
  height: 10vh;
}

header nav a {
  text-decoration: none;
  color: #fff;
  font-weight: 300;
  margin-left: 1.5rem;
  font-size: 1.15rem;
  margin-right: 0;
}

button {
  font-size: 15px;
  color: #e1e1e1;
  font-family: inherit;
  font-weight: 5x00;
  cursor: pointer;
  position: relative;
  border: none;
  background: none;
  text-transform: uppercase;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-duration: 400ms;
  transition-property: color;
}

button:focus,
button:hover {
  color: #fff;
}

button:focus:after,
button:hover:after {
  width: 100%;
  left: 0%;
}

button:after {
  content: "";
  pointer-events: none;
  bottom: -2px;
  left: 50%;
  position: absolute;
  width: 0%;
  height: 2px;
  background-color: #fff;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-duration: 400ms;
  transition-property: width, left;
}

</style>

