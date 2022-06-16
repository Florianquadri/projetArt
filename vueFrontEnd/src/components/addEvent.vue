<script setup>
import { ref, computed, watchEffect } from "vue";
import aButtonMenuTask from "./aButtonMenuTask.vue";
import { useFetch } from "../composables/fetch.js";
import { apiHoraireBase } from "../config/horaires.js";
import { user } from "../state.js";
import { myClass } from "../state.js";

const { data: courses } = useFetch(apiHoraireBase);

const tabClasses = computed(() => {
  if (courses.value?.length > 0) {
    return Array.from(new Set(courses.value.map((d) => d.class)));
  } else {
    return [];
  }
});

const props = defineProps({
  icon: {
    type: String,
    required: false,
    default: "add",
  },
  iconHover: {
    type: String,
    required: false,
    default: "add",
  },
  typeEvent: {
    type: String,
    required: false,
    default: "private",
  },
});

const isFinished = ref(true);
const chooseClassTaskForStudent = ref("Devoir");
const errorChooseClassTaskForStudent = ref(false);

const classChosen = ref(null);
const errorClassChosen = ref(false);

const event = computed(() => {
  if (props.typeEvent == "private") {
    return "Perso";
  }
  if (
    props.typeEvent == "myClassEvent" &&
    chooseClassTaskForStudent.value == "Devoir"
  ) {
    return "Devoir";
  }
  if (
    props.typeEvent == "myClassEvent" &&
    chooseClassTaskForStudent.value == "Autre"
  ) {
    return "Autre";
  }
  if (props.typeEvent == "test") {
    return "Examen";
  }
  if (props.typeEvent == "academic") {
    return "Académique";
  }
});
const forWhichClassEvent = computed(() => {
  if (props.typeEvent == "private") {
    return null;
  }
  if (props.typeEvent == "myClassEvent") {
    return myClass.value;
  }
  if (props.typeEvent == "academic") {
    return "allClasses";
  }
  if (props.typeEvent == "test") {
    return classChosen.value;
  }
});

const emits = defineEmits(["closeAddTask"]);

function cancelAddTask() {
  reinitialisationErrors();
  reinitialisationValue();

  emits("closeAddTask", isFinished.value);
  console.log("ferme");
}

const iconToShow = computed(() => {
  if (!journeeEntiere.value) return "toggle_off";
  return "toggle_on";
});

function dealWithDay() {
  journeeEntiere.value = !journeeEntiere.value;
  console.log(journeeEntiere.value);
}

const isThereErrors = ref(false);

const intitule = ref(null);
const errorIntitule = ref(false);

const date = ref(false);
const errorDate = ref(false);

const journeeEntiere = ref(false);
const errorJourneeEntiere = ref(false);

function hourMinutesInNumber(str) {
  const parts = str.split(":");
  const numberMinutes = Number(parts[0]) * 60 + Number(parts[1]);
  return numberMinutes;
}

function dateForNewDateFormat(jour, heure) {
  const str1 = jour.concat("T", heure);
  const dateISO8601 = str1.concat(":00Z");
  console.log(dateISO8601);
  const dateTimestamp = Date.parse(dateISO8601);
  console.log(dateTimestamp);
  return dateTimestamp;
}

const beginningTask = ref(null);
const begginingTaskInNumber = computed(() => {
  if (beginningTask.value) return hourMinutesInNumber(beginningTask.value);
});
const errorBeginningTask = ref(false);
const beginningTaskISO8601 = computed(() => {
  return dateForNewDateFormat(date.value, beginningTask.value);
});

const endTask = ref(null);
const endTaskInNumber = computed(() => {
  if (endTask.value) return hourMinutesInNumber(endTask.value);
});
const endTaskISO8601 = computed(() => {
  return dateForNewDateFormat(date.value, endTask.value);
});

const errorEndTask = ref(false);
const errorTimeTask = ref(false);

const localisation = ref(null);
const errorLocalisation = ref(false);

const description = ref(null);

const typeEventToSend = ref(null);

const errors = ref([]);

