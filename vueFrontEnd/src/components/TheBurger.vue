<script setup>
import { computed, onMounted, onUnmounted, ref, watchEffect } from "vue";
import aButtonChecked from "./aButtonChecked.vue";
import {
  coursChecked,
  testChecked,
  eventChecked,
  devoirChecked,
} from "../state.js";
import { page } from "../state.js";

const isMenuVisible = ref(false);
const vueMobile = ref(false);
const isButtonClicked = ref(false);
const pageMaj = computed(() => {
  return page.value.charAt(0).toUpperCase() + page.value.slice(1);
});
/* const isClicked = ref(false); */

//capter qu'on est sur mobile pour afficher "menu" Dans menu burger popant - gauche

let windowWidth = ref(window.innerWidth);
const onWidthChange = () => (windowWidth.value = window.innerWidth);

onMounted(() => window.addEventListener("resize", onWidthChange));
onUnmounted(() => window.removeEventListener("resize", onWidthChange));

const device = computed(() => {
  if (windowWidth.value <= 768) return "smartphone";
  if (windowWidth.value > 768 && windowWidth.value < 992) return "tablette";
  if (windowWidth.value > 993) return "ordi";
  return null; // This is an unreachable line, simply to keep eslint happy.
});

const width = computed(() => windowWidth.value);

function toggleMenu() {
  isMenuVisible.value = !isMenuVisible.value;
}

function fermeMenu() {
  isMenuVisible.value = false;
  console.log("hello");
}

function redirigeSurPage(pageEnvoyee) {
  page.value = pageEnvoyee;
  console.log(pageEnvoyee);
}

/* const valueClicked = ref({ "cours" : false, "test" : false, "event": false, "devoir": false }); */
//il faut une variable qui capte quelles cases sont cochées ou non
//chaque bouton doit être présent dans le tableau quand isClicked is true, sinon pas dans tableau
</script>

<template>
  <nav class="navbar">
    <ul class="nav-menu" :class="isMenuVisible ? 'active' : ''">
      <!--        <span class="abc">{{page}}</span> -->
      <!--         //v-for des éléments reçu et créer un composant pour li et envoyer les détails -->
      <div class="nav-division">
        <li class="nav-item">
          <a
            class="nav-link-category"
            :class="device"
            v-if="device == 'smartphone'"
            >Menu</a
          >
        </li>
        <li class="nav-item">
          <a
            href="#planning"
            class="nav-link nav-link-button"
            :class="device"
            @click="
              fermeMenu();
              redirigeSurPage('planning');
            "
            >Planning</a
          >
        </li>
        <li class="nav-item">
          <a
            href="#mois"
            class="nav-link nav-link-button"
            :class="device"
            @click="
              fermeMenu();
              redirigeSurPage('mois');
            "
            >Mois</a
          >
        </li>
      </div>
      <div class="nav-division">
        <li class="nav-item">
          <a
            class="nav-link-category"
            :class="device"
            v-if="device == 'smartphone'"
            >Affichage</a
          >
        </li>
        <div class="nav-item-flex">
          <li class="nav-item">
            <a :class="device">Cours</a>
          </li>
          <!--                     {{ coursChecked }} -->
          <a-button-checked
            baseColor="transparent"
            hoverColor="grey"
            selectedColor="#84F4BF"
            baseBorderColor="#84F4BF"
            selectedBorderColor="#84F4BF"
            value="cours"
            @isClicked="coursChecked = $event"
          ></a-button-checked>
        </div>
        <div class="nav-item-flex">
          <li class="nav-item">
            <a :class="device">Test</a>
          </li>
          <!--                     {{ testChecked }} -->
          <a-button-checked
            baseColor="transparent"
            hoverColor="grey"
            selectedColor="#F94040"
            baseBorderColor="#F94040"
            selectedBorderColor="#F94040"
            value="test"
            @isClicked="testChecked = $event"
          >
          </a-button-checked>
        </div>
        <div class="nav-item-flex">
          <li class="nav-item">
            <a :class="device">Event</a>
          </li>
          <!--                     {{ eventChecked }} -->
          <a-button-checked
            baseColor="transparent"
            hoverColor="grey"
            selectedColor="#FF8935"
            baseBorderColor="#FF8935"
            selectedBorderColor="#FF8935"
            value="event"
            @isClicked="eventChecked = $event"
          >
          </a-button-checked>
        </div>
        <div class="nav-item-flex">
          <li class="nav-item">
            <a :class="device">Devoir</a>
          </li>
          <!--                     {{ devoirChecked }} -->
          <a-button-checked
            baseColor="transparent"
            hoverColor="grey"
            selectedColor="#1D4EFF"
            baseBorderColor="#1D4EFF"
            selectedBorderColor="#1D4EFF"
            value="devoir"
            @isClicked="devoirChecked = $event"
          >
          </a-button-checked>
        </div>
      </div>
    </ul>
    <div
      class="hamburger"
      :class="isMenuVisible ? 'active' : ''"
      @click="toggleMenu"
    >
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
    <div v-if="device == 'smartphone'" class="nameSection">{{ pageMaj }}</div>
  </nav>
  <!--     {{ device }} -->
