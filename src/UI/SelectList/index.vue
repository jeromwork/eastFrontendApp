<script setup lang="ts">
import {ref, defineProps, defineEmits, defineModel} from 'vue';



const props = defineProps({
    options:{type:[Array, Object], required:true }
});
// const emits = defineEmits(['update:modelValue'])
const model = defineModel()
const toggleServiceChoose = (service) => {
    //todo in model service with id service.id set selected = true
    console.log('toggleServiceChoose')
}

//todo remove services word from css etc its simply Select list with selected options, not service list

</script>


<template>
    <div class="scroll">
        <div class="services-list">
            <div
                    v-for="(option, i) in options"
                    :key="i"
                    @click.prevent="toggleServiceChoose(option)"
                    class="services-list_row">
                <slot v-bind="option"></slot>
            </div>
        </div>
    </div>
</template>

