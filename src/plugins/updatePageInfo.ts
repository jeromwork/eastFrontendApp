
import { PageInfoService, PageInfoRequest } from "../EastclinicVueApi";

export default defineNuxtPlugin((_nuxtApp) => {
    const router = useRouter();
    const sessionId = '';


    router.beforeEach(async (to, _from, next) => {

        const pageInfoService = new PageInfoService()

        const request = (new PageInfoRequest).withResourceUrl(to.path).withPreviousUrl(_from.path);
        if( !sessionId && to.path === _from.path){
            request.withNewSession();
        }

        await pageInfoService.refreshPageInfoFromServer(request)//its all!

        //after fetch to server, in pageInfoService global contains reactive page info data

        next();
    });



    // return {
    //     provide: {
    //         sessionId:  sessionId,
    //         previousUrl: previousUrl
    //     }
    // }
});
