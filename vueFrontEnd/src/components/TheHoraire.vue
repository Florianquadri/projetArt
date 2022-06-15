<script setup>
import { ref, computed, watchEffect } from "vue";
import { useFetch } from "../composables/fetch.js";
import { apiHoraireBase, baseURL } from "../config/horaires.js";
import { apiHoraireBasique } from "../config/horaires.js";
import ACourse from "./ACourse.vue";
import aPeriod from "./aPeriod.vue";
import TheSelection from "./TheSelection.vue";
import EventMonthly from "./EventMonthly.vue";
import { page } from "../state.js";
import { myClass } from "../state.js";
import { user } from "../state.js";
import TheNextEvent from "./TheNextEvent.vue";
import "/node_modules/vue-simple-calendar/dist/style.css";
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar";

//ira dans section affichage
import {
  coursChecked,
  testChecked,
  eventChecked,
  devoirChecked,
  classOuPrivateToFetch,
} from "../state.js";

const urlCours = computed(() => {
    if (coursChecked.value) return "/course";
    return "";
})
const urlTest = computed(() => {
    if (testChecked.value) return "/test";
    return "";
})
const urlEvent = computed(() => {
    if (eventChecked.value) return "/event";
    return "";
})
const urlDevoir = computed(() => {
    if (devoirChecked.value) return "/devoir";
    return "";
})
const urlClassOrPrivate = computed(() => {
    if (classOuPrivateToFetch.value != "private") return "/horairefiltreClasse/"+myClass.value;
    return "/horairefiltre";
})

const smthSelected = computed(() => {
    if (!coursChecked.value && !testChecked.value && !eventChecked.value && !devoirChecked.value ) return "/course";
    return "";
})

const urlFinale = computed(() => {
return baseURL+urlClassOrPrivate.value+urlCours.value+urlTest.value+urlEvent.value+urlDevoir.value+smthSelected.value;
})


const urlAFetch = ref(null);
const fetchClass = ref(false);

watchEffect(() => {
  console.log(urlFinale.value)
});

console.log(apiHoraireBasique);
const { data: infos } = useFetch("https://abe-pingouin.heig-vd.ch/horairefiltre/course");
watchEffect(() => {
  console.log(infos.value);
});
console.log("hello2");
//le fetch = les cases sélectionnées --> fetch réactif (cours, tâches, event, devoir)
//id, classe, title, startDate, endDate,localisation,typeEvent, description

const { data: courses } = useFetch(apiHoraireBase);
const isClicked = ref(false);
const eventPopUp = ref("");
const eventClick = ref("");

//set pour obtenir uniquement 1x chaque classe
const tabClasses = computed(() => {
  if (courses.value?.length > 0) {
    return Array.from(new Set(courses.value.map((d) => d.class))); //d.classe pour le nouveau --> aller chercher toutes le tableau avec tous les cours et classes
  } else {
    return [];
  }
});

function test2(evt) {
  console.log(evt);
}

//si étudiant ou prof de base, pas besoin car renvoie horaire de base. Mais si prof choisit la classe, cela doit
// modifier le tableau à envoyer à planning ou calendrier

const datasForClassSelected = computed(() => {
  if (courses.value?.length > 0) {
    return courses.value.filter((classe) => classe.class == myClass.value);
  } else {
    return [];
  }
});

//tri des évenements
const datasForClassSelectedOrderAsc = computed(() => {
  return datasForClassSelected.value.sort((a, b) => {
    return new Date(a.start) - new Date(b.start);
  });
});

//pour vue mois
const items = computed(() => {
  if (datasForClassSelectedOrderAsc.value?.length > 0) {
    return Array.from(
      datasForClassSelectedOrderAsc.value.map((d) => {
        return {
          id: d.id,
          startDate: d.start,
          endDate: d.end,
          title: d.label,
          room: d.room,
        };
      })
    );
    //return d.id, d.startDate, d.endDate, d.title, d.localisation
  } else {
    return [];
  }
});

//option d'affichage des dates comme souhaité
const options1 = { year: "numeric", month: "long", day: "numeric" };

const debutCours = computed(() => {
  if (!eventClick.value) return "";
  const maDate = new Date(eventClick.value);
  return new Intl.DateTimeFormat("fr-CH", options1).format(maDate);
});

