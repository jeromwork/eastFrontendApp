
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, defineProps, defineEmits, defineModel } from 'vue';

const props = defineProps({visible:{type:Boolean}});
const emits = defineEmits(['update:visible']);
const visible = defineModel('visible')

const closeModal = () => {
    emits('update:visible', false);
};



onMounted(() => {

});
</script>

<template>
    <div v-if="visible" @mousedown.prevent="closeModal" class="modal">
        <div class="modal-content" @click.stop>
            <slot name="default"></slot>
            <slot name="close">
                <button @click="closeModal">Close</button>
            </slot>


        </div>
    </div>
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
