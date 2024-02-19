<script setup lang="ts">
//в этом компоненте только прием пропсов, проверка, и их отображение
//в том числе во вложенных компонентах

import { defineProps, withDefaults, reactive, ref, toRef, defineEmits, computed, toRaw, defineOptions } from "vue";
import type { Ref } from 'vue'
interface ReviewCardViewProps {
    id?:Number,
    body: String,
    description: String,
}
defineOptions({
    inheritAttrs: false
})


const props = withDefaults(defineProps<ReviewCardViewProps>(), {
    // body: '',
});
</script>


<template>
    <h1>{{id}}</h1>
    <div v-if="body" class="single-doctor__add-info__item">
        <span>{{body}}</span>
        <span>{{description}}</span>
    </div>
</template>

<style scoped>

</style>