function reinitialisationValue() {
  intitule.value = null;
  journeeEntiere.value = null;
  date.value = null;
  beginningTask.value = null;
  endTask.value = null;
}

function reinitialisationErrors() {
  isThereErrors.value = false;
  errorIntitule.value = false;
  errorBeginningTask.value = false;
  errorEndTask.value = false;
  errorChooseClassTaskForStudent.value = false;
  errorClassChosen.value = false;
  errorDate.value = false;
}

function validateAddTask() {
  console.log(props.typeEvent);
  reinitialisationErrors();

  //reinitialisation erreur tableau
  errors.value = [];
  //contrôle des champs du formulaire
  if (!intitule.value || intitule.value == "" || intitule.value.length < 3) {
    errorIntitule.value = "Ce champ est requis (minimum 3 caractères)";
    isThereErrors.value = true;
  }

  if (!date.value) {
    errorDate.value = "Une date est requise";
    isThereErrors.value = true;
  }

  if (!beginningTask.value && !journeeEntiere.value) {
    errorBeginningTask.value = "Il faut une heure de départ";
    isThereErrors.value = true;
  }

  if (!endTask.value && !journeeEntiere.value) {
    errorEndTask.value = "Il faut une heure de fin";
    isThereErrors.value = true;
    console.log("problèmeDate");
  }

  //si dayEntier, envoyer horaire 8h-18h par exemple / si pas dayEntier, envoyer start et end
  if (journeeEntiere.value) {
    beginningTask.value = "08:00";
    endTask.value = "20:00";
  }

  if (props.typeEvent == "myClassEvent" && !chooseClassTaskForStudent.value) {
    errorChooseClassTaskForStudent.value =
      "Il faut sélectionner le type de tâche";
    isThereErrors.value = true;
    console.log("problèmeDate");
  }

  if (!classChosen.value && props.typeEvent == "test") {
    isThereErrors.value = true;
    errorClassChosen.value = "Tu dois sélectionner une classe";
  }

  if (beginningTaskISO8601.value >= endTaskISO8601.value) {
    isThereErrors.value = true;
    errorTimeTask.value =
      "L'heure de début doit être inférieure à l'heure de fin";
  } else {
    errorTimeTask.value = false;
  }

  //si pas d'erreur, on envoie le formulaire
  if (!isThereErrors.value) {
    const datasForLaravel = {
      titre: intitule.value,
      debut: beginningTaskISO8601.value,
      fin: endTaskISO8601.value,
      localisation: localisation.value,
      description: description.value,
      classe: forWhichClassEvent.value,
      typeEvent: event.value,
    };

    //fetch post envoi des datas au back-end

    fetch("https://abe-pingouin.heig-vd.ch/api/taches", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Authorization": "application/json"
      },
      body: JSON.stringify(datasForLaravel),
    });

    console.log(datasForLaravel);
    emits("closeAddTask", isFinished.value);
    reinitialisationValue();
  }

  /*         emits('closeAddTask', isFinished.value); */
}
</script>

<template>
  <form @submit.prevent="" class="formulaire">
    <div class="header">
      <!--     <button type="submit">hello</button> -->
      <a-button-menu-task
        @click="cancelAddTask"
        icon="close"
        baseColor="#C8C8C8"
        backgroundColor="#262626"
      ></a-button-menu-task>
      <p class="white middle">Nouvel événement</p>
      <a-button-menu-task
        @click.prevent="validateAddTask"
        icon="done"
        baseColor="#C8C8C8"
        backgroundColor="#262626"
      ></a-button-menu-task>
    </div>
    <div class="containers">
      <div class="body">
        <div class="ligne">
          <span class="white material-icons mdc-fab__icon">title</span>
          <input
            type="text"
            class="white input"
            placeholder="Intitulé"
            v-model="intitule"
          />
        </div>
        <div v-if="errorIntitule" class="ligne error">
          {{ errorIntitule }}
        </div>
        <div class="ligne">
          <span class="white material-icons mdc-fab__icon">calendar_month</span>
          <input
            type="date"
            class="white input"
            placeholder="Intitulé"
            v-model="date"
          />
        </div>
        <div v-if="errorDate" class="ligne error">
          {{ errorDate }}
        </div>
        <div class="ligne">
          <span
            class="material-icons mdc-fab__icon"
            :class="journeeEntiere ? 'active' : 'white'"
            @click="dealWithDay"
            >{{ iconToShow }}</span
          >
          <p class="white">Journée entière</p>
        </div>
        <div class="ligne" v-if="!journeeEntiere">
          <span class="white material-icons mdc-fab__icon">timer</span>
          <input
            type="time"
            class="white input"
            placeholder="Date début"
            v-model="beginningTask"
          />
        </div>
        <div v-if="errorBeginningTask" class="ligne error">
          {{ errorBeginningTask }}
        </div>
        <div v-if="errorTimeTask" class="ligne error">
          {{ errorTimeTask }}
        </div>
        <div v-if="!journeeEntiere" class="ligne">
          <span class="white material-icons mdc-fab__icon">timer_off </span>
          <input
            type="time"
            class="white input"
            placeholder="Date fin"
            v-model="endTask"
          />
        </div>
        <div v-if="errorEndTask" class="ligne error">
          {{ errorEndTask }}
        </div>
        <div class="ligne">
          <span class="white material-icons mdc-fab__icon">pin_drop</span>
          <input
            type="text"
            class="white input"
            placeholder="Localisation"
            v-model="localisation"
          />
        </div>
        <div class="ligne">
          <span class="white material-icons mdc-fab__icon">edit_note</span>
          <input
            type="text"
            class="white input"
            placeholder="Description"
            v-model="description"
          />
        </div>
      </div>
    </div>
    <div class="containers second">
      <div class="row">
        <div class="white">Type d'évent : {{ event }}</div>
        <div
          v-if="user == 'student' && props.typeEvent == 'myClassEvent'"
          class="choose"
        >
          <label class="white" for="task-select">Type de tâche</label>
          <select
            name="typeTask"
            id="task-select"
            class="select"
            v-model="chooseClassTaskForStudent"
          >
            <option class="white" selected>Devoir</option>
            <option class="white">Autre</option>
          </select>
        </div>
        <div v-if="props.typeEvent == 'test'" class="choose">
          <label class="white" for="classe-select">Choisis la classe</label>
          <select
            name="heigClasses"
            id="classe-select"
            class="select"
            v-model="classChosen"
          >
            <!--             <option class="white" value="chooseClass" selected>
              --Choisis ta classe--
            </option> -->
            <option class="white" v-for="classe in tabClasses" :value="classe">
              {{ classe }}
            </option>
          </select>
        </div>
      </div>
      <div v-if="errorChooseClassTaskForStudent" class="ligne error">
        {{ errorChooseClassTaskForStudent }}
      </div>
      <div v-if="errorClassChosen" class="ligne error">
        {{ errorClassChosen }}
      </div>
    </div>
  </form>
</template>



<style scoped>
.select {
  background-color: #262626;
  border-radius: 10px;
  color: white;
  /*   max-width:60px; */
}
.active {
  color: #a9ffd6;
}
div.ligne.error {
  background-color: red;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-left: 5px;
}
.containers {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-basis: auto;
  background-color: #262626;
  border-radius: 10px;
  margin: 15px;
}

.noShow {
  opacity: 0;
}

input {
  /* flex-grow:3; */
  text-align: left;
  background-color: #262626;
  border-radius: 10px;
  flex-grow: 2;
}

span {
  width: 70px;
}

div.ligne {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-basis: auto;
  margin: 10px 0px;
  width: 100%;
  border-color: red;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 3px;
  align-items: center;
  background-color: #262626;
}

p.middle {
  margin: auto;
}

.body {
  display: flex;
  flex-direction: column;
  margin: 10px;
}

.white {
  color: white;
}

.second {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 5px;
}

div.row {
  display: flex;
  flex-direction: row nowrap;
  justify-content: flex-start;
  flex-basis: auto;
}

div.choose {
  display: flex;
  flex-direction: column;
  padding: 15px 50px;
  flex-grow: 2;
  margin: auto;
}
</style>
