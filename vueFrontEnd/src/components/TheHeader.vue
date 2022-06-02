<script setup>
import { ref, computed, watchEffect } from 'vue';
import TheBurger from './TheBurger.vue';
import TheProfile from './TheProfile.vue';
</script>

<template>
    <div class="container_header">
<the-burger></the-burger>
<the-profile></the-profile>
    </div>
</template>



<style scoped>
.container_header {
width:100%;
    min-height: 70px;
position: fixed;
top:0;
    display: flex;
    flex-direction: row;
    flex-basis: auto;
    justify-content: space-between;
    background-color: #262626;
    
}

</style>
