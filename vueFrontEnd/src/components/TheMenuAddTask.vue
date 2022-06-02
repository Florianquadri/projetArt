<script setup>
import { ref, computed, watchEffect } from 'vue';
</script>

<template>
<div class="container">
</div>
</template>



<style scoped>
.container {
position:fixed;
right:0%;
bottom:0%;
height:50px;
width:50px;
margin-right:20px;
margin-bottom:20px;
border-radius:15px;
background-color:black;
}

.container:hover {
background-color:white;
}

</style>
