<script setup>
    import { ref, computed, watchEffect } from 'vue';
    import {useFetch} from './composables/fetch.js';
           import TheConnexion from './components/TheConnexion.vue';
/*                       import TheSelection from './components/TheSelection.vue'; */
                      import TheHoraire from './components/TheHoraire.vue';
/*       import TheFormulaire from './components/TheFormulaire.vue';
            import ListFav from './components/ListFav.vue'; */ 
let maRef = ref(null);
</script>

<template>
<div class="app">
<the-connexion></the-connexion>
<h1>Welcome sur notre app</h1>
<!-- <the-selection></the-selection> -->
<the-horaire></the-horaire>
</div>
</template>



<style scoped>
.app {
    display:flex;
    flex-direction:column;
    margin:1.5rem;
}
</style>
