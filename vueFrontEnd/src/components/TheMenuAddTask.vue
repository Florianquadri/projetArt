<script setup>
import { ref, computed, watchEffect } from 'vue';
import aButtonMenuTask from './aButtonMenuTask.vue';
import {user} from '../state.js';

const mainButtonTaskPushed = ref(false);


function toggleTaches() {
    mainButtonTaskPushed.value = !mainButtonTaskPushed.value;
}

function fermeTaches() {
    isMenuVisible.value = false;
    console.log("hello");
}
</script>

<template>
    <div class="containsTask" :class="mainButtonTaskPushed ? 'active' : ''">
        <div class="container">
            <button class="add" @click="toggleTaches" :class="mainButtonTaskPushed ? 'pushed' : ''">
                <div></div>
                <span class="material-icons mdc-fab__icon" :class="mainButtonTaskPushed ? 'pushed' : ''">{{
                        mainButtonTaskPushed ? 'remove' : 'add'
                }}</span>
                <div></div>
            </button>
        </div>
        <div class="containerAllTasks" v-if="mainButtonTaskPushed">
            <!--         <a-button-menu-task icon="add" @click="toggleTaches"></a-button-menu-task> -->
            <div class="label_icon">
                <span class="text">Evenement</span>
                <a-button-menu-task icon="event"></a-button-menu-task>
            </div>
            <div class="label_icon" v-if="user =='student'">
                <span class="text">M49-1</span>
                <a-button-menu-task icon="accessibility"></a-button-menu-task>
            </div>

            <div class="label_icon" v-if="user =='teacher'">
                <span class="text">Test</span>
                <a-button-menu-task icon="event_note"></a-button-menu-task>
            </div>
        </div>
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
    right: 15px;
    bottom: 25px;
    flex-direction: column-reverse;
    align-items: right;
    width: auto;
    background-color: transparent;
    /*         border-radius: 10px;
    padding:10px; */
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
    background-color: #6BA2FF;
}

.add:hover {
/*     background-color: #60E1E0; */
    ;
}

.mdc-fab__icon {
    color: white;
}

.mdc-fab__icon:hover {
    color: #262626;
}

button.pushed {
    background-color: #FFFFFF;
}

span.pushed {
    color: #6BA2FF;
    border:1px solid white
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
    color:white;
}
</style>
