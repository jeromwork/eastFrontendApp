import {ClinicsService} from "../EastclinicVueApi";
import {ClinicsRequest} from "../EastclinicVueApi";
import {VueMaskDirective} from 'v-mask'
const vMaskV2 = VueMaskDirective;
const vMaskV3 = {
    beforeMount: vMaskV2.bind,
    updated: vMaskV2.componentUpdated,
    unmounted: vMaskV2.unbind
};
export default defineNuxtPlugin(async (nuxtApp) => {
    await ClinicsService.getClinicsFromServer((new ClinicsRequest()));

    nuxtApp.vueApp.directive('mask', vMaskV3)

})