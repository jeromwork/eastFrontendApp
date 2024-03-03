<script setup lang="ts">
import {ref, defineProps, defineEmits, defineModel} from 'vue';
import SelectList from "../../UI/SelectList";
import Modal from "../../UI/Modal.vue";
import ServiceSelectOptionView from "../../UI/ServiceCard/SelectOptionView.vue";
import type ServiceData from "../../EastclinicVueApi/interfaces/ServiceData";

const props = defineProps({
    services:{type:Array, required:true },
})

const visible = defineModel('visible') as boolean
const servicesSelected =  defineModel('servicesSelected' )

</script>

<template>

    <Modal v-model:visible="visible">
        <template #default>
            <SelectList :options="services" v-model="servicesSelected" #default="service" optionValue="id" >
                <ServiceSelectOptionView v-bind="service as ServiceData" @click="emit('handleInputEvent', 12345)"></ServiceSelectOptionView>
            </SelectList>
        </template>
    </Modal>
</template>

<style scoped>

</style>