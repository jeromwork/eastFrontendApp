<script setup lang="ts">
import {defineProps} from "vue";
import SearchState from "../../../state/Search/SeoState";
import useIsMobile from "../../../composables/useIsMobile";
import {useTextHighLight} from "../../../EastclinicVueApi";
import {useRouter} from "vue-router";
import EcButton from "../../../UI/Buttons/EcButton.vue";
const props = defineProps<{ state:SearchState }>()
const state = props.state as SearchState


const mobile = useIsMobile()
const goToDoctorsPage = () => {
    useRouter().push('/vrachi');
}

</script>

<template>
    <div v-if="state.searchSeoResults.length > 0">
        <div class="searchpanel__results__left-side">

            <div class="searchpanel__results__items">
                <div
                    v-for="item in state.searchSeoResults"
                    class="dropdown-panel__items-list__item pointer"
                    @click="state.goSeoUrl(item)"
                    v-html="useTextHighLight(item.title, state.searchSeoString)"
                >

                </div>
            </div>
        </div>
    </div>
    <!--no results-->
    <div v-else-if="state.searchSeoResults.length ===0" class="searchpanel__results__no-results">
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


</template>

<style scoped>

</style>