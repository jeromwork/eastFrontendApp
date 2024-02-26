<script setup lang="ts">
import { Carousel, Slide, Pagination, Navigation } from '../../UI/Carousel'
import {ref} from 'vue'
const slideTo = (val) => {
    currentSlide.value = val
};
const currentSlide = ref(0)

</script>

<template>
    <Carousel id="gallery" :items-to-show="1.2" :wrap-around="false" v-model="currentSlide">
        <Slide v-for="slide in 10" :key="slide">
            <div class="carousel__item">{{ slide }}</div>
        </Slide>
    </Carousel>

    <Carousel
            id="thumbnails"
            :items-to-show="4"
            :wrap-around="true"
            v-model="currentSlide"
            ref="carousel"
    >
        <Slide v-for="slide in 10" :key="slide">
            <div class="carousel__item" @click="slideTo(slide - 1)">{{ slide }}</div>
        </Slide>
    </Carousel>
</template>


<style scoped>
/*@import '../../UI/Carousel/styles';*/
.carousel__item {
    min-height: 200px;
    width: 100%;
    background-color: var(--vc-clr-primary);
    color: var(--vc-clr-white);
    font-size: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.carousel__slide {
    padding: 10px;
}

.carousel__prev,
.carousel__next {
    box-sizing: content-box;
    border: 5px solid white;
}
</style>