<script setup lang="ts">
//в этом компоненте только прием пропсов, проверка, и их отображение
//в том числе во вложенных компонентах

import { defineProps, withDefaults, reactive, ref, toRef, defineEmits, computed, toRaw, defineOptions } from "vue";
import type { Ref } from 'vue'
import Reviews from '../../../Reviews/Controller.vue'
import ReviewCardController from '../../../Reviews/ReviewCard/Controller.vue'
import ReviewCardXL from '../../../Reviews/ReviewCard/views/XL.vue'
defineOptions({
    inheritAttrs: false
})
interface DoctorCardViewProps {
    isOnline?: boolean | Ref<boolean>
    fullname: string | Ref<string>;
    id?: number;
}


const props = withDefaults(defineProps<DoctorCardViewProps>(), {
    isOnline: false,
    fullname: ref('Просто доктор'),
    id: undefined,

});

// interface ReviewCardViewProps {
//     id:Number,
//     fullname: string | Ref<string>
// }
//
//
//
// const props = withDefaults(defineProps<ReviewCardViewProps>(), {
//     id:0,
//     fullname:''
// });


</script>

<template>

    <h1>!!{{props.fullname}}</h1>
    <div
            v-if="isOnline"
            class="single-doctor__add-info__item">
        <span>Доктор ведет приём только онлайн</span>
    </div>
    <slot name="body"></slot>

    <Reviews>
<!--        <ReviewCardController #review="reviewInfo">-->
<!--            {{reviewInfo}}-->
<!--            <ReviewCardXL v-bind="reviewInfo"/>-->
<!--        </ReviewCardController>-->
        <template #review="reviewInfo">
            <ReviewCardController v-bind="reviewInfo" #default="reviewInfoPrepared">
                <ReviewCardXL v-bind="reviewInfoPrepared"/>
            </ReviewCardController>

        </template>
    </Reviews>
</template>



<style scoped>

</style>