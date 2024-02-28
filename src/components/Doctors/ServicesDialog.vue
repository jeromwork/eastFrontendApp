<script setup lang="ts">
import {ref, defineProps, defineEmits, defineModel} from 'vue';
import SelectList from "../../UI/SelectList";
import Modal from "../../UI/Modal.vue";
import SelectOptionView from "../../UI/ServiceCard/SelectOptionView.vue";
import type ServiceData from "../../EastclinicVueApi/interfaces/ServiceData";

const props = defineProps({
    services:{type:[Object, Array], required:true },
})
const visible = defineModel('visible') as boolean

</script>

<template>

    <Modal v-model:visible="visible">
        <template #default>
            <SelectList :options="services" #default="service">
                <SelectOptionView :service="service as ServiceData"></SelectOptionView>
            </SelectList>
        </template>
    </Modal>
</template>

<style scoped>

</style>