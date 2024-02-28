<template>
    <div ref="flickityRef" class="flickity">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineProps, defineEmits } from 'vue';
import Flickity from 'flickity';


const props = defineProps({options:Object});
const emits = defineEmits(['init']);

const flickityInstance = ref<Flickity | null>(null);
const flickityRef = ref(null);

const init = () => {
    flickityInstance.value = new Flickity(flickityRef.value, props.options);
    emits('init', flickityInstance.value);
};

const flickity = () => flickityInstance.value;

const destroy = () => {
    flickityInstance.value?.destroy();
};

onMounted(() => {
    init();
});

onBeforeUnmount(() => {
    destroy();
});
const select = (index: number, isWrapped: boolean, isInstant: boolean) => {
    flickityInstance.value?.select(index, isWrapped, isInstant);
};

const next = (isWrapped: boolean, isInstant: boolean) => {
    flickityInstance.value?.next(isWrapped, isInstant);
};

const previous = (isWrapped: boolean, isInstant: boolean) => {
    flickityInstance.value?.previous(isWrapped, isInstant);
};

const selectCell = (value: number, isWrapped: boolean, isInstant: boolean) => {
    flickityInstance.value?.selectCell(value, isWrapped, isInstant);
};


const resize = () => {
    flickityInstance.value?.resize();
};

const reposition = () => {
    flickityInstance.value?.reposition();
};

const prepend = (elements: HTMLElement[] | HTMLElement | NodeList) => {
    flickityInstance.value?.prepend(elements);
};

const append = (elements: HTMLElement[] | HTMLElement | NodeList) => {
    flickityInstance.value?.append(elements);
};

const insert = (elements: HTMLElement[] | HTMLElement | NodeList, index: number) => {
    flickityInstance.value?.insert(elements, index);
};

const remove = (elements: HTMLElement[] | HTMLElement | NodeList) => {
    flickityInstance.value?.remove(elements);
};

const playPlayer = () => {
    flickityInstance.value?.playPlayer();
};

const stopPlayer = () => {
    flickityInstance.value?.stopPlayer();
};

const pausePlayer = () => {
    flickityInstance.value?.pausePlayer();
};

const unpausePlayer = () => {
    flickityInstance.value?.unpausePlayer();
};

const rerender = () => {
    destroy();
    init();
};

const destroyFlickity = () => {
    flickityInstance.value?.destroy();
};

const reloadCells = () => {
    flickityInstance.value?.reloadCells();
};

const getCellElements = () => {
    return flickityInstance.value?.getCellElements() || [];
};

const getData = () => {
    const Flickity = require('flickity');
    return Flickity.data(flickityInstance.value?.$el);
};

const on = (eventName: string, listener: Function) => {
    flickityInstance.value?.on(eventName, listener);
};

const off = (eventName: string, listener: Function) => {
    flickityInstance.value?.off(eventName, listener);
};

const once = (eventName: string, listener: Function) => {
    flickityInstance.value?.once(eventName, listener);
};

const selectedElement = () => {
    return flickityInstance.value?.selectedElement;
};

const selectedElements = () => {
    return flickityInstance.value?.selectedElements || [];
};

const selectedIndex = () => {
    return flickityInstance.value?.selectedIndex || -1;
};

const cells = () => {
    return flickityInstance.value?.cells || [];
};

const slides = () => {
    return flickityInstance.value?.slides || [];
};

const disableDrag = () => {
    if (flickityInstance.value) {
        flickityInstance.value.options.draggable = false;
        flickityInstance.value.updateDraggable();
    }
};

const enableDrag = () => {
    if (flickityInstance.value) {
        flickityInstance.value.options.draggable = true;
        flickityInstance.value.updateDraggable();
    }
};




</script>



<style scoped>
@import 'flickity/dist/flickity.css';

</style>