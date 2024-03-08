<script setup lang="ts">
import {ref, defineProps, defineEmits, defineModel} from 'vue';



const props = defineProps({
    options: {type: Array<Object>, required:true },
    optionValue:{type:String, default:'id', required:true},
    /* is fullScreen view*/
    fullScreen:{type:Boolean, default:false, required:false},
    selected:{ type: [Array<Object>, Object], default:null, required:false },

});

const emit = defineEmits(['updated:selected'])
// let model = defineModel({ type: [Array<Object>, Object] })
// console.log({...model.value})
const model = ref([...props.selected])
const findIn = (option:Object, options:Array<Object> ):number => {
    const idToFind = option?.[props.optionValue];
    if (!idToFind ) return -1;
    return  options.findIndex(obj => obj[props.optionValue] === idToFind);
}
const isSelected = (option: Object): boolean => {
    const modelValue = model.value;
    if (Array.isArray(modelValue)) {
        return findIn(option, modelValue) > -1;
    } else {
        return (modelValue && option[props.optionValue] === modelValue[props.optionValue]) as boolean;
    }
};


const toggleServiceChoose = (option: Object) => {
    const modelValue = model.value;

    if (Array.isArray(model.value)) {
        const indexExists = findIn(option, modelValue);

        if (indexExists > -1) {
            modelValue.splice(indexExists, 1);
        } else {
            modelValue.push(option);
        }
    } else {
        model.value = modelValue && option[props.optionValue] === modelValue[props.optionValue] ? null : option;
    }
    model.value = modelValue
    emit('updated:selected', option);

};

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
                <slot v-bind="{option, selected:isSelected(option)}"></slot>
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