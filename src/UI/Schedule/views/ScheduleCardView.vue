
<script setup lang="ts">
import { defineProps, reactive, ref, toRef, defineEmits, computed, toRaw, onBeforeMount , onMounted, defineModel} from "vue";
import type {Ref} from 'vue'
import CalendarCarouselView from "../Calendar/CalendarCarouselView.vue";
import SlotsListView from "../Slots/SlotsListView.vue";

</script>

<template>

    <div class="slots mt-6">

        <div class="doctor-card-2__slots">

            <CalendarCarouselView />

            <SlotsListView />
        </div>
    </div>

</template>



<style scoped>

</style>