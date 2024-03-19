
<script setup lang="ts">
import {    defineProps, reactive, ref, defineEmits, computed, onBeforeMount, onMounted, defineModel, inject} from "vue";
import type ISlotsState from '../../../interfaces/ISlotsState'


import type {Ref} from 'vue'
import {slotsStateSymbol} from "../../../composables/useSymbols";
import {useDateFormat} from "@vueuse/core";


const props = defineProps<{
    isDownloaded?: Boolean;
    countShowSlots?: number; // Update the type to number[]
}>();


const state = inject( slotsStateSymbol ) as ISlotsState
if(!slotsStateSymbol) throw new Error('not have doctorCardState by doctorCardState');

const countShowSlots = ref((props.countShowSlots) ?? 5 )

 const showRestSlots = () => {
     const slotsLength = (state.slots?.length) ? state.slots?.length : 0;
     countShowSlots.value = (slotsLength === countShowSlots) ? 7 : slotsLength;
 }
</script>

<template>
    <div>

        <div v-if="  true ">
            <div class="slots__timeslots-wrapper" v-if="state.slots">
                <template
                    v-for="(slot, j) in state.slots"
                >

                    <button class="slots_item button primary slot"
                            v-if="j < countShowSlots || countShowSlots+1 === state.slots.length"
                            @click.prevent="state.setSelectedSlot(slot)"
                    >
                        {{useDateFormat(slot * 1000, 'HH:mm').value}}
                    </button>
                    <button class="slots_item button primary slot"
                            v-else-if="j === countShowSlots && countShowSlots+1 !== state.slots?.length"
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
