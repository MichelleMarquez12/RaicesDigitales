<template>
    <div v-if="loading == false" style=" display: flex; justify-content: center; padding-top: 5rem;">

        <div class="form">
            <form>
                <p class="form-title">Sign in</p>
                <div class="input-container">
                    <input type="email" placeholder="Enter username" required ref="username">
                    <span>
                    </span>
                </div>
                <div class="input-container">
                    <input type="password" placeholder="Enter password" required ref="password">
                </div>
            </form>
            <button v-on:click="this.getUsers" class="submit">
                Sign in
            </button>
            <p v-if="comprobation == true" style="color:red">Usuario incorrecto</p>
        </div>



    </div>
    <div class="cargando"> <span v-if="loading == true" class="loader"></span></div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            loading: false,
            comprobation: false
        }
    },
    methods: {
        getUsers() {
            var user_data = {
                "username": this.$refs.username.value,
                "password": this.$refs.password.value,
                "method": "query"
            }
            setTimeout(() => {
                this.loading = !(this.loading);
            }, 1000);

            // axios.post("http://127.0.0.1:8000/RaicesDigitales/usuarios",user_data).then((result) => {
            //     var state = 0;
            //     result.data.forEach(element => {
            //         if (user_data.username == element.username && user_data.password == element.password) {
            //             state = 1;
            //         }

            //     });
            //     if (state != 0) {
            //         this.$emit('admin-mode', true);
            //     } else {
            //         console.log("Error no existe el usuario")
            //     }
            //     console.log(result)
            // }).catch(function (error) {
            //     console.log("Error de conexion");
            //     console.log(error)
            // });

            axios.post("http://127.0.0.1:8000/RaicesDigitales/usuarios", user_data).then((result) => {

                if (result.status == 200) {
                    // this.loading = !(this.loading);
                    this.$emit('admin-mode', true);
                    if(this.comprobation == true){
                        this.comprobation = !(this.comprobation);

                    }
                    this.$router.push("/");

                }
                if(result.status == 202){
                    if(this.comprobation != true){
                        this.comprobation = !(this.comprobation);

                    }
                }
            }).catch(function (error) {
             
                console.log("Error");
                console.log(error.response.data);
            }).finally(() => {
                this.loading = !(this.loading);
            });
        }
    }
    // data() {

    // }
}

</script>

<style scoped>
.form {
    background-color: #fff;
    display: block;
    padding: 1rem;
    max-width: 350px;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

}

.form-title {
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 600;
    text-align: center;
    color: #000;
}

.input-container {
    position: relative;
}

.input-container input,
.form button {
    outline: none;
    border: 1px solid #e5e7eb;
    margin: 8px 0;
}

.input-container input {
    background-color: #fff;
    padding: 1rem;
    padding-right: 3rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    width: 300px;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.submit {
    display: block;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    background-color: var(--main-color);
    color: #ffffff;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    width: 100%;
    border-radius: 0.5rem;
    text-transform: uppercase;
}

.signup-link {
    color: #6B7280;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-align: center;
}

.signup-link a {
    text-decoration: underline;

}

.cargando {
    margin: 25% 48%;
}

.loader {
    width: 48px;
    height: 48px;
    border: 5px solid #ddd;
    border-bottom-color: var(--main-color);
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>