</template>

<style scoped>
/* //ajouter style css dynamique pour viewport smartphone ou ordi */
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

li {
  list-style: none;
}

a {
  color: white;
  text-decoration: none;
}

/* a.smartphone {
    color: white;
    text-decoration: none;
} */

.navbar {
  min-height: 70px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  z-index: 4;
}

.nav-link {
  transition: 0.7s ease;
}

.nav-link:hover {
  color: white;
}

.nav-link-category {
  font-weight: bold;
  font-size: 1.5rem;
}

.hamburger {
  display: none;
  cursor: pointer;
}

.bar {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  background-color: #e7f0ff;
}

.abc {
  color: white;
}

.hamburger {
  display: block;
}

.hamburger.active .bar:nth-child(2) {
  opacity: 0;
}

.hamburger.active .bar:nth-child(1) {
  transform: translateY(8px) rotate(225deg);
  background-color: #A9FFD6;
}

.hamburger.active .bar:nth-child(3) {
  transform: translateY(-8px) rotate(-225deg);
    background-color: #FF8935;
}

.nav-menu {
  display: flex;
  justify-content: space-between;
  z-index: 4;
  gap: 10%;
  position: fixed;
  left: -100%;
  top: 71px;
  height: 100%;
  gap: 0;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #262626;
  width: 75%;
  opacity: 1;
  text-align: left;
  padding-left: 30px;
  padding-right: 30px;
  transition: 0.3s;
  border-right: 0px solid black;
}

.nav-item {
  margin: 16px 0;
}

.nav-menu.active {
  left: 0;
  justify-content: flex-start;
  border-top: 1px solid #e7f0ff;
  z-index: 4;
  filter: drop-shadow(25vw 0px 0px rgba(0, 0, 0, 0.5));
}

.nav-division {
  z-index: 5;
}

.nav-item-flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.nav-link {
  background-color: transparent;
  border-radius: 50px;
  padding: 5px 10px;
}

.nav-link:hover {
  background-color: black;
  padding: 5px 10px;
}

@media (min-width: 769px) {
  .nav-menu {
    position: fixed;
    left: 0px;
    top: 70px;
    height: 100%;
    width: 15%;
    gap: 0;
    flex-direction: column;
    justify-content: flex-start;
    background-color: #262626;
    opacity: 1;
    text-align: left;
    padding-left: 15px;
    padding-right: 15px;
    transition: 0.3s;
    z-index: 4;
  }

  /*     .nav-menu.active {
        left: 100;
        justify-content: flex-start;
        width: 50%;
    } */

  @media (min-width: 993) {
    /*     .nav-menu {
        width: 10%;
        gap: 0;
        flex-direction: column;
        justify-content: flex-start;
        background-color: #60E1E0;
        opacity: 1;
        text-align: left;
        padding-left: 15px;
        padding-right: 15px;
        transition: 0.3s;
    } */
  }

  .hamburger {
    display: none;
    transition: 0.3s;
  }
}

.nameSection {
  color: white;
  margin-left: 10px;
}
</style>