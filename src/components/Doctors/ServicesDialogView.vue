<script setup lang="ts">
import {ref, defineProps, defineEmits, defineModel} from 'vue';
import SelectList from "../../UI/SelectList";
import Modal from "../../UI/Modal.vue";
import ServiceSelectOptionView from "../../UI/ServiceCard/SelectOptionView.vue";
import type { ServiceData } from "../../EastclinicVueApi";

const props = defineProps({
    services:{type:Array, required:true },
})

const visible = defineModel('visible') as boolean
const servicesSelected =  defineModel('servicesSelected' )

</script>

<template>

    <Modal v-model:visible="visible">
        <template #default>
            <SelectList :options="services" v-model="servicesSelected" #default="{option, selected } " optionValue="id" >
                <ServiceSelectOptionView v-bind="{service:option as ServiceData, selected}" ></ServiceSelectOptionView>
            </SelectList>
        </template>
    </Modal>
</template>

<style scoped>

</style>