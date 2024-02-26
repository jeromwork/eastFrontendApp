

<script setup lang="ts">
import type {AwardInterface} from '../../EastclinicVueApi'
import type {Ref} from "vue";

interface AwardCardViewProps {
    awardInfo?: AwardInterface | Ref<AwardInterface>
}
const props =  defineProps<AwardCardViewProps>()
const awardInfo = ref(props.awardInfo) as AwardInterface;

</script>


<template>
    <div
            v-if="awardInfo"
            class="single-doctor__main-info__item pointer">
        <img src="/images/doctor/cup-star.svg">
        <div>
            <div class="text-semibold">{{awardInfo.name}}</div>
            <div class="annotation relative d-inline">
                {{awardInfo.portal}}
            </div>
        </div>
    </div>
</template>
<style scoped>

</style>