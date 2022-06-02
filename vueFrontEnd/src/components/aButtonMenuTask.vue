<script setup>
import { ref, computed, watchEffect } from 'vue';

const props = defineProps({
    icon: {
        type: String,
        required: false,
        default: "add"
    }
    ,    iconHover: {
        type: String,
        required: false,
        default: "add"
    }
})

const icon = ref(props.icon);
</script>

<template>
<div class="container_button">
  <button class="add">
    <div></div>
    <span class="material-icons mdc-fab__icon">{{icon}}</span>
    <div></div>
  </button>
</div>
</template>



<style scoped>
/* .container {
height:50px;
width:50px;
text-align:center;
} */

.add:hover {
background-color:#60E1E0;;
}



.add{
border-radius:10px;
width:40px;
height:40px;
display:flex;
justify-content:center;
align-items:center;
background-color:#262626;
text-align:center;
}

.mdc-fab__icon{
    color:white;
}

.mdc-fab__icon:hover{
    color:#262626;
}

</style>
