<script setup>
import { ref, computed, watchEffect } from 'vue';

const firstLetterName = ref('F');
</script>

<template>
    <div class="profil">
        <div class="insideProfil">
            <span class="nom">{{firstLetterName}}</span>

        </div>
    </div>
</template>



<style scoped>
.profil {
    display: flex;
    align-items: center;
    padding:10px 25px;

}

.insideProfil {
    width: 40px;
    height: 40px;
    border: 1px solid #E7F0FF;
    border-radius: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.nom {
    color: #E7F0FF;
}
</style>
