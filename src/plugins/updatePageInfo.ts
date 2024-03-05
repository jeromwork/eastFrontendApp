import { PageInfoService, PageInfoRequest, ClinicsService } from "../EastclinicVueApi";

export default defineNuxtPlugin((_nuxtApp) => {
    const router = useRouter();
    const sessionId = '';


    router.beforeEach(async (to, _from, next) => {


        const request = (new PageInfoRequest).withResourceUrl(to.path).withPreviousUrl(_from.path);
        if( !sessionId && to.path === _from.path){
            request.withNewSession();
        }

        await PageInfoService.refreshPageInfoFromServer(request)//its all!
        //after fetch to server, in pageInfoService global contains reactive page info data
        const currentClinicId = (PageInfoService.currentClinicId) ?? null;
        if(currentClinicId){
            ClinicsService.setCurrentClinic(currentClinicId)
        }

        next();
    });



    // return {
    //     provide: {
    //         sessionId:  sessionId,
    //         previousUrl: previousUrl
    //     }
    // }
});