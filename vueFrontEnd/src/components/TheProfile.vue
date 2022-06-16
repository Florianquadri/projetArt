<script setup>
import { ref, computed, watchEffect } from "vue";

import TheHeaderProfile from "./TheHeaderProfile.vue";
import { useFetch } from "../composables/fetch.js";
import { apiHoraireBase } from "../config/horaires.js";
import aButtonChecked from "./aButtonChecked.vue";
import {user, userClass, userPrenom, userNom } from "../state.js";

const firstLetterName = ref("F");
const profileIsClicked = ref(false);

function clickProfile() {
  profileIsClicked.value = !profileIsClicked.value;
}

const { data: courses } = useFetch(apiHoraireBase);
</script>

<template>
  <div class="profil">
    <div class="insideProfil">
      <div>
        <div class = 'img' v-if="user == 'anonymous'">
          
         <a href="/login">
          <img
          src="../assets/Property1OFFPPic.png"
          alt="ProfilePic"/>
          </a>
        </div>
        
      
        <img
          v-if="user == 'student' || user == 'teacher'"
          src="../assets/Property1ONPPic.png"
          @click="clickProfile"
          alt="ProfilePic"
        />
        <div class="popUpProfile" :class="profileIsClicked ? 'active' : ''">
          <the-header-profile
            :show="profileIsClicked"
            @isClicked="clickProfile"
          >
          </the-header-profile>

          <div
            class="profile_content"
            v-if="user == 'student' || user == 'teacher'"
          >
            <div class="personal_frame">
              <div class="personal_infos">
                <div class="titres">
                  <h2 id="title">Infos personelles</h2>
                </div>
                <div class="roles">
                  <h4>Rôles :</h4>
                  <p v-if="user == 'student'">Elève</p>
                  <p v-if="user == 'teacher'">Professeur</p>

                 <span class="details"> <h4>Nom :</h4>
                  <p>{{userNom}}</p>
                  </span>

                  <span class="details">
                  <h4>Prenom :</h4>
                  <p>{{userPrenom}}</p>
                  </span>

                  <span class="details">
                  <h4>Classe :</h4>
                  <p>{{userClass}}</p>
                  </span>
                 
                                                
                </div>
              </div>
              <div class="personal_notifs">
                <div class="titres">
                  <h2 id="title">Notifications</h2>
                </div>
                <div class="notifs">
                  <p>Sélectionnez les notifs que vous voulez avoir:</p>
                </div>

                <div class="nav-item-flex">
                  <a>
                    <li class="task">Test</li>
                  </a>
                  <a-button-checked
                    baseColor="transparent"
                    hoverColor="grey"
                    selectedColor="#6BA2FF"
                    baseBorderColor="#6BA2FF"
                    selectedBorderColor="#6BA2FF"
                    value="test"
                  >
                  </a-button-checked>
                </div>
                <div class="nav-item-flex">
                  <a>
                    <li class="task">Devoir</li>
                  </a>
                  <a-button-checked
                    baseColor="transparent"
                    hoverColor="grey"
                    selectedColor="#6BA2FF"
                    baseBorderColor="#6BA2FF"
                    selectedBorderColor="#6BA2FF"
                    value="test"
                  >
                  </a-button-checked>
                </div>
                <div class="nav-item-flex">
                  <a>
                    <li class="task">Changement de salle</li>
                  </a>
                  <a-button-checked
                    baseColor="transparent"
                    hoverColor="grey"
                    selectedColor="#6BA2FF"
                    baseBorderColor="#6BA2FF"
                    selectedBorderColor="#6BA2FF"
                    value="test"
                  >
                  </a-button-checked>
                </div>
                <div class="nav-item-flex">
                  <a>
                    <li class="task">Changement d'horaires</li>
                  </a>
                  <a-button-checked
                    baseColor="transparent"
                    hoverColor="grey"
                    selectedColor="#6BA2FF"
                    baseBorderColor="#6BA2FF"
                    selectedBorderColor="#6BA2FF"
                    value="test"
                  >
                  </a-button-checked>
                </div>
                <div class="nav-item-flex">
                  <a>
                    <li class="task">Evénement</li>
                  </a>
                  <a-button-checked
                    baseColor="transparent"
                    hoverColor="grey"
                    selectedColor="#6BA2FF"
                    baseBorderColor="#6BA2FF"
                    selectedBorderColor="#6BA2FF"
                    value="test"
                  >
                  </a-button-checked>
                </div>
              </div>
            </div>
          </div>
          <div class="connect" v-if="user == 'anonymous'">
            </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
h1 {
  margin-bottom: 1.5rem;
}

button {
  margin-right: 1.5rem;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
button {
  margin-right: 1vw;
}
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
button {
 margin-right: 1vw;
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
button {
  margin-right: 34vw;
}
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
button {
   margin-right: 51vw;
}
}
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
button {
   margin-right: 51vw;
}
}

.error {
  animation-name: errorShake;
  animation-duration: 0.3s;
}

h4 {
  font-weight: 700;
}

p {
  margin-right: 10px;
  margin-bottom: 2rem;
}
.task {
  margin-left: 16px;
}

li {
  list-style: none;
}

.nav-item-flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-right: 5vw;
  cursor: pointer;
}

.personal_frame {
  color: #FFFFFF;
}

#title {
  margin-left: 10px;
}

.titres {
  text-align: left;
  width: 42vw;
  background-color: #414141;
  border-radius: 10px;
}

.personal_infos {
  text-align: left;
  margin-top: 10vh;
}

.personal_notifs {
  margin-top: 6vh;
  text-align: left;
}

.profil {
  display: flex;
  align-items: center;
  padding: 10px 15px;
}

.insideProfil {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.nom {
  color: #e7f0ff;
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

div.popUpProfile {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  position: fixed;
  top: -350vh;
  left: 0;
  display: flex;
  flex-direction: column;
  z-index: 10;
  text-align: center;
  width: 100%;
  margin: auto;
  height: 100%;
  justify-content: flex-start;
  padding: 10px;
  opacity: 1;
  border-radius: 10px;
  transition: 0.3s;
}

div.popUpProfile.active {
  z-index: 1000;
  bottom: 0px;
  background-color: #121418;
  border-top: 1px solid #e7f0ff;
  opacity: 1;
  height: 100%;
  transition: 0.3s;
  top: 0;
}
</style>
