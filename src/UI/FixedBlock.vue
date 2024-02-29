<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import type { Ref } from 'vue';

const fixed = ref(false);
const elemOffset = ref(0);
const observer = ref({});
const elem = ref({});
const fixedBlock: Ref<HTMLElement | null> = ref(null);
// Create a ref to hold the reference to the element
const fixedToggle = () => {
    if(fixedBlock.value){
        let elemPos = fixedBlock.value?.getBoundingClientRect();
        let parentPos = fixedBlock.value?.parentElement?.getBoundingClientRect();
        let elemOffset = elemPos.height + elemPos.top;
        if (!elemOffset && elemOffset !== elemOffset) {
            elemOffset = elemOffset + 20; // +20 for paddings (parentPos.height / 100 * 10)
        }
        if (elemOffset + Math.abs(parentPos.top) < parentPos.height) {
            fixed.value = false;
        } else {
            fixed.value = true;
        }
    }

};

const fixedOff = () => {
    // Implementation for fixedOff
};

onMounted(() => {
    window.addEventListener('scroll', fixedToggle);
    fixedToggle();
    observer.value = new ResizeObserver((entries) => {
        fixed.value = false;
    });
    observer.value.observe(fixedBlock.value?.parentElement);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', fixedToggle);
    // this.observer.unobserve(this.$refs["fixed-block"].parentElement);
});
</script>

<template>
    <div ref="fixedBlock" :class="{'fixed-to-bottom': fixed}" class="fixed-block">
        <slot></slot>
    </div>
</template>

<style lang="scss">
.fixed-block {
  position: fixed;
  &.fixed-to-bottom {
    position: absolute;
    bottom: 0;
  }
}
</style>
