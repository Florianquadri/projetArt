<script setup>
import { ref, computed, watchEffect } from 'vue';
import TheProfile from './TheProfile.vue';
import TheSelection from './TheSelection.vue';
import { user } from "../state.js";



</script>

<template>
    <div class="container_header_profile">
        
               
      
    </div>
</template>



<style scoped>
.container_header_profile {
    width: 100%;
    min-height: 70px;
    position: fixed;
    top: 0;
    display: flex;
    flex-direction: row;
    flex-basis: auto;
    justify-content: space-between;
    background-color: #007fd4;
    border-bottom: 1px solid #E7F0FF;
    opacity: 1;

}


</style>
