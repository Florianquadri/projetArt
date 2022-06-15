<script setup>
import { ref, computed, watchEffect } from "vue";
import { user } from "../state.js";
import TheHeaderProfile from "./TheHeaderProfile.vue";
import { useFetch } from "../composables/fetch.js";
import { apiHoraireBase } from "../config/horaires.js";
import aButtonChecked from "./aButtonChecked.vue";

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
          
         <a href="https://abe-pingouin.heig-vd.ch/login">
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
                  <p>Rôles :</p>
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

.error {
  animation-name: errorShake;
  animation-duration: 0.3s;
}

@keyframes errorShake {
  0% {
    transform: translateX(-25px);
  }
  25% {
    transform: translateX(25px);
  }
  50% {
    transform: translateX(-25px);
  }
  75% {
    transform: translateX(25px);
  }
  100% {
    transform: translateX(0);
  }
}

p {
  margin-right: 10px;
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
  color: #c8c8c8;
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
  margin-top: 30vh;
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
  top: -100vh;
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
  background-color: #606060;
  border-top: 1px solid #e7f0ff;
  opacity: 1;
  height: 100%;
  transition: 0.3s;
  top: 0;
}
</style>
