<script setup lang="ts">




import SearchInput from "../../../UI/SearchInput.vue";
import {defineProps} from "vue";
import ClinicsState from "../../../state/Search/ClinicsState";
import ClinicCardSelectedView from "../../../UI/Clinics/views/ClinicCardSelectedView.vue";
import type {ClinicInterface} from "../../../EastclinicVueApi";
import useIsMobile from "../../../composables/useIsMobile";

const props = defineProps<{ state:ClinicsState }>()
const state = props.state as ClinicsState
const currentClinic = computed(() => props.state.currentClinic).value as ClinicInterface

const mobile = useIsMobile()

</script>

<template>
    <div
        class="fake-search-input right"
        :class="{'mobile': mobile}"
    >
        <svg class="fake-search-input__prepend" width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.05365 18.9473C9.05365 19.5287 8.58144 20 7.99895 20C7.41645 20 6.94424 19.5287 6.94424 18.9473C6.94424 18.3658 7.41645 17.8945 7.99895 17.8945C8.58144 17.8945 9.05365 18.3658 9.05365 18.9473Z" fill="#878FA2"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 7.3692C0.5 3.29929 3.85818 0 8 0C12.1418 0 15.5 3.30035 15.5 7.3692C15.5 10.2695 13.7967 12.7771 11.3192 13.9804C9.70018 14.8068 8.752 15.6701 8.42083 16.5702C8.36071 16.7354 8.17614 16.846 8 16.846C7.82386 16.846 7.63718 16.7354 7.57706 16.5702C7.24589 15.6701 6.30087 14.8068 4.68085 13.9804C2.2044 12.7761 0.5 10.2684 0.5 7.3692Z" fill="#878FA2"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00822 11.5781C5.67164 11.5781 3.78013 9.68405 3.78013 7.36709C3.78013 5.05014 5.67164 3.15612 7.98967 3.15612C10.3077 3.15612 12.2178 5.05014 12.2178 7.36709C12.2178 9.68405 10.3262 11.5781 8.00822 11.5781ZM6.94424 6.31435C6.79589 6.20402 6.54322 6.11164 6.33924 6.36907C6.13525 6.62651 6.09816 7.0361 6.24651 7.14643C6.39487 7.25676 6.74025 7.09816 6.94424 6.84072C7.14823 6.58328 7.0926 6.42468 6.94424 6.31435ZM10.6129 5.18117C10.6228 5.12251 10.5576 5.11012 10.5344 5.16496C9.69858 7.14687 6.75314 8.0525 6.1167 7.40387C5.63999 6.91684 6.10854 6.03926 6.33894 5.67513C6.35818 5.64472 6.31977 5.60917 6.29231 5.63246C5.29813 6.47536 5.45707 7.83034 5.61601 8.26813C5.85708 8.93012 6.24651 9.20594 6.30215 9.26111C7.08903 9.95925 7.96841 9.94405 8.36649 9.89068C8.42151 9.88331 8.42384 9.80657 8.37207 9.78657C7.73641 9.5411 6.76451 8.72449 8.28638 7.93714C10.094 6.99303 10.5155 5.75367 10.6129 5.18117Z" fill="white"/>
        </svg>
        <span
            class="fake-search-input__input no-focus"
            v-if="currentClinic && !mobile || mobile &&  currentClinic"
        >
                    <div
                        class="dropdown-panel__items-list__item no-hover clinic"
                        v-if="currentClinic.id !== 42"
                    >
                  <ClinicCardSelectedView v-if="currentClinic" :clinic="currentClinic"></ClinicCardSelectedView>
                </div>
                <div
                    class="dropdown-panel__items-list__item no-hover clinic pointer"
                    v-else
                >
<!--                  <svg style="transform: translateY(3px);"xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">-->
                    <!--                    <path d="M15.6667 0.666016H9.00008C4.31675 0.666016 0.666748 4.54935 0.666748 9.23268C0.666748 13.5827 4.40842 17.3327 8.76675 17.3327C13.4917 17.3327 17.3334 13.6827 17.3334 8.99935V2.33268C17.3334 1.41602 16.5834 0.666016 15.6667 0.666016ZM13.1667 11.4993L10.6667 9.83268V11.4993H4.83341V6.49935H10.6667V8.16602L13.1667 6.49935V11.4993Z" fill="#4372EA"/>-->
                    <!--                  </svg>-->
                  <span >{{currentClinic.node_address}}</span>
                </div>
            </span>
        <span v-else class="fake-search-input__input"><span class="text-secondary">Выберите клинику</span></span>
        <span
            @click="state.clearClinic"
            v-show="currentClinic &&  state.overlay && !mobile || mobile && !state.overlay && currentClinic"
            class="mdi mdi-close pointer _close-button" style="transform: translateY(1px); margin-right: 10px"></span>

        <svg class="fake-search-input__append" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8"><path d="M9.78722 0.999052L5.90722 4.87905L2.02722 0.999052C1.93463 0.90647 1.82472 0.833031 1.70376 0.782926C1.5828 0.732821 1.45315 0.707031 1.32222 0.707031C1.19129 0.707031 1.06164 0.732821 0.940673 0.782926C0.819709 0.833031 0.709798 0.90647 0.617216 0.999052C0.524634 1.09163 0.451194 1.20154 0.401089 1.32251C0.350984 1.44347 0.325195 1.57312 0.325195 1.70405C0.325195 1.83498 0.350984 1.96463 0.401089 2.0856C0.451194 2.20656 0.524634 2.31647 0.617216 2.40905L5.20722 6.99905C5.59722 7.38905 6.22722 7.38905 6.61722 6.99905L11.2072 2.40905C11.2999 2.31654 11.3735 2.20665 11.4236 2.08568C11.4738 1.9647 11.4997 1.83502 11.4997 1.70405C11.4997 1.57308 11.4738 1.4434 11.4236 1.32243C11.3735 1.20145 11.2999 1.09157 11.2072 0.999052C10.8172 0.619052 10.1772 0.609052 9.78722 0.999052Z" fill="#757F93"></path></svg>


    </div>






</template>

<style scoped>

</style>