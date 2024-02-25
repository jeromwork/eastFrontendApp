

<script setup lang="ts">
import type {ChevronInterface} from '../../EastclinicVueApi'
import type {Ref} from "vue";

interface ChevronCardViewProps {
    chevrons?: ChevronInterface[] | Ref<ChevronInterface>[]
}
const props =  defineProps<ChevronCardViewProps>()
const chevrons = ref(props.chevrons) as ChevronInterface[];

</script>


<template>
    <div>
        <div
            v-for="chevron in chevrons"
            class="single-doctor__main-info__item">
            <img :src="`/images/doctor/${chevron.icon}.svg`">
            <div>
                <div class="text-semibold">{{chevron.title}}</div>
                <div
                    v-if="chevron.description"
                    class="annotation relative d-inline">
                    {{chevron.description}}
                </div>
            </div>
        </div>

    </div>

</template>

<style lang="scss">
@import "../../public/scss/parts/__colors.scss";
.chevrons {
    display: flex;
    flex-direction: row;
    white-space: nowrap;
    flex-shrink: 1;
    &__item {
        border-radius: 10px;
        padding: 4px 8px;
        font-size: 14px;
        background-color: $fields-back-color;
        margin-right: 8px;
        & svg {
            transform: translateY(2px);
        }
    }
    &__other {
        background-color: $secondary-default-color;
        color: $main-color;
    }
    &__item:last-child {
        margin-right: 0;
    }
}
</style>