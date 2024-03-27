
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, defineProps, defineEmits, defineModel } from 'vue';

const props = defineProps();

const visible = defineModel('visible')

onMounted(() => {

});

import {onClickOutside} from "@vueuse/core";

const refBookingDialog = ref(null)
onClickOutside(refBookingDialog, event => {
    visible.value=false
})

//todo debug click outside
</script>

<template>
    <teleport  to="body">
        <div v-if="visible" class="modal">
            <div class="modal-content" ref="refBookingDialog">
                <slot name="default"></slot>
                <slot name="close">
                    {{visible}}
    <!--                <button @click="visible=false">Close</button>-->
                </slot>


            </div>
        </div>

    </teleport>
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
