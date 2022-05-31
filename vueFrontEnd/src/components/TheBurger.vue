<script setup>
import { ref, computed, watchEffect } from 'vue';
const isMenuVisible = ref(false);

function toggleMenu(){
    isMenuVisible.value = !isMenuVisible.value;
    console.log("hello");
}

function fermeMenu(){
    isMenuVisible.value = false;
    console.log("hello");
}

</script>

<template>
    <nav class="navbar">
        <ul class="nav-menu" :class="isMenuVisible ? 'active' : ''">
<!--         //v-for des éléments reçu et créer un composant pour li et envoyer les détails -->
            <li class="nav-item">
                <a href="#" class="nav-link" @click="fermeMenu">Home</a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link" @click="fermeMenu">About</a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link" @click="fermeMenu">Contact</a>
            </li>
        </ul>
        <div class="hamburger" :class="isMenuVisible ? 'active' : ''" @click="toggleMenu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>

    </nav>
</template>



<style scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

header {
    background-color: black;
}

li {
    list-style: none;
}

a {
    color: white;
    text-decoration: none;
}

.navbar {
    min-height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 25px;
}

.nav-menu {
    display: flex;
    justify-content: space-between;
    gap: 10%;
}

.nav-link {
    transition: 0.7s ease;
}

.nav-link:hover {
    color: dodgerblue;
}

.hamburger {
    display: none;
    cursor: pointer;
}

.bar {
    display: block;
    width: 25px;
    height: 3px;
    margin: 5px auto;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    background-color: white;

}

@media(max-width:768px) {
    .hamburger {
        display: block;
    }

    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }

    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }

    .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        gap: 0;
        flex-direction: column;
        background-color: #262626;
        width: 100%;
        opacity:0.7;
        text-align: center;
        transition: 0.3s;
    }

    .nav-item {
        margin: 16px 0;
    }

    .nav-menu.active {
        left: 0;
    }

}
</style>
