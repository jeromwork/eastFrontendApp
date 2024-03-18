<script setup lang="ts">
import {defineProps } from 'vue'
import { useRouter } from 'vue-router'
import type SearchState from '../../../state/SearchState'
import ClinicCardSelectedView from "../../../UI/Clinics/views/ClinicCardSelectedView.vue";
import useIsMobile from "../../../composables/useIsMobile";
import type {ClinicInterface} from "../../../EastclinicVueApi";
import SearchClinicView from "./SearchClinicView.vue";
import EcButton from "../../../UI/Buttons/EcButton.vue";
import SearchInput from "../../../UI/SearchInput.vue";
import ClinicCardInSelectListView from "../../../UI/Clinics/views/ClinicCardInSelectListView.vue";
import {SearchService, useTextHighLight} from "../../../EastclinicVueApi";
import type {SearchResultInterface} from "../../../EastclinicVueApi";

const props = defineProps<{ state:SearchState }>(
)




const state = props.state
const currentClinic = computed(() => props.state.currentClinic).value as ClinicInterface
const clinics = state.clinics as ClinicInterface[]

const mobile = useIsMobile()
const goToDoctorsPage = () => {
    state.showResultsPanel = false;
    useRouter().push('/vrachi');
}

</script>



<template>
    <section class="searchpanel">
        <div class="searchpanel__inputs-group text-center">
            <!--found seo-->
            <SearchInput class="search-input left"
                         placeholder="Врачи, Болезни, Услуги"
                         v-model="state.searchSeoString"
                         @click="state.toggleShowSeoList()"

            >
                <template #leftIcon>
                    <svg
                        class="search-input__search" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M12.5 11H11.71L11.43 10.73C12.63 9.33002 13.25 7.42002 12.91 5.39002C12.44 2.61002 10.12 0.390015 7.32001 0.0500152C3.09001 -0.469985 -0.469985 3.09001 0.0500152 7.32001C0.390015 10.12 2.61002 12.44 5.39002 12.91C7.42002 13.25 9.33002 12.63 10.73 11.43L11 11.71V12.5L15.25 16.75C15.66 17.16 16.33 17.16 16.74 16.75C17.15 16.34 17.15 15.67 16.74 15.26L12.5 11ZM6.50002 11C4.01002 11 2.00002 8.99002 2.00002 6.50002C2.00002 4.01002 4.01002 2.00002 6.50002 2.00002C8.99002 2.00002 11 4.01002 11 6.50002C11 8.99002 8.99002 11 6.50002 11Z" fill="#878FA2"/>
                    </svg>
                </template>
            </SearchInput>
            <!--found clinic-->
            <SearchClinicView :state="state"  @click="state.toggleShowClinicsList()"></SearchClinicView>

        </div>
<!--search results panel-->
<!--            <transition name="fade">-->
            <div
                v-show="state.showResultsPanel"
                class="searchpanel__results">
<!--seo results-->
                <div v-if="state.showSeoList && state.searchSeoResults.length > 0">
                    <div class="searchpanel__results__left-side">

                            <div class="searchpanel__results__items">
                                <div
                                    v-for="item in state.searchSeoResults"
                                    class="dropdown-panel__items-list__item pointer"
                                    @click="state.selectSeoItem(item)"
                                    v-html="useTextHighLight(item.title, state.searchSeoString)"
                                >

                                </div>
                            </div>
                    </div>
                </div>
                <!--no results-->
                <div v-else-if="state.searchSeoResults.length ===0  && state.showSeoList" class="searchpanel__results__no-results">
                    <div class="searchpanel__results__no-results__search-image"></div>
                    <div class="searchpanel__results__no-results__search-header text-semibold">По вашему запросу ничего не найдено</div>
                    <div class="searchpanel__results__no-results__search-desc text-secondary">Попробуйте изменить запрос или перейдите на страницу врачей</div>
                    <div class="searchpanel__results__no-results__search-button">
                        <EcButton
                            @click="goToDoctorsPage"
                            class="primary"
                        >Посмотреть врачей</EcButton>
                    </div>
                </div>
<!--clinic results-->
                <div  v-show="state.clinics && state.showClinicsList"
                    class="searchpanel__results__right-side">
                    <div
                        v-for="clinic in clinics"
                        @click="state.selectClinic(clinic)"
                    >
                        <div v-if="clinic.id !== 42"
                            class="dropdown-panel__items-list__item clinic pointer"
                            :class="{'active': (currentClinic?.id === clinic.id && mobile)}"

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