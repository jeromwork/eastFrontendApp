<script setup lang="ts">
import { defineProps } from 'vue'
import type { ClinicInterface } from '../../../EastclinicVueApi'

const props = defineProps<{
    clinic: ClinicInterface,
}>();


</script>

<template>
  <span>
    <span class="flex-inline-container align-center">
      <span v-if="clinic.node_color !== '0'" style="margin-right: 5px" :class="'metro-label m'+ clinic.node_color"></span>
      <span>{{clinic.node_address}}</span>
    </span>
    <span
            v-if="clinic.way"
            class="text-secondary text-medium">
      <span class="icons guy" style="height: 15px;top: 2px;margin: 0 0 0 3px;"></span> {{clinic.way}} м
    </span>
    <span
            v-else
            class="text-secondary text-medium text-no-wrap"
    >
      <span v-if="clinic.way_time" style="height: 15px;top: 1px;margin: 0 0 0 8px;" class="icons guy"></span> {{clinic.way_time}}
      </span>
    </span>

</template>

<style scoped>


</style>