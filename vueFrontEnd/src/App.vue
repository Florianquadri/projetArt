<script setup>
    import { ref, computed, watchEffect } from 'vue';
    import {useFetch} from './composables/fetch.js';
           import TheConnexion from './components/TheConnexion.vue';
                      import TheSelection from './components/TheSelection.vue';
                      import TheHoraire from './components/TheHoraire.vue';
/*       import TheFormulaire from './components/TheFormulaire.vue';
            import ListFav from './components/ListFav.vue'; */ 
let maRef = ref(null);
</script>

<template>
<the-connexion></the-connexion>
<the-selection></the-selection>
<h1>Welcome sur notre app</h1>
<the-horaire></the-horaire>
</template>



<style>

</style>
