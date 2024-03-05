import {ClinicsService} from "../EastclinicVueApi";
import {ClinicsRequest} from "../EastclinicVueApi";


export default defineNuxtPlugin(async (nuxtApp) => {
    await ClinicsService.getClinicsFromServer((new ClinicsRequest()));

    if(process.server){

    }
})