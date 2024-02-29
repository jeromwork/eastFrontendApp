<script setup lang="ts">
import {ref, defineProps, defineEmits, defineModel} from 'vue';
import SelectList from "../../UI/SelectList";
import Modal from "../../UI/Modal.vue";
import ServiceSelectOptionView from "../../UI/ServiceCard/SelectOptionView.vue";
import type ServiceData from "../../EastclinicVueApi/interfaces/ServiceData";

const props = defineProps({
    services:{type:[Object, Array], required:true },
})

const emits = defineEmits(['inputEvent']);
const visible = defineModel('visible') as boolean
const emitInputEvent = (event) => {
    // Emit an input event
    emits('inputEvent', event.target.value);
};

</script>

<template>
    <Modal v-model:visible="visible">
        <template #default>
            <SelectList :options="services" #default="service">
                <ServiceSelectOptionView :service="service as ServiceData"></ServiceSelectOptionView>
            </SelectList>
        </template>
    </Modal>
</template>

<style scoped>

</style>