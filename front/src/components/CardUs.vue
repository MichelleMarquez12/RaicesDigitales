<template>
    <div class="card-container">
        <div class="card">
            <div class="front-content">
                <p>{{ user.img }}</p>
            </div>
            <div class="content">
                <p class="heading">{{ user.nombre }}</p>
                <p>{{ user.puesto }}</p>
                <p>{{ user.frase }}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        user: {
            type: Object,
            required: true
        }
    }
}
</script>

