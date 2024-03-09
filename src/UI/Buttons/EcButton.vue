
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, defineProps, defineEmits, defineModel } from 'vue';

const props = defineProps<{
    large?:boolean|string
    loading?:boolean
    disable?:boolean
}>();

const visible = defineModel('visible')

onMounted(() => {

});



//todo debug click outside
</script>

<template>
    <button type="button" class="button primary shadow-button large"
    :class="large = props.large"
    >
      <slot name="default"></slot>

    </button>
</template>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: #fff;
    padding: 20px;


}
</style>
