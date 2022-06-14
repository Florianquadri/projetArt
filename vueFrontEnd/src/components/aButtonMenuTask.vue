<script setup>
import { ref, computed, watchEffect } from 'vue';

const props = defineProps({
    icon: {
        type: String,
        required: false,
        default: "add"
    },    
    iconHover: {
        type: String,
        required: false,
        default: "add"
    },
    baseColor: {
        type: String,
        required: false,
        default: "#26292F"
    },
    selectedColor: {
        type: String,
        required: false,
        default: "#6BA2FF"
    },
    backgroundColor: {
        type: String,
        required: false,
        default: "black"
    },
    borderRadius: {
        type: String,
        required: false,
        default: "10px"
    },
        borderColor: {
        type: String,
        required: false,
        default: "transparent"
    },
        border: {
        type: String,
        required: false,
        default: "1px"
    },
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
background-color:v-bind('props.selectedColor');
}



.add{
border-radius:v-bind ('props.borderRadius');
width:40px;
height:40px;
display:flex;
justify-content:center;
align-items:center;
background-color:v-bind('props.backgroundColor');
text-align:center;
border-color: v-bind('props.borderColor');
margin: auto;
}

.material-icons.mdc-fab__icon{
   color: v-bind('props.baseColor');
   border-color: v-bind('props.borderColor');

}

.mdc-fab__icon:hover{
    color:v-bind('props.backgroundColor');
    border-color: v-bind('props.borderColor');

}


</style>
