<script setup lang="ts">
import type ServiceData from "../../../EastclinicVueApi/interfaces/ServiceData";
import {ref, defineProps} from 'vue'
import {usePriceFormat} from "../../../composables/usePriceFormat";
import FavoriteServiceCard from './FavoriteView.vue'
import Modal from "#build/src/UI/Modal.vue";
import ServicesSelectListView from "#build/src/UI/Services/views/ServicesSelectListView.vue";

const props = defineProps<{services?: ServiceData[], favoriteService?:ServiceData}>()


</script>

<template>
    <FavoriteServiceCard   :service="favoriteService as ServiceData"   />
    <span
        @click="doctorCardState.toogleModalServices(true)"
        class="font-12 main-color pointer text-semibold">Другие услуги
                    </span>
    <Modal v-model:visible="doctorCardState.showModalServices">
        <ServicesSelectListView :services="doctor.service_data"/>
    </Modal>

</template>

