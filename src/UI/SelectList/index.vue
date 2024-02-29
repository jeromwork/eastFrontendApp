<script setup lang="ts">
import {ref, defineProps, defineEmits, defineModel} from 'vue';



const props = defineProps({
    options: {type: Array<Object>, required:true },
    optionValue:{type:String, default:'id', required:true}
});
// const emits = defineEmits(['update:modelValue'])
const model = defineModel({ type: Array<Object> })

const findIn = (option:Object, options:Array<Object> ):number => {
    const idToFind = option?.[props.optionValue];
    if (!idToFind ) return -1;
    return  options.findIndex(obj => obj[props.optionValue] === idToFind);
}
const isSelected = (option:Object):boolean => {
    return (findIn(option, model.value as Array<Object>) > -1)
}


const toggleServiceChoose = (option:Object) => {
    //todo in model service with id service.id
    const indexExists = findIn(option, model.value as Array<Object>);
    if( indexExists > -1 && model.value ) {
        model.value.splice(indexExists, 1);
        return;
    }
    model.value?.push(option);
}

//todo remove services word from css etc its simply Select list with selected options, not service list

</script>


<template>
    <div class="scroll" >
        <div class="services-list">
            <div
                v-for="(option, i) in options"
                :key="i"
                @click.prevent="toggleServiceChoose(option)"
                class="services-list_row"

            >
                <slot v-bind="{...option, selected:isSelected(option)}"></slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
div.scroll {
    margin: 4px, 4px;
    padding: 4px;
    width: 650px;
    height: 600px;
    overflow-x: hidden;
    overflow-y: auto;
    text-align: justify;
}
</style>