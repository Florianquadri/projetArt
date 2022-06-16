<!-- recevoir avec defineProps -->
<script setup>
import { ref, computed, watchEffect } from 'vue';
import { user } from "../state.js";
/* const couleurFond = ref("#84F4BF"); */
//computed déterminant la couleur du cours suivant le nom du cours

const props = defineProps({

    classe: {
        type: String,
        required: false,
        default: "M78"
    },
    cours: {
        type: String,
        required: true,
        default: "CoursTest"
    },
    salle: {
        type: String,
        required: true,
        default: "ClasseTest"
    },
    dateDebut: {
        type: String,
        required: false,
        default: ""
    },
    dateFin: {
        type: String,
        required: false,
        default: ""
    },
    typeEvent: {
        type: String,
        required: false,
        default: "course"
    },
    firstCours: {
        type: Boolean,
        required: false,
        default: false
    },
    sizeFont: {
        type: Number,
        required: false,
        default: 1
    },
    backgroundColor: {
        type: String,
        required: false,
        default: "#262626"
    }
})



const whatTypeEvent = computed(() => {
    if (props.typeEvent == "test") return "#F94040";
    if (props.typeEvent == "private") return "#FF8127";
    if (props.typeEvent == "course") return "#84F4BF";
    if (props.typeEvent == "firstCourse") return "#262626";
    return "#84F4BF";
})

const whichColorFont = computed(() => {
    if (props.typeEvent == "test") return "white";
    if (props.typeEvent == "private") return "white";
    if (props.typeEvent == "course") return "#262626";
    if (props.typeEvent == "firstCourse") return "white";
    return "#84F4BF";
})

const optionsAll = { weekday: "short", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" };
const options1 = { hour: "numeric", minute: "numeric" };
const options2 = { day: "numeric" };
const options3 = { month: "short" };
const options4 = { month: "long" };


var today = new Date();
/* var day = today.getDate(); */ 
var day = "17";
var month = today.getMonth()+1;


const monMois = new Intl.DateTimeFormat('fr-CH', options4).format(today);
    

const moisCours = computed(() => {
    const maDate = new Date(props.dateDebut);
    return new Intl.DateTimeFormat('fr-CH', options4).format(maDate);
    
});

const dateCours = computed(() => {
    if (!props.dateDebut) return '';
    const maDate = new Date(props.dateDebut);
    return new Intl.DateTimeFormat('fr-CH', options2).format(maDate);
});

console.log(moisCours);

/* const whichColorBackground = day == dateCours.value ? "#FFFFFF" : props.backgroundColor; */

const whichColorBackground = computed(() => day == dateCours.value && moisCours.value == monMois ? "#6BA2FF" : props.backgroundColor)

const salle = computed(() => {
    if (props.salle == "") return "Salle non indiquée";
    return props.salle;
})



/* if (dateCours==today.getDate()&& dateCoursMois==) {
    
} */



/* options.timeZone = 'UTC';
options.timeZoneName = 'short'; */




const debutCours = computed(() => {
    if (!props.dateDebut) return '';
    const maDate = new Date(props.dateDebut);
    return new Intl.DateTimeFormat('fr-CH', options1).format(maDate);
    
});

const dateCoursMois = computed(() => {
    if (!props.dateDebut) return '';
    const maDate = new Date(props.dateDebut);
    return new Intl.DateTimeFormat('fr-CH', options3).format(maDate);
});
const finCours = computed(() => {
    if (!props.dateDebut) return '';
    const maDate = new Date(props.dateFin);
    return new Intl.DateTimeFormat('fr-CH', options1).format(maDate);
});

/*   prof encore */


</script>
<template>
    <div class="period">
        <div v-if="!firstCours" class="jour" :style="{'background-color': whichColorBackground}">
            <span class="bulle">{{ dateCours }}</span>
            <span class="bulle">{{ dateCoursMois }}</span>
        </div>
        <div class="infosJour">
            <div class="infosJourLigne">
                <span class="strong textCours" :style="{ fontSize: props.sizeFont + 'rem' }">{{ props.cours }}</span>
                <span class="salle textCours" :style="{ fontSize: props.sizeFont + 'rem' }">{{ salle }}</span>
            </div>
            <div class="infosJourLigne">
                <span v-if="user=='teacher'" class="textCours strong classe" :style="{ fontSize: props.sizeFont + 'rem' }">{{ props.classe }}</span>
                <span class="textCours" :style="{ fontSize: props.sizeFont + 'rem' }">{{ debutCours }}</span>
                <span class="textCours" :style="{ fontSize: props.sizeFont + 'rem' }">-{{ finCours }}</span>
            </div>
        </div>
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
    margin-right: 10px;
}

.bulle {
    color: white;
}

.infosJour {
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 15px;
    flex-grow: 3;
    padding: 5px;
    justify-content: center;
    background-color: v-bind('whatTypeEvent');
}

.infosJourLigne {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding-left: 10px;
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

    .classe{
        margin-right:10px;
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