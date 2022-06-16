<script setup>
import { ref, computed, watchEffect } from "vue";
import aButtonMenuTask from "./aButtonMenuTask.vue";
import addEvent from "./addEvent.vue";
import { user } from "../state.js";
import { myClass } from "../state.js";
import { useFetch } from "../composables/fetch.js";
import { apiHoraireBase } from "../config/horaires.js";
const { data: courses } = useFetch(apiHoraireBase);

const mustCloseContainerAddTask = ref(false);
const typeOfEvent = ref(null);

const mainButtonTaskPushed = ref(false);
const divAddTaskVisible = ref(false);

function toggleTaches() {
  mainButtonTaskPushed.value = !mainButtonTaskPushed.value;
}

function fermeTaches() {
  isMenuVisible.value = false;
  console.log("hello");
}

function showAddTask(evt) {
  mainButtonTaskPushed.value = !mainButtonTaskPushed.value;
  divAddTaskVisible.value = !divAddTaskVisible.value;
  console.log(divAddTaskVisible.value);
  typeOfEvent.value = evt;
  console.log(typeOfEvent.value);
}

function hideContainer(event) {
  divAddTaskVisible.value = !divAddTaskVisible.value;
}
</script>

<template>
  <div v-if="user == 'teacher' || user == 'student'" class="containsTask" :class="mainButtonTaskPushed ? 'active' : ''">
    <div class="container">
      <button
        class="add"
        @click="toggleTaches"
        :class="mainButtonTaskPushed ? 'pushed' : ''"
      >
        <div></div>
        <span
          class="material-icons mdc-fab__icon"
          :class="mainButtonTaskPushed ? 'pushed' : ''"
          >{{ mainButtonTaskPushed ? "remove" : "add" }}</span
        >
        <div></div>
      </button>
    </div>
    <div class="containerAllTasks" v-if="mainButtonTaskPushed">
      <!--         <a-button-menu-task icon="add" @click="toggleTaches"></a-button-menu-task> -->
      <div class="label_icon" v-if="user == 'student'">
        <span class="text">Tâche perso</span>
        <a-button-menu-task
          @click="showAddTask('private')"
          icon="event" borderColor="#FFFFFF" baseColor = "#FFFFFF"
        ></a-button-menu-task>
      </div>
      <div class="label_icon" v-if="user == 'student'">
        <span class="text">{{ myClass }}</span>
        <a-button-menu-task
          @click="showAddTask('myClassEvent')"
          icon="accessibility" borderColor="#FFFFFF" baseColor="white"
        ></a-button-menu-task>
      </div>
      <div class="label_icon" v-if="user == 'teacher'">
        <span class="text">Event académique</span>
        <a-button-menu-task
          @click="showAddTask('academic')"
          icon="event" borderColor="#FFFFFF" baseColor = "white"
        ></a-button-menu-task>
      </div>
      <div class="label_icon" v-if="user == 'teacher'">
        <span class="text">Test</span>
        <a-button-menu-task
          @click="showAddTask('test')"
          icon="celebration"  borderColor="#FFFFFF" baseColor = "white"
        ></a-button-menu-task>
      </div>
    </div>
  </div>
  <div
    class="containerAddTaask"
    :class="divAddTaskVisible ? 'addTaskActive' : ''"
  >
    <add-event
      @closeAddTask="hideContainer($event)"
      :typeEvent="typeOfEvent"
    ></add-event>
  </div>
</template>



<style scoped>
/* .v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
} */
.containsTask {
  display: flex;
  position: fixed;
  z-index: 4;
  right: 15px;
  bottom: 25px;
  flex-direction: column-reverse;
  align-items: right;
  width: auto;
  background-color: transparent;
  /*         border-radius: 10px;
    padding:10px; */
}

.white {
  color: white;
}
.containsTask.active {
  transition: 0.7s ease;
  background-color: #262626;
  border-radius: 10px;
  padding: 10px;
}

.container {
  width: 50px;
  margin-right: 15px;
  display: flex;
}

.add {
  border-radius: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6ba2ff;
}


.mdc-fab__icon {
  color: white;
}

.mdc-fab__icon:hover {
  color: #262626;
}

button.pushed {
  background-color: #ffffff;
}

span.pushed {
  color: #6ba2ff;
  border: 1px solid white;
}

div.label_icon {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-basis: auto;
  align-items: center;
  text-align: center;
  margin-right: 15px;
  padding-bottom: 25px;
}

.containerAllTasks {
  background-color: #262626;
  border-radius: 10px;
  padding-left: 10px;
  padding-top: 10px;
}

span.text {
  flex-grow: 2;
  text-align: right;
  margin-right: 10px;
  color: white;
}

div.containerAddTaask {
  position: fixed;
  display: flex;
  flex-direction: column;
  flex-basis: auto;
  bottom: -100vh;
  width: 100vw;
  text-align: center;
  left: 0px;
  height: 100vh;
  justify-content: flex-start;
  background-color: black;
  opacity: 0;
  border: 1px solid black;
  transition: 0.3s;
}

div.containerAddTaask.addTaskActive {
  z-index: 5;
  bottom: 0px;
  border-top: 1px solid #e7f0ff;
  opacity: 1;
}
</style>
