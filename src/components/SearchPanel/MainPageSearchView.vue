<script setup lang="ts">
import MainSearchView from './views/MainSearchView.vue';


</script>

<template>
    <div class="main-container">
        <div class="main_page__search-container">
<!--            <div class="main_page__search-container_shape">  this is deactiv click-->
            <div class="">
<!--                <svg class="main_page__search-container_shape__shape-svg" xmlns="http://www.w3.org/2000/svg" width="1241" height="1065" viewBox="0 0 1241 1065" fill="none">-->
<!--                    <path d="M397.128 528.541C-15.4515 520.5 121.478 277.575 218.68 153.669C226.087 144.228 215.716 132.969 206.801 141.001C91.7107 244.692 -100.395 478.808 65.2851 784.243C261.582 1146.12 648.704 1064.77 748.412 1036.66C757.127 1034.2 757.955 1021.84 750.434 1016.8C695.151 979.738 575.602 857.645 893.26 618.366C1212.11 378.193 1240.95 102.365 1240.86 9.70902C1240.85 -0.128941 1228.68 -3.02998 1223.68 5.4436C1156.79 118.841 876.826 537.89 397.128 528.541Z" fill="#4790EC" fill-opacity="0.4"/>-->
<!--                </svg>-->
            </div>
            <div class="main_page__header">
                <h1 class="main_page__header-text">Точный диагноз <br>и бережное лечение</h1>
                <div class="main_page__header-desc">Найдите своего врача здесь </div>
            </div>
            <MainSearchView/>
        </div>

    </div>
</template>



<style scoped>

</style>