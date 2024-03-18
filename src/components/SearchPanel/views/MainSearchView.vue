<script setup lang="ts">
import {defineProps, ref } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import SeoState from '../../../state/Search/SeoState'
import ClinicsState from '../../../state/Search/ClinicsState'
import ClinicCardSelectedView from "../../../UI/Clinics/views/ClinicCardSelectedView.vue";
import useIsMobile from "../../../composables/useIsMobile";
import type {ClinicInterface} from "../../../EastclinicVueApi";
import SearchClinicView from "./SearchClinicView.vue";


import ClinicCardInSelectListView from "../../../UI/Clinics/views/ClinicCardInSelectListView.vue";
import {SearchService, useTextHighLight} from "../../../EastclinicVueApi";
import type {SearchResultInterface} from "../../../EastclinicVueApi";
import SeoSearchInputView from "./SeoSearchInputView.vue";
import SeoSearchResultsView from "./SeoSearchResultsView.vue";
import { onClickOutside } from '@vueuse/core'

//here use 2 state for possibility use them partly

const seoSearchState = new SeoState();
const clinicsSearchState = new ClinicsState();


const currentClinic = computed(() => clinicsSearchState.currentClinic).value as ClinicInterface
const clinics = clinicsSearchState.clinics as ClinicInterface[]

const isMobile = useIsMobile()
const visibleResultsPanel:Ref<boolean> = ref(false);
const showSeoSearchResults:Ref<boolean> = ref(false);
const showClinics:Ref<boolean> = ref(false);

//control visible clinics list
const toggleShowClinics = (show?:boolean) => {
    if(show === undefined) show = !showClinics.value
    showClinics.value = show;
    showResultsPanel();
    if(show) showSeoSearchResults.value = !show;
}

//close result panel by click outside
const refResultPanel = ref(null)
onClickOutside(refResultPanel, event => {
    visibleResultsPanel.value = showSeoSearchResults.value = showClinics.value = false;
})
// control visible seo search results
const toogleShowSeoSearchResults = ( ) =>{
    showSeoSearchResults.value = true;
    showResultsPanel();
    showClinics.value = false;
}

const selectClinic = (clinic) =>{
    clinicsSearchState.selectClinic(clinic)
    visibleResultsPanel.value = showSeoSearchResults.value = showClinics.value = false;
}
//control visible all result panel, with scroll top if mobile mode
const showResultsPanel = () => {
    visibleResultsPanel.value = true;
    if(isMobile){
        console.log('scrollTop')
        setTimeout(() => {
            let html = document.getElementsByTagName('html')[0];
            html.scrollTop = 0;
        }, 50);
    }

}
//todo show fullscreen for mobile

</script>



<template>
    <section class="searchpanel">
        <div class="searchpanel__inputs-group text-center">

<!--found seo-->
            <SeoSearchInputView :state="seoSearchState" @click="toogleShowSeoSearchResults()"/>

<!--found clinic-->
            <SearchClinicView :state="clinicsSearchState"  @click="toggleShowClinics()"></SearchClinicView>
        </div>

<!--search results panel-->
<!--            <transition name="fade">-->
            <div
                v-if="visibleResultsPanel"
                class="searchpanel__results"
            ref="refResultPanel">
<!--seo results-->
                <SeoSearchResultsView v-if="showSeoSearchResults" :state="seoSearchState" />
<!--clinic results-->
                <div  v-show="clinicsSearchState.clinics && showClinics"
                    class="searchpanel__results__right-side">
                    <div
                        v-for="clinic in clinics"
                        @click="selectClinic(clinic)"
                    >
                        <div v-if="clinic.id !== 42"
                            class="dropdown-panel__items-list__item clinic pointer"
                            :class="{'active': (currentClinic?.id === clinic.id && isMobile)}"

                        >
                            <ClinicCardInSelectListView :clinic="clinic"/>

                        </div>
                        <div v-else class="dropdown-panel__items-list__online-item clinic pointer">
                            <div class="dropdown-panel__items-list__online-item__icon"></div>
                            <div class="dropdown-panel__items-list__online-item__text">
                                <div class="dropdown-panel__items-list__online-item__text_header text-semibold">Врачи онлайн</div>
                                <div class="dropdown-panel__items-list__online-item__text_desc">Быстрая помощь</div>
                            </div>
                            <div class="dropdown-panel__items-list__online-item__forward">
                                <span class="icons forward" style="width: 10px; filter: contrast(0.1)"></span>
                            </div>
                        </div>
                    </div>

                </div>



            </div>
<!--            </transition>-->

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