<script setup>
import { ref, computed, watchEffect } from "vue";
import TheProfile from "./TheProfile.vue";
import TheSelection from "./TheSelection.vue";
import { user } from "../state.js";
import aButtonMenuTask from "./aButtonMenuTask.vue";

const props = defineProps({
  show: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const buttonIsClicked = ref(false);
const show = computed(() => {
  return props.show;
});

const emits = defineEmits(["isClicked"]);

function crossIsClicked() {
  crossIsClicked.value = !crossIsClicked.value;
  emits("isClicked", crossIsClicked.value);
}
</script>

<template>
  <div class="container_header_profile" :class="show ? 'active' : ''">
    <div class="profile_tag">Mon Profil</div>
    <div class="button">
      <span class="material-icons mdc-fab__icon" @click="crossIsClicked"
        >close</span
      >
    </div>
  </div>
</template>


<style scoped>
.profile_tag {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  text-align: left;
  margin-right: auto;
  
}

.container_header_profile {
  width: 100%;
  min-height: 70px;
  position: fixed;
  top: -100vh;
  display: flex;
  flex-direction: row;
  flex-basis: auto;
  justify-content: space-between;
  background-color: #007fd4;
  opacity: 0;
  position: relative;
  display: flex;
  padding-left: 10px;
}

.button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 10px;
  cursor: pointer;
}

.container_header_profile.active {
  width: 100%;
  min-height: 70px;
  position: fixed;
  top: 0vh;
  left: 0;
  display: flex;
  flex-direction: row;
  flex-basis: auto;
  justify-content: flex-end;
  opacity: 1;
}

.material-icons.mdc-fab__icon {
  color: #c8c8c8;
}

.mdc-fab__icon:hover {
  color: #121418;
}
</style>



