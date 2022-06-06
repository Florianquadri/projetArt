<script setup>
import { ref, computed, watchEffect } from 'vue';

const props = defineProps({

    cours: {
        type: String,
        required: true,
        default: "CoursTest"
    },
    salle: {
        type: String,
        required: true,
        default: "ClasseTest"
    },
    dateDebut: {
        type: Number,
        required: false,
        default: 9
    },
    dateFin: {
        type: Number,
        required: false,
        default: 10
    }
})

const salle = computed(() => {
    if (props.salle == "") return "Salle non indiquée";
    return props.salle;
})


const debutCours = computed(() => {
    if (!props.dateDebut) return '';
    const maDate = new Date(props.dateDebut);
    return new Intl.DateTimeFormat('fr-CH', options1).format(maDate);
});

const dateCours = computed(() => {
    if (!props.dateDebut) return '';
    const maDate = new Date(props.dateDebut);
    return new Intl.DateTimeFormat('fr-CH', options2).format(maDate);
});
const dateCoursMois = computed(() => {
    if (!props.dateDebut) return '';
    const maDate = new Date(props.dateDebut);
    return new Intl.DateTimeFormat('fr-CH', options3).format(maDate);
});

const finCours = computed(() => {
    if (!props.dateDebut) return '';
    const maDate = new Date(props.dateFin);
    return new Intl.DateTimeFormat('fr-CH', options1).format(maDate);
});
</script>

<template>
<div class="firstCours">
            {{datasForClassSelectedOrderAsc[0]}}
</div>
</template>



<style scoped>
</style>