const tabFiltreEvent = computed(() => {
  if (items.value?.length > 0) {
    return items.value.filter((event) => {
      const maDate2 = new Date(event.startDate);
      const maDate2Final = new Intl.DateTimeFormat("fr-CH", options1).format(
        maDate2
      );
      return maDate2Final == debutCours.value;
    });
  } else {
    return [];
  }
});

//récupérer dans popup info événements du jour
function test(evt) {
  eventClick.value = evt;
  console.log(eventClick.value);
  console.log(debutCours.value);
  console.log(tabFiltreEvent.value, "asdf");
  eventPopUp.value = evt;
  isClicked.value = !isClicked.value;
}

const showDate = ref(new Date());
function setShowDate(d) {
  showDate.value = d;
}

function closeInfos() {
  isClicked.value = !isClicked.value;
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
    {{ infos }}
    <a-period
      v-if="datasForClassSelectedOrderAsc != ''"
      v-bind:salle="datasForClassSelectedOrderAsc[0].room"
      v-bind:classe="datasForClassSelectedOrderAsc[0].class"
      v-bind:dateDebut="datasForClassSelectedOrderAsc[0].start"
      v-bind:dateFin="datasForClassSelectedOrderAsc[0].end"
      v-bind:cours="datasForClassSelectedOrderAsc[0].label"
      firstCours="true"
      typeEvent="firstCourse"
      sizeFont="1.5"
    ></a-period>
    <template v-if="page == 'planning' || page == 'home'">
      <ul>
        <li v-for="course in datasForClassSelectedOrderAsc" :key="course.id">
          <a-period
            v-bind:classe="course.class"
            v-bind:cours="course.label"
            v-bind:salle="course.room"
            v-bind:dateDebut="course.start"
            v-bind:dateFin="course.end"
            typeEvent="course"
          >
          </a-period>
        </li>
      </ul>
    </template>
    <template class="div_calendar" v-if="page == 'mois'" id="app">
      <h2>Mon calendrier</h2>
      <calendar-view
        :items="items"
        startingDayOfWeek="1"
        :show-date="showDate"
        @click-date="test($event)"
        @click-item="test2($event)"
        class="theme-default holiday-us-traditional holiday-us-official"
      >
        <template #header="{ headerProps }">
          <calendar-view-header
            :header-props="headerProps"
            @input="setShowDate"
          />
        </template>
      </calendar-view>
      <div class="moreInfo" :class="isClicked ? 'active' : ''">
        <span class="bar" @click="closeInfos"></span>
        <div
          v-for="itemPopUp in tabFiltreEvent"
          :key="itemPopUp.id"
          class="event"
        >
          <event-monthly
            :startDate="itemPopUp.startDate"
            :endDate="itemPopUp.endDate"
            :title="itemPopUp.title"
            :room="itemPopUp.room"
          ></event-monthly>
        </div>
      </div>
    </template>
  </div>
  <!-- v-for="(item, index) in items" -->
</template>

<style>
.today {
  background-color: #6ba2ff;
  color: white;
  border-radius: 5px;
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

.cv-weeks {
  position: relative;
  min-height: 500px;
  z-index: 1;
  background-color: #262626;
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
  color: #6ba2ff;
  border-color: transparent;
}

div.cv-day {
  border-color: transparent;
  display: flex;
  justify-content: center;
  text-align: center;
}

.cv-day-number {
}

.cv-item {
  background-color: #84f4bf;
  color: black;
  border-radius: 10px;
  border-color: black;
}
</style>

<style scoped>
.enTeteHoraire {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #60e1e0;
}

.bar {
  width: 50px;
  text-align: center;
  height: 100%;
  height: 5px;
  margin: 0px auto 10px auto;
  background-color: white;
  border-radius: 5px;
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
  width: 100%;
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
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
  height: 67vh;
  width: 90vw;
  margin-left: auto;
  margin-right: auto;
}

.dowX {
  color: white;
}

div.moreInfo {
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 2;
  bottom: -280px;
  text-align: center;
  width: 95%;
  margin: auto;
  height: 280px;
  justify-content: flex-start;
  background-color: #606060;
  padding: 10px;
  opacity: 0;
  border-radius: 10px;
  border: 1px solid black;
  transition: 0.3s;
}

div.moreInfo.active {
  z-index: 2;
  bottom: 15px;
  border-top: 1px solid #e7f0ff;
  opacity: 1;
}

div.event {
  margin-bottom: 10px;
}

/* .div_calendar{
    margin:20px;
} */
</style>