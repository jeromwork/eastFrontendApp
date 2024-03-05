<script setup lang="ts">

import { defineProps, defineModel, ref } from 'vue'
import ClinicCardSelectedView from './ClinicCardSelectedView.vue'
import type { ClinicInterface } from '../../../EastclinicVueApi'
import type {Ref} from "/vue";
import { useEventBus } from '@vueuse/core'
import { EventClinicMapOpen, EventSetCurrentClinic, } from '../../../composables/useEvents'
import SelectList from '../../SelectList'
import ClinicCardInSelectListView from './ClinicCardInSelectListView'
import Modal from "../../../UI/Modal.vue";

// import ServiceData from "#build/src/EastclinicVueApi/interfaces/ServiceData";





const props = defineProps<{
    clinics : ClinicInterface[] | null,
    currentClinic : ClinicInterface | null,
}>();

const visibleClinicsList = ref(false)

// const clinics = inject('clinics') as ClinicInterface[];
// const currentClinic = inject('clinicWorkingSelected') as ClinicInterface;


const countClinics = computed(() => props.clinics?.length);
// const currentClinicPrepared = computed(() => {
//     if(!props.currentClinic) return null;
//     return (isRef(props.currentClinic)) ?props.currentClinic.value : props.currentClinic
// })


const currentClinic = computed(() =>  props.currentClinic )
const selectedClinic = (clinic:ClinicInterface) => {
    visibleClinicsList.value = false;
    if(clinic.id === currentClinic?.value?.id) return;
    useEventBus(EventSetCurrentClinic).emit(clinic)

}

</script>

<template>
    <div>
        <div class="slots__clinic-changer " @click="visibleClinicsList = !visibleClinicsList">
            <div  v-if="countClinics > 0 && currentClinic">
                <div class="slots__clinic-changer_dropdown-input dropdown-wrapper">
                    <div class="slots__clinic-changer_metro font-14">
                        <ClinicCardSelectedView :clinic="currentClinic as ClinicInterface"/>
                    </div>
                    <span class="icons down justify-self-end"></span>
                </div>
            </div>
            <div v-else-if="countClinics === 0 && currentClinic">
                <div class="slots__clinic-changer_metro-noclick">
                    <ClinicCardSelectedView :clinic="currentClinic as ClinicInterface"/>
                </div>

            </div>
        </div>




        <div v-if="currentClinic"
                @click="useEventBus(EventClinicMapOpen).emit(currentClinic)"
                class="slots__address">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 1.6665C6.3181 1.6665 3.33333 5.00199 3.33333 8.74984C3.33333 12.4683 5.4611 16.5102 8.78089 18.0619C9.55478 18.4236 10.4452 18.4236 11.2191 18.0619C14.5389 16.5102 16.6667 12.4683 16.6667 8.74984C16.6667 5.00199 13.6819 1.6665 10 1.6665Z" fill="#1C274C"/>
                <path d="M10 1.6665C6.3181 1.6665 3.33333 5.00199 3.33333 8.74984C3.33333 12.4683 5.4611 16.5102 8.78089 18.0619C9.55478 18.4236 10.4452 18.4236 11.2191 18.0619C14.5389 16.5102 16.6667 12.4683 16.6667 8.74984C16.6667 5.00199 13.6819 1.6665 10 1.6665Z" fill="url(#paint0_linear_15683_83262)"/>
                <path d="M10 1.6665C6.3181 1.6665 3.33333 5.00199 3.33333 8.74984C3.33333 12.4683 5.4611 16.5102 8.78089 18.0619C9.55478 18.4236 10.4452 18.4236 11.2191 18.0619C14.5389 16.5102 16.6667 12.4683 16.6667 8.74984C16.6667 5.00199 13.6819 1.6665 10 1.6665Z" fill="url(#paint1_linear_15683_83262)"/>
                <path d="M10 10.4167C11.1506 10.4167 12.0833 9.48393 12.0833 8.33333C12.0833 7.18274 11.1506 6.25 10 6.25C8.84941 6.25 7.91667 7.18274 7.91667 8.33333C7.91667 9.48393 8.84941 10.4167 10 10.4167Z" fill="white"/>
                <defs>
                    <linearGradient id="paint0_linear_15683_83262" x1="7.1495" y1="1.85609" x2="17.5893" y2="17.872" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#A3C2FF"/>
                        <stop offset="1" stop-color="#DEEDFF"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_15683_83262" x1="6.5" y1="2.49951" x2="13.5" y2="17.4995" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#2D7FF9"/>
                        <stop offset="1" stop-color="#83B5FF"/>
                    </linearGradient>
                </defs>
            </svg>
            <span>{{currentClinic.node_address}}</span>
        </div>


        <Modal v-model:visible="visibleClinicsList">
            <template #default>
        <SelectList :options="clinics as any[]" #default="{option, selected}" optionValue="id" v-model="currentClinic" >
            <ClinicCardInSelectListView v-bind="{clinic:option, selected}" @click="selectedClinic(option)"></ClinicCardInSelectListView>
        </SelectList>
            </template>
        </Modal>

    </div>

</template>

<style scoped lang="scss">
.slots__clinic-changer_dropdown-input {
    padding: 8px 12px 8px;
}
.slots__clinic-changer_metro {
    display: flex;
    align-items: center;
}
.slots__clinic-changer {
    margin-top: 4px;
}
.slots__address {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #4372EA;
    margin-top: 10px;
    cursor: pointer;
    & svg {
        margin-right: 4px;
    }
}
.slots__clinic-changer_metro-noclick {
    padding: 8px 12px 8px;
}
.slots-clinic-changer .dropdown-panel__items-list__item {
    font-size: 14px;
}
</style>
