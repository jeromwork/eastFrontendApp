
<script setup lang="ts">
import {    defineProps, reactive, ref, defineEmits, computed, onBeforeMount, onMounted, defineModel} from "vue";

import type {Ref} from 'vue'

const props = defineProps({
    isDownloaded : Boolean,
    slots : Array as () => number[] | Ref<number[]>|null,
    countShowSlots:{type: Number}
})


const currentSlotModel = defineModel('currentSlotModel',{ type: Number })
const emit = defineEmits(['slotSelected'])
const countShowSlots = ref(7);

onMounted(async ()=>{
});

const slotSelected = ( slot:number )=>{
    currentSlotModel.value = slot;
    emit('slotSelected', slot)
}
 const showRestSlots = () => {
     const slotsLength = props.slots.length;
     countShowSlots.value = (slotsLength === countShowSlots) ? 7 : slotsLength;
 }


</script>

<template>
    <div>
        <div v-if=" isDownloaded ">
            <div class="slots__timeslots-wrapper" v-if="slots">
                <template
                    v-for="(slot, j) in slots"
                >
                    <button class="slots_item button primary slot"
                            v-if="j < countShowSlots || countShowSlots+1 === slots.length"
                            @click.prevent="slotSelected"
                    >
                        {{slot}}
                    </button>
                    <button class="slots_item button primary slot"
                            v-else-if="j === countShowSlots && countShowSlots+1 !== slots.length"
                            @click.prevent="showRestSlots"
                    >
                        <span class="icons down-white"></span>
                    </button>
                </template>
            </div>
            <div v-else>
                <div class="slots__resting">
                    <span class="icons camp" style="width: 28px;height: 28px"></span>
                    <span >В этот день врач отдыхает, вы можете выбрать любой другой день</span>

                </div>
            </div>
        </div>
        <div v-else>
<!--                <skeleton-loader />-->
        </div>


    </div>
</template>



<style lang="scss">
.button.slot {
    width: auto;
    padding: 5px 16px;
    border-radius: 10px !important;
    font-size: 14px;
}
</style>
