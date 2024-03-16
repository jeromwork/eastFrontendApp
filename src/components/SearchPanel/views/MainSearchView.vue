<script setup lang="ts">
import {defineProps} from 'vue'
import type SearchState from '../../../state/SearchState'
import ClinicCardSelectedView from "../../../UI/Clinics/views/ClinicCardSelectedView.vue";
import SearchSeoView from "./SearchSeoView.vue";
import {useIsMobile} from "#build/.nuxt/imports";
import type {ClinicInterface} from "../../../EastclinicVueApi";


const props = defineProps<{ state:SearchState }>(
)




const state = props.state
const currentClinic = computed(() => props.state.currentClinic).value as ClinicInterface

const mobile = useIsMobile()


</script>



<template>
    <section class="searchpanel">
        <div class="searchpanel__inputs-group text-center">

            <!--found seo-->
            <SearchSeoView :state="state"/>

            <!--found clinic-->




<!--            <transition name="fade">-->
<!--                &lt;!&ndash;search results&ndash;&gt;-->

<!--                &lt;!&ndash;searchUniversal&ndash;&gt;-->







<!--                &lt;!&ndash;searchClinic&ndash;&gt;-->
<!--            </transition>-->





        </div>
    </section>

</template>

<style scoped>
fieldset {
    border: 0;
}
.v-input__slot {
    border-radius: 15px;
    display: flex;
    height: 55px;
}
.v-select__slot {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>