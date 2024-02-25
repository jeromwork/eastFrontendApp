<script setup lang="ts">
import {onMounted, onBeforeUnmount, ref} from "vue";
import type {Ref} from 'vue'

const props =  defineProps({
    hideDefault:{
        type:Boolean,
        default:false
    }
})


const scroll = ref(0);
const sticky = ref(false);
const offsetTop = ref(0);
const height = ref(0);
const stickyBlock: Ref<HTMLElement | null> = ref(null);
const stickyToggle = () => {
    scroll.value = window.top.scrollY
    sticky.value = scroll.value >= offsetTop.value;
}

onMounted(()=>{
    if(process.client){
        window.addEventListener('scroll', stickyToggle);
        if(stickyBlock.value){
            let wrapEl = stickyBlock.value,
                elemRect = wrapEl?.getBoundingClientRect();
            offsetTop.value = elemRect.top;
            height.value = (!props.hideDefault) ? elemRect.height : 0;
        }

    }
});

onBeforeUnmount(() => {
    if(process.client){
        window.removeEventListener('scroll', stickyToggle)
    }
});


</script>


<template>
    <div :class="{'stick': sticky, hide: 'hide'}" :style="'height:' + height + 'px'" class="sticky-wrapper">
        <div ref="sticky-block"
             :class="{'stick': sticky}"
             class="sticky-block">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss">
.sticky-wrapper {
    &.hide {
        opacity: 0;
    }
    &.stick {
        &.hide {
            opacity: 1;
            transition: 0.3s;
        }
    }
}
.sticky-block {
    width: 100%;
    position: relative;
    background-color: #fff;
    z-index: 99;

    &.stick {
        position: fixed;

        left: 0;
        top: 0;

        .container-972 {
            width: 90%;
            @media (max-width:768px) {
                width: 95%;
            }
            @media (max-width:377px) {
                width: 100%;
            }
        }
    }
}
</style>
