import {ClinicsService} from "../EastclinicVueApi";
import {ClinicsRequest} from "../EastclinicVueApi";


export default defineNuxtPlugin(async (nuxtApp) => {
    if(process.server){
        console.log(21111111111)
        await ClinicsService.getClinicsFromServer((new ClinicsRequest()));
    }
})