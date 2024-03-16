<script setup lang="ts">
import SearchState from '../../state/SearchState'

const state = new SearchState();

</script>


<template>
    <slot v-bind="{state}"></slot>
</template>

<style scoped>

</style>