<script setup>
import { ref, computed, watchEffect } from 'vue';
import aButtonMenuTask from './aButtonMenuTask.vue';

const props = defineProps({
    icon: {
        type: String,
        required: false,
        default: "add"
    }
    , iconHover: {
        type: String,
        required: false,
        default: "add"
    }
})

const isFinished = ref(true);

const emits = defineEmits([
    'cancelAddTask'
]);

function cancelAddTask() {
    emits('cancelAddTask', isFinished.value);
    console.log("ferme")
}

function validateAddTask(){
    console.log("Hiding add task");
        emits('cancelAddTask', isFinished.value);
        //envoyer le formulaire
}

const icon = ref(props.icon);
</script>

<template>
        <div class="header">
        <a-button-menu-task @click="cancelAddTask" icon="close"></a-button-menu-task>
            <p class="white middle">Nouvel événement</p>
        <a-button-menu-task @click="validateAddTask" icon="done"></a-button-menu-task>
        </div>
    <div class="mainContainer">

        <div class="body">
            <div class="ligne">
   <span class="white material-icons mdc-fab__icon">title</span>
            <p class="white input">what</p>
            </div>
                       <div class="ligne">
   <span class="white material-icons mdc-fab__icon">schedule</span>
            <p class="white input">what</p>
            </div>
                       <div class="ligne">
   <span class="white material-icons mdc-fab__icon noShow">close</span>
            <p class="white input">what</p>
            </div>
                        <div class="ligne">
   <span class="white material-icons mdc-fab__icon noShow">pin_drop</span>
            <p class="white input">what</p>
            </div>
                       <div class="ligne">
   <span class="white material-icons mdc-fab__icon">pin_drop</span>
            <p class="white input">what</p>
            </div>
                       <div class="ligne">
   <span class="white material-icons mdc-fab__icon">edit_note</span>
            <p class="white input">what</p>
            </div>

        </div>


    </div>

</template>



<style scoped>
.mainContainer{
    display:flex;
    flex-direction:column;
    justify-content:flex-end;
    flex-basis:auto;
    background-color:#262626;
    border-radius:10px;
    margin:15px;
}

.noShow{
    opacity:0;
}

.input{
flex-grow:3;
text-align:left;
}

span{
flex-grow:1;
}

div.ligne{
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
    flex-basis:auto;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding:3px;
    align-items: center;
        background-color:#262626;
}

p.middle{
margin:auto;

}

.body{
        display:flex;
    flex-direction:column;
    margin:10px;
}

.white {
    color: white;
}
</style>
