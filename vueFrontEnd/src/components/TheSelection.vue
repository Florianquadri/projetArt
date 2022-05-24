<script setup>
import { ref, computed, watchEffect } from 'vue';

const props = defineProps({
    classes: {
        type: Array,
        required: true,
        default: "M78"
    }
})
</script>

<template>
    <h2>Sélection cours / période de temps / que voir exams</h2>
    <label for="classes-select">Choisis ta classe</label>
    <select name="pets" id="classes-select">
        <option value="">--Choisis ta classe--</option>
        <option v-for="classe in classes" value=classe>{{classe}}</option>
    </select>
</template>

<style>
label {
    display: none;
}
</style>
