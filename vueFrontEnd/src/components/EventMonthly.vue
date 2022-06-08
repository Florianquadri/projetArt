<!-- recevoir avec defineProps -->
<script setup>
import { ref, computed, watchEffect } from 'vue';
import { user } from "../state.js";
/* const couleurFond = ref("#84F4BF"); */
//computed déterminant la couleur du cours suivant le nom du cours

const props = defineProps({
    title: {
        type: String,
        required: true,
        default: "EventTest"
    },
    startDate: {
        type: String,
        required: false,
        default: "9h"
    },
    endDate: {
        type: String,
        required: false,
        default: "12h"
    },
    typeEvent: {
        type: String,
        required: false,
        default: "course"
    },
    room: {
        type: String,
        required: false,
        default: "MX"
    }

})

const options1 = { hour: "numeric", minute: "numeric" };

const debutCours = computed(() => {
    if (!props.startDate) return '';
    const maDate = new Date(props.startDate);
    return new Intl.DateTimeFormat('fr-CH', options1).format(maDate);
});

const finCours = computed(() => {
    if (!props.endDate) return '';
    const maDate2 = new Date(props.endDate);
    return new Intl.DateTimeFormat('fr-CH', options1).format(maDate2);
});

const whatTypeEvent = computed(() => {
    if (props.typeEvent == "test") return "#F94040";
    if (props.typeEvent == "private") return "#FF8127";
    if (props.typeEvent == "course") return "#84F4BF";
    if (props.typeEvent == "firstCourse") return "#262626";
    return "#84F4BF";
})

/* const whichColorFont = computed(() => {
    if (props.typeEvent == "test") return "white";
    if (props.typeEvent == "private") return "white";
    if (props.typeEvent == "course") return "#262626";
    if (props.typeEvent == "firstCourse") return "white";
    return "#84F4BF";
}) */

/* const salle = computed(() => {
    if (props.salle == "") return "Salle non indiquée";
    return props.salle;
})
 */

/*   prof encore */


</script>
<template>
    <div class="infosJour">
        <div class="infosJourColumn">
            <!--   <span v-if="user=='teacher'" class="textCours strong classe" :style="{ fontSize: props.sizeFont + 'rem' }">{{ props.classe }}</span> -->
            <span class="textCours">{{ debutCours }}</span>
            <span class="textCours">{{ finCours }}</span>
        </div>
        <span class="bar"></span>
        <div class="infosJourLigne">
            <span class=" textCours distant">{{ props.title }}</span>
            <!--                <span class="salle textCours" :style="{ fontSize: props.sizeFont + 'rem' }">{{ salle }}</span> -->
        </div>
        <span>{{ props.room }}</span>
    </div>

</template>

<style scoped>
.ligne {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
}

.elHoraire {
    text-align: left;
    color: grey;
}

.period {
    display: flex;
    flex-direction: row;
    width: 100%;
    flex-basis: auto;
    justify-content: space-between;
    margin: 10px 0px;
}

.jour {
    width: 60px;
    height: 60px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #6BA2FF;
    margin-right: 10px;
}

.bulle {
    color: white;
}

.distant{
    margin:0px 15px;
}

.infosJourLigne {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.infosJour {
    display: flex;
    flex-direction: row;
    background-color: white;
    border-radius: 15px;
    padding: 5px;
    justify-content: flex-start;
    align-items: center;
    padding: 1px 10px;
    background-color: v-bind('whatTypeEvent');
}

.infosJourColumn {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    align-items: center;
}

span.strong {
    font-weight: bold;
}

span.salle {
    margin-left: 5px;
}

.textCours {
    color: v-bind('whichColorFont');
    /*     font-size:v-bind('props.sizeFont') px; */

}

.classe {
    margin-right: 10px;
}

.bar {
    width: 5px;
    height: 30px;
    margin: 0px 15px;
    background-color: #606060;
    border-radius: 5px;

}

/* .test {
    background-color: red;
}

.private {
    background-color: orange;
}

.course {
    background-color: green;
} */
</style>