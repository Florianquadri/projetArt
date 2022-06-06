<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useFetch } from '../composables/fetch.js';
import { apiHoraireBase } from "../config/horaires.js"
import ACourse from './ACourse.vue';
import aPeriod from './aPeriod.vue';
import TheSelection from './TheSelection.vue';
import { page } from "../state.js";
import { myClass } from "../state.js";
import { user } from "../state.js";
import TheNextEvent from './TheNextEvent.vue';

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

const datasForClassSelected = computed(() => {
        if (courses.value?.length > 0) {
return courses.value.filter(classe => classe.class == myClass.value);
    } else {
        return [];
    }
}
)

const datasForClassSelectedOrderAsc = computed(() => {
    return datasForClassSelected.value.sort((a, b) => { return new Date(a.start) - new Date(b.start);});
})

/* const nextEvent = computed(() => {
    return datasForClassSelected[0];
}) */

//penser à récupérer également les tests inscrit + les éléments persos et merge le tout
//dans un nouveau tableau à trier selon dates

//class,label,room,start,end,id

</script>
//v-if="user=='teacher'" --> pour la sélection de cours
<template>
    {{ tabClasses[0] }}
    {{ myClass }}
    <!--     {{ tabClasses }} -->
    <div class="containerHoraire">
<!--         <the-selection v-if="user=='teacher'" @changeClasse="myClass = $event" v-bind:classes=tabClasses></the-selection> -->
<!--         <div class="white">{{datasForClassSelectedOrderAsc}}</div> -->
        <h2>Prochain cours</h2>
         <a-period  v-if="datasForClassSelectedOrderAsc != ''" v-bind:salle="datasForClassSelectedOrderAsc[0].room" v-bind:dateDebut="datasForClassSelectedOrderAsc[0].start" v-bind:dateFin="datasForClassSelectedOrderAsc[0].end" v-bind:cours="datasForClassSelectedOrderAsc[0].label" firstCours="true" typeEvent="firstCourse" sizeFont="1.5"></a-period> 
        <template v-if="page == 'planning' || page == 'home'">
            <ul>
                <li v-for="course in datasForClassSelectedOrderAsc" :key="course.id">
                    <a-period v-bind:classe="course.class" v-bind:cours="course.label" v-bind:salle="course.room"
                        v-bind:dateDebut="course.start" v-bind:dateFin="course.end" typeEvent="course">
                    </a-period>
                </li>
            </ul>
        </template>
    </div>
    <!-- v-for="(item, index) in items" -->

</template>


<style scoped>
.enTeteHoraire {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #60E1E0;


}

.lignee {
    justify-content: space-between;
}

.bodyTable {
    background-color: #262626;
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

h2 {
    color: white;
}

li {
    list-style: none;
}

ul {
    margin: 0px;
    padding: 5px;
}

.white{
    color: white;
}

.firstCours{
    width: 100%;
}
</style>

<!--         <table class="table">
            <thead>
                <tr class="enTeteHoraire">
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
        </table> -->