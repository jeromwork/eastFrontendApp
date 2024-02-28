<script setup lang="ts">
import {ref, defineProps, defineEmits, defineModel} from 'vue';
import ListWithSelect from "./ListWithSelect.vue";
import Modal from "../../UI/Modal.vue";

const props = defineProps({
    services:{type:[Object, Array], required:true },
    // visible:{type:Boolean, required:true }
})


const emits = defineEmits(['update:visible']);
const visible = defineModel('visible') as boolean

</script>

<template>

    <Modal v-model:visible="visible">
        <template #default>
<!--            <ListWithSelect :options="services"/>-->
        </template>
    </Modal>
  ----------------------------
  {{visible}}
</template>

<style scoped>

</style>