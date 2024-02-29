<script setup lang="ts">
// import { VWindow, VWindowItem } from '../../UI/Carousel'
import Gallery from '../../UI/Carousel'

import { ref } from 'vue'
// const vuetify = createVuetify({

// })
const list = ref([
    'https://tinyurl.com/2p8dav94',
    'https://tinyurl.com/2p9yrrhs',
    'https://tinyurl.com/ycxurpah',
])
onMounted(()=>{

})
const flickityOptions = ref({
    pageDots: true,
    wrapAround: true,
});
const window = ref(0)

</script>

<template>
    <div class="glry">
        <Gallery :options="flickityOptions">
            <div class="carousel-cell"></div>
            <div class="carousel-cell"></div>
            <div class="carousel-cell"></div>
        </Gallery>
    </div>



</template>


<style scoped>
.carousel {
    background: #FAFAFA;
}

.carousel-cell {
    display: block;
    width: 66%;
    height: 200px;
    margin-right: 10px;
    background: #8C8;
    border-radius: 5px;
    counter-increment: carousel-cell;
}

/* cell number */
.carousel-cell:before {
    display: block;
    text-align: center;
    content: counter(carousel-cell);
    line-height: 200px;
    font-size: 80px;
    color: white;
}
</style>