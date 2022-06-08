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
import "/node_modules/vue-simple-calendar/dist/style.css";
import { CalendarView, CalendarViewHeader} from "vue-simple-calendar"

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

function test([date, calendarItems, windowEvent]){
    console.log(calendarItems)
}

const datasForClassSelected = computed(() => {
    if (courses.value?.length > 0) {
        return courses.value.filter(classe => classe.class == myClass.value);
    } else {
        return [];
    }
}
)

const datasForClassSelectedOrderAsc = computed(() => {
    return datasForClassSelected.value.sort((a, b) => { return new Date(a.start) - new Date(b.start); });
})

//pour vue mois
const items = computed(() => {
    if (datasForClassSelectedOrderAsc.value?.length > 0) {
        return Array.from(datasForClassSelectedOrderAsc.value.map(d => { return { id: d.id, startDate: d.start, endDate: d.end, title: d.label } }));
    } else {
        return [];
    }
})

const showDate = ref(new Date());
function setShowDate(d) {
    showDate.value = d;
}

function windowEvent(){
    console.log("salut");
}

//penser à récupérer également les tests inscrit + les éléments persos et merge le tout
//dans un nouveau tableau à trier selon dates

//class,label,room,start,end,id

</script>
//v-if="user=='teacher'" --> pour la sélection de cours
<template>
    <!--     {{ tabClasses[0] }}
    {{ myClass }} -->
    <!--     {{ tabClasses }} -->
    <div class="containerHoraire">
        <!--         <the-selection v-if="user=='teacher'" @changeClasse="myClass = $event" v-bind:classes=tabClasses></the-selection> -->
        <!--         <div class="white">{{datasForClassSelectedOrderAsc}}</div> -->
        <h2>Prochain cours</h2>
        <a-period v-if="datasForClassSelectedOrderAsc != ''" v-bind:salle="datasForClassSelectedOrderAsc[0].room" v-bind:classe="datasForClassSelectedOrderAsc[0].class"
            v-bind:dateDebut="datasForClassSelectedOrderAsc[0].start"
            v-bind:dateFin="datasForClassSelectedOrderAsc[0].end" v-bind:cours="datasForClassSelectedOrderAsc[0].label"
            firstCours="true" typeEvent="firstCourse" sizeFont="1.5"></a-period>
        <template v-if="page == 'planning' || page == 'home'">
            <ul>
                <li v-for="course in datasForClassSelectedOrderAsc" :key="course.id">
                    <a-period v-bind:classe="course.class" v-bind:cours="course.label" v-bind:salle="course.room"
                        v-bind:dateDebut="course.start" v-bind:dateFin="course.end" typeEvent="course">
                    </a-period>
                </li>
            </ul>
        </template>
        <template class="div_calendar" v-if="page == 'mois'" id="app">
            <h2>Mon calendrier</h2>
            <calendar-view :items="items"  startingDayOfWeek="1" :show-date="showDate" @click-date="test([date, calendarItems, windowEvent])"
                class="theme-default holiday-us-traditional holiday-us-official">
                <template #header="{ headerProps }">
                    <calendar-view-header :header-props="headerProps" @input="setShowDate" />
                </template>
            </calendar-view>
        </template>
    </div>
    <!-- v-for="(item, index) in items" -->

</template>

<style>
.today {
    background-color: #6BA2FF;
    color: white;
    border-radius:5px;
}

.past {
    background-color: #262626;
    color: white;
}

.future {
    background-color: #262626;
    color: white;
}

.previousYear {
    display: none;
}

button.previousPeriod {
    background-color: #262626;
    border: 1px solid black;
    border-color: black;
    border-radius: 10px;
    color: white;
}

button.nextPeriod {
    background-color: #262626;
    border: 1px solid black;
    border-color: black;
    border-radius: 10px;
    color: white;
}

button.nextYear {
    display: none;
}

.cv-weeks{
    position: relative;
min-height:500px;
z-index:1;
background-color:#262626;
    border-color: black;
    border-radius: 0px 0px 10px 10px;
}

button.currentPeriod {
    /*     background-color: #262626;
    color:white;
    border: 1px solid black;
    border-color: black;
    border-radius: 10px; */
    display: none;
}

.cv-header {
    border-color: #262626;
    border-radius: 10px 10px 0px 0px;
    background-color: black;
}

.cv-header-days {
    border-color: #262626;
}

.periodLabel {
    color: white;
}

.cv-header-day {
    background-color: #262626;
    color: #6BA2FF;
    border-color: transparent;
}

div.cv-day {
    border-color: transparent;
    display: flex;
    justify-content: center;
    text-align: center;
}

.cv-day-number{

}

.cv-item{
    background-color:#84F4BF;
    color:black;
    border-radius:10px;
    border-color:black;
}
</style>

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
    flex-grow: 1;
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

.white {
    color: white;
}

.firstCours {
    width: 100%;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
    height: 67vh;
    width: 90vw;
    margin-left: auto;
    margin-right: auto;
}

.dowX {
    color: white;
}

/* .div_calendar{
    margin:20px;
} */
</style>