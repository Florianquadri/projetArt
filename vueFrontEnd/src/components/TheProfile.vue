<script setup>
import { ref, computed, watchEffect } from "vue";
import { user } from "../state.js";
import TheHeaderProfile from './TheHeaderProfile.vue';

const firstLetterName = ref("F");
const profileIsClicked = ref(false);

function clickProfile() {
  profileIsClicked.value = !profileIsClicked.value;
}
</script>

<template>

  <div class="profil" @click="clickProfile">
    <div class="insideProfil">
        
      <img v-if="user=='anonymous'" src="../assets/Property 1=OFFPPic.png" alt="ProfilePic" />
      <img v-if="user=='student'||user=='teacher'" src="../assets/Property 1=ONPPic.png" alt="ProfilePic" />
    </div>

    <div class="popUpProfile" :class="profileIsClicked ? 'active' : ''">
        <the-header-profile></the-header-profile>
      <span class="bar" @click="clickProfile= !clickProfile"></span>
    </div>
  </div>

</template>



<style scoped>
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
    position: fixed;
    top: -100vh;
    left:0;
    display: flex;
    flex-direction: column;
    z-index: 10;
    text-align: center;
    width: 100%;
    margin: auto;
    height: 100%;
    justify-content: flex-start;
    
    padding:10px;
    opacity: 1;
    border-radius: 10px;
    transition: 0.3s;
}

div.popUpProfile.active {

    z-index: 1000;
    bottom: 0px;
    background-color: #606060;
    border-top: 1px solid #E7F0FF;
    opacity: 1;
    height: 100%;
    transition: 0.3s;
    top: 0;

}
</style>
