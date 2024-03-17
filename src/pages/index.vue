

<script setup>
import Gallery from '~/UI/Carousel'
import MainPageSearch from "../components/SearchPanel/MainPageSearch.vue";

const name = "index.vue";
</script>
<template>
    <NuxtLayout name="default">
    <div class="white" style="height: 100%;">

        <MainPageSearch/>
<!--        <MainPageSearch />-->

        <Gallery/>

        <div class="main_page main-container mt-10">
            <div class="scroll-container main_page__awards-container">
                <div class="awards scrolling-block">
                    <div class="awards__item">
                        <img src="https://eastclinic.ru/assets/images/awards/award-sberzdorovie.png" alt="Награда Ист Клиник в СберЗдоровье 2021 | 2020 | 2019">
                    </div>
                    <div class="awards__item">
                        <img src="https://eastclinic.ru/assets/images/awards/award-prodoctorov.png" alt="Награда Ист Клиник в ПроДокторов 2022 | 2021">
                    </div>
                    <div class="awards__item">
                        <img src="https://eastclinic.ru/assets/images/awards/award-napopravku.png" alt="Награда Ист Клиник НаПоправку 2022 | 2021 | 2020 | 2019">
                    </div>
                    <div class="awards__item">
                        <img src="https://eastclinic.ru/assets/images/awards/award-yandex.png" alt="Награда Ист Клиник в Яндекс 2022 | 2020 | 2019">
                    </div>
                </div>
            </div>
        </div>
    </div>
    </NuxtLayout >
</template>


<style scoped>

</style>