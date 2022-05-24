<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useFetch } from '../composables/fetch.js';
import { apiHoraireBase } from "../config/horaires.js"
import ACourse from './ACourse.vue';
import TheSelection from './TheSelection.vue';

const { data: courses } = useFetch(apiHoraireBase);

/* const tabClasses = computed(() => {
  return courses.value.map(d => d.class);        
}); */

//set pour obtenir uniquement 1x chaque classe
const tabClasses = computed(() => {
  if (courses.value?.length > 0) {
    return Array.from(new Set(courses.value.map(d => d.class)));        
  } else {
    return [];
  }
});
//class,label,room,start,end,id

</script>

<template>
<!--     {{ tabClasses }} -->
    <div class="containerHoraire">
        <the-selection v-bind:classes=tabClasses></the-selection>
        <h2>Voici les horaires des prochains cours</h2>

        <table class="table">
            <thead class="enTeteHoraire">
                <tr classe=ligne>
                    <th class="thead">Classe</th>
                    <th class="thead">Cours</th>
                    <th class="thead">Salle</th>
                    <th class="thead">Date de début</th>
                    <th class="thead">Date de fin</th>
                </tr>
            </thead>
            <tbody class="bodyTable">
                <tr v-for="course in courses" :key="course.id">
                    <a-course v-bind:classe="course.class" v-bind:cours="course.label" v-bind:salle="course.room"
                        v-bind:dateDebut="course.start" v-bind:dateFin="course.end">
                    </a-course>
                </tr>
            </tbody>
        </table>
    </div>

    {{ courses }}
    <!-- v-for="(item, index) in items" -->

</template>

<style scoped>
.enTeteHoraire {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #B7FCF7;

}

.lignee {
    justify-content: space-between;
}

.bodyTable {
    background-color: #FFEBCD;
}

.containerHoraire {
    /*     margin:1rem; */
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.thead {
    flex-basis: 1;
}
</style>

<!--     <ul>
        <li v-for="course in courses" :key="course.id">
            <a-course v-bind:classe="course.class" v-bind:cours="course.label" v-bind:salle="course.room"
                v-bind:dateDebut="course.start" v-bind:dateFin="course.end">
            </a-course>
        </li>
    </ul> -->