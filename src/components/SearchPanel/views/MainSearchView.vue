<script setup lang="ts">
import {defineProps } from 'vue'
import { useRouter } from 'vue-router'
import type SearchState from '../../../state/SearchState'
import ClinicCardSelectedView from "../../../UI/Clinics/views/ClinicCardSelectedView.vue";
import SearchSeoView from "./SearchSeoView.vue";
import useIsMobile from "../../../composables/useIsMobile";
import type {ClinicInterface} from "../../../EastclinicVueApi";
import SearchClinicView from "./SearchClinicView.vue";
import EcButton from "../../../UI/Buttons/EcButton.vue";


const props = defineProps<{ state:SearchState }>(
)




const state = props.state
const currentClinic = computed(() => props.state.currentClinic).value as ClinicInterface

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
            <SearchSeoView :state="state"/>

            <!--found clinic-->
            <SearchClinicView :state="state"></SearchClinicView>

        </div>

                <!--search results panel-->
            <transition name="fade">
            <div
                v-show="state.showResultsPanel"
                class="searchpanel__results">
<!--seo results-->
                <div v-if="!state.noResults">


                    <div  v-if="state.showSeoList"  class="searchpanel__results__left-side">

                            <div class="searchpanel__results__items">
                                <div
                                    v-for="item in items"
                                    @click="chooseItem(item)"
                                    v-html="textHighlighting(item.title)"
                                    class="dropdown-panel__items-list__item pointer"></div>
                            </div>
                    </div>
<!--clinic results-->
                    <div
                        v-show="state.clinics"
                        class="searchpanel__results__right-side">
                        <div
                            v-for="clinic in state.clinics"
                            @click="selectClinicItem(clinic)"
                        >
                            <div
                                class="dropdown-panel__items-list__item clinic pointer"
                                :class="{'active': (currentClinic.id === clinic.id && activeClass && mobile)}"
                                v-if="clinic.id !== 42"
                            >
                                <ClinicName
                                    :name="clinic.title"
                                    :color="toStringValue(clinic.color)"
                                    :way="toStringValue(clinic.way)"
                                    :wayTime="toStringValue(clinic.way_time)"
                                />

                            </div>
                            <div
                                class="dropdown-panel__items-list__online-item clinic pointer"
                                v-else
                            >
                                <div class="dropdown-panel__items-list__online-item__icon"></div>
                                <div class="dropdown-panel__items-list__online-item__text">
                                    <div class="dropdown-panel__items-list__online-item__text_header text-semibold">Врачи онлайн</div>
                                    <div class="dropdown-panel__items-list__online-item__text_desc">Быстрая помощь</div>
                                </div>
                                <div class="dropdown-panel__items-list__online-item__forward">
                                    <span class="icons forward" style="width: 10px; filter: contrast(0.1)"></span>
                                </div>
                                <!--                  <svg style="transform: translateY(3px);"xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">-->
                                <!--                    <path d="M15.6667 0.666016H9.00008C4.31675 0.666016 0.666748 4.54935 0.666748 9.23268C0.666748 13.5827 4.40842 17.3327 8.76675 17.3327C13.4917 17.3327 17.3334 13.6827 17.3334 8.99935V2.33268C17.3334 1.41602 16.5834 0.666016 15.6667 0.666016ZM13.1667 11.4993L10.6667 9.83268V11.4993H4.83341V6.49935H10.6667V8.16602L13.1667 6.49935V11.4993Z" fill="#4372EA"/>-->
                                <!--                  </svg>-->
                                <!--                  <span >{{clinic.title}}</span>-->
                            </div>
                        </div>

                    </div>
                </div>
<!--no results-->
                <div v-else-if="state.noResults" class="searchpanel__results__no-results">
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

            </div>
            </transition>







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