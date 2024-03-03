<script setup lang="ts">
import { defineProps } from 'vue'
import type { ClinicInterface } from '../../../EastclinicVueApi'
import type {Ref} from "/vue";

const props = defineProps<{
    clinic: ClinicInterface | Ref<ClinicInterface>|undefined|null,
}>();


</script>

<template>
  <div class="dfs" @click="">
      text
  </div>

</template>

<style scoped>


</style>