<script setup lang="ts">
import {ref, defineProps, defineEmits, defineModel} from 'vue';
import SelectList from "../../SelectList/index.vue";
import Modal from "../../Modal.vue";
import ServicesSelectListView from "./ServicesSelectListView.vue";
import type { ServiceData } from "../../../EastclinicVueApi";

const props = defineProps({
    services:{type:Array, required:true },
})

const visible = defineModel('visible') as boolean

</script>

<template>
    <Modal v-model:visible="visible">
        <ServicesSelectListView :services="services"/>
    </Modal>
</template>

<style scoped>

</style>