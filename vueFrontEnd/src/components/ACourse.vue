<!-- recevoir avec defineProps -->
<script setup>
import { ref, computed, watchEffect } from 'vue';

const props = defineProps({

    classe: {
        type: String,
        required: true,
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
        type: Number,
        required: false,
        default: 9
    },
    dateFin: {
        type: Number,
        required: false,
        default: 10
    }/* ,
        id: {
        type: Number,
        required: false,
        default: 100
    } */
})

const options = {weekday: "short", year: "numeric", month: "long", day: "numeric",  hour: "numeric", minute: "numeric", second: "numeric"};
/* options.timeZone = 'UTC';
options.timeZoneName = 'short'; */

const debutCours = computed(() => {
if (!props.dateDebut) return '';
const maDate = new Date(props.dateDebut);
return new Intl.DateTimeFormat('fr-CH', options).format(maDate);
});

const finCours = computed(() => {
if (!props.dateDebut) return '';
const maDate = new Date(props.dateFin);
return new Intl.DateTimeFormat('fr-CH', options).format(maDate);
});

/*   prof encore */


</script>

<template>
    <div class="ligne">
        <td class="elHoraire"> {{ classe }}</td>
        <td class="elHoraire"> {{ cours }}</td>
        <td class="elHoraire"> {{ salle }}</td>
        <td class="elHoraire"> {{ debutCours }}</td>
        <td class="elHoraire"> {{ finCours }}</td>
    </div>
</template>

<style scoped>
.ligne {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
}

.elHoraire{
    text-align: left;
    color: grey;

    
}
</style>