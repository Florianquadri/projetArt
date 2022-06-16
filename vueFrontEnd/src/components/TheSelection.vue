<script setup>
import { ref, computed, watchEffect } from 'vue';
import { myClass } from "../state.js";

const props = defineProps({
    classes: {
        type: Array,
        required: true,
        default: "M78"
    }
})

const monChoixDeClasse = ref("Horaire teacher"); //valeur liée à agenda du prof ?

const emits = defineEmits([
    'changeClasse'
]);

function onChange(evenement) {
    console.log(monChoixDeClasse.value, "testYeric");
    //On y accède de n'importe où dans le framework
    emits('changeClasse', monChoixDeClasse.value);
}
</script>

<template>
    <!--     <h2>Sélection cours / période de temps / que voir exams</h2> -->
    <div class="container_list white">

        <label class="white" for="classes-select">Choisis ta classe</label>
        <select name="heigClasses" class="white" id="classes-select" v-model="monChoixDeClasse" @change="onChange($evenement)">
            <option class="white" value="yourPlanning">Your planning</option>
            <option class="white" v-for="classe in classes" :value="classe">{{ classe }}</option>
        </select>
            </div>
</template>


<style scoped>
label {
    display: none;
}
.container_list {
    display: flex;
    align-items: center;
}

#classes-select {
        background-color:#262626;
            border-radius:10px;
            color:white;
}

.white{
    color:white;
}
</style>
