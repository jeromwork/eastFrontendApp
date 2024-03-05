<script setup lang="ts">

import {ref, defineProps, defineModel, } from 'vue'
import type {Ref} from 'vue'
import type { ClinicInterface } from '../../EastclinicVueApi'

const props = defineProps({});
const clinicSelected = defineModel({
    type: ClinicInterface,
    default: null,
});


const workingDay:Ref<ClinicInterface> = defineModel({ type: ClinicInterface })
</script>

<template>

</template>

<style scoped>

</style>