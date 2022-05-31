<script setup>
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap"
import { ref, computed, watchEffect } from 'vue';
import { useFetch } from './composables/fetch.js';
import TheConnexion from './components/TheConnexion.vue';
/*                       import TheSelection from './components/TheSelection.vue'; */
import TheHoraire from './components/TheHoraire.vue';
import TheHeader from './components/TheHeader.vue';
/*       import TheFormulaire from './components/TheFormulaire.vue';
            import ListFav from './components/ListFav.vue'; */
let maRef = ref(null);
import 'bootstrap/dist/js/bootstrap.min.js';
</script>

<template>

    <div class="app">
        <the-header></the-header>
        <div class="body">
        <the-connexion></the-connexion>
        <h1>Welcome sur notre app</h1>
        <!-- <the-selection></the-selection> -->
        <the-horaire></the-horaire>
                </div>
    </div>
</template>



<style scoped>
.app {
    display: flex;
    flex-direction: column;
}

.body {
    display: flex;
    flex-direction: column;
    margin-top:70px
}


</style>
