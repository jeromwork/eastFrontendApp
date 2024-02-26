<script setup lang="ts">
import type RatingViewProps from './RatingViewProps'
import {ref} from 'vue'

const props =  defineProps<RatingViewProps>()
const ratingInfo = ref({
    ...props,  // Spread all properties from props
    description: '',
});

const  reviewTitle = computed(() => {
    let titles = ['отзыв', 'отзыва', 'отзывов'],
        cases = [2, 0, 1, 1, 1, 2];
    return titles[ (props.reviewsCount%100>4 && props.reviewsCount%100<20)? 2 : cases[(props.reviewsCount%10<5)?props.reviewsCount%10:5] ];
});
ratingInfo.value.description = reviewTitle.value

</script>

<template>

    <slot
            v-bind="ratingInfo"

    ></slot>
</template>

<style lang="scss">
@import "../../public/scss/parts/_colors";
@import "../../public/scss/parts/_mixins";
.doctor-card-2__rating {
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (hover: hover) {
    &:hover {
      text-decoration: none !important;
    }
  }
  &__item {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: $fields-yellow-color;
    padding: 4px 8px 4px 4px;
    border-radius: 11px;

  }
  &__star {
    display: flex;
    align-items: center;
  }
  &__grade {
    margin-left: 4px;
    @include text-bold;
    line-height: initial;
    @media (max-width: 585px) {
      font-size: 14px;
    }
  }
  &__count {
    font-size: 14px;
    //margin-left: 8px;
    line-height: initial;
    @media (hover: hover) {
      &:hover {
        text-decoration: underline;
      }
    }

  }
}
.single-doctor__rating {
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (hover: hover) {
    &:hover {
      text-decoration: none !important;
    }
  }
  &__item {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 4px 0 4px 0;
    border-radius: 11px;

  }
  &__star {
    display: flex;
    align-items: center;
  }
  &__grade {
    margin-left: 4px;
    font-size: 18px;
    @include text-bold;
    line-height: initial;
    //@media (max-width: 585px) {
    //  font-size: 14px;
    //}
  }
  &__count {
    font-size: 16px;
    //margin-left: 8px;
    line-height: initial;
    @media (hover: hover) {
      &:hover {
        text-decoration: underline;
      }
    }

  }
}
</style>
