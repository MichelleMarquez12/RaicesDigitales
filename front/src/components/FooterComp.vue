<template>
    <div class="footer-component">
        <div class="logo-field">
            <div class="logo-field-div1">
                <img src="@/assets/logoCARH.png" alt="logo_empresa">
            </div>
            <div class="logo-field-div2">
                <p class="title">Raices Digitales</p>
                <p class="subtitle">Sitio web del Centro de Agricultura Regenerativa de la
                    Huasteca</p>
            </div>
        </div>
        <div class="company-data">
            <div v-for="data in company_data" :key="data.id">
                <p>{{ data.title }}</p>
                <p>{{ data.body }}</p>
            </div>

        </div>
        <div class="contact">
            <div v-for="data in contact" :key="data.id">
                <div v-if="data.class == 'data' && data.hidden == 'false'">
                    <img :src="getImgUrl(data.image)"><span> {{ data.body }}</span>
                </div>
                <div v-if="data.class == 'icon' && data.hidden == 'false'">
                    <a :href="data.body"><img :src="getImgUrl(data.image)"><span> {{ data.title }}</span></a>
                </div>

            </div>
        </div>
        <div class="login" v-if="this.admin == true">
            <div class="message">
                <router-link to="/admin"><a @clic.once="scrollToTop"><img src="@/assets/messageicon.png" alt="message icon"
                            class="login-icon"></a></router-link>
            </div>
            <router-link to="/"><a @click.once="toggleAdmin"> <img src="@/assets/logout.png" alt="logout icon"
                        class="login-icon"> </a></router-link>


        </div>

        <div class="login" v-else>
            <router-link to="/login"><a @click.once="scrollToTop"> <img src="@/assets/login.png" alt="login icon"
                        class="login-icon"> </a></router-link>
        </div>

    </div>
</template>

<script>
export default {
    props: {
        AdminMode: {
            type: Boolean
        }
    },
    data() {
        return {
            admin: this.AdminMode,
            company_data: [
                {
                    "title": "Ubicacion",
                    "body": "Centro de Agricultura Regenerativa de la Huasteca, Avenida Damián Carmona S/N. El Chino, San Luis Potosí, C.P. 79721"
                }
            ],
            contact: [
                {
                    "title": "Telefono",
                    "image": "phonew.png",
                    "body": "481-123-4567",
                    "class": "data",
                    "hidden": "false"
                },
                {
                    "title": "Email",
                    "image": "gmail.png",
                    "body": "CARH@gmail.com",
                    "class": "data",
                    "hidden": "false"
                },
                {
                    "title": "Facebook",
                    "image": "fb.png",
                    "body": "https://google.com",
                    "class": "icon",
                    "hidden": "false"
                },
                {
                    "title": "X",
                    "image": "x.png",
                    "body": "https://google.com",
                    "class": "icon",
                    "hidden": "false"
                },
                {
                    "title": "Instagram",
                    "image": "insta.png",
                    "body": "https://google.com",
                    "class": "icon",
                    "hidden": "false"
                }

            ]
        }
    },
    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        },
        toggleAdmin() {
            this.scrollToTop();
            this.$emit('admin-mode');

        },
        getImgUrl(path) {
            var images = require.context('../assets/', false)
            return images('./' + path)
        }
    },


}

</script>

<style scoped>
/* * {
    border: 1px solid red;
} */

.footer-component {
    margin-top: 5vh;
    display: flex;
    width: 100%;
    max-width: 100%;
    height: 30vh;
    background-color: var(--main-color);
    color: var(--anchor-text-color);

}

.logo-field {
    width: 25vw;
    max-width: 25vw;
    display: flex;


}

.logo-field img {
    height: 23vh;
    margin: 2vh 0;

}

.logo-field p {
    margin: 0;
    color: var(--anchor-text-color);

}

.logo-field .logo-field-div2 .title {
    font-size: 1.5rem;
}

.logo-field .logo-field-div2 .subtitle {
    font-size: 0.8rem;
}

.company-data {
    width: 25vw;
    max-width: 25vw;
    padding: 1vh 1vw;
    font-size: 0.8rem;

}

.contact {
    width: 25vw;
    max-width: 25vw;
    padding: 1vh 1vw;

}

.contact img {
    height: 3vh;
    width: 3vh;
}

.contact span {
    margin-left: 1vw;
    font-size: 0.7rem;
    vertical-align: middle;
}

.contact a {
    text-decoration: none;
    color: var(--anchor-text-color);
}

.message {
    margin-right: 40px;
}

.login {
    width: 25vw;
    max-width: 25vw;
    display: flex;
    font-size: 0.8rem;
    margin-top: 10%;
    margin-left: 1vw;
    margin-right: 1vw;
    padding-bottom: 3%;
    padding-left: 14%;
}

.login a {
    /* text-decoration: none; */
    color: var(--anchor-text-color);
    font-weight: 400;

}

.login p {
    width: 20vw;
    font-weight: 50;
}

.login-icon {
    width: 5vh;
}
</style>