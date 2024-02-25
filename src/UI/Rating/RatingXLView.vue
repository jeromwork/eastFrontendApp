

<script setup lang="ts">
import type {AwardInterface} from '../../EastclinicVueApi'
import type {Ref} from "vue";
import type RatingViewProps from "../../interfaces/RatingViewProps";

const  reviewTitle = (number) => {
    let titles = ['отзыв', 'отзыва', 'отзывов'],
        cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
};

const props =  defineProps<RatingViewProps>()

</script>

<template>
    <nuxt-link :to="uri+ '#reviews'" class="doctor-card-2__rating">
        <slot>
            <div class="doctor-card-2__rating__count main-color text-semibold">{{( reviewsCount > 0 ) ? reviewsCount: ''}} {{( reviewsCount > 0 ) ?reviewTitle(reviewsCount): ''}}</div>
        </slot>
    </nuxt-link>
</template>

