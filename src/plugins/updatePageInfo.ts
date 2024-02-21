import {Buffer} from "unenv/runtime/node/buffer/_buffer";

import from = Buffer.from;
import PageInfoService from "../server/services/PageInfo/PageInfoService";
import {API_MODX_URL} from '../api/config';

export default defineNuxtPlugin((_nuxtApp) => {
    const router = useRouter();
    let sessionId = '';
    let previousUrl = '/';
    const fef = async (request:any) => {
        const res = await useFetch(API_MODX_URL, {
            method: 'POST',
            body: {
                ...request
            }
        })
    }
    // useMyComposable();
    router.beforeEach(async (to, _from, next) => {
        // const request = {url:to.fullPath};
        // if(!from.name) request.startSession = true


        const pageInfoService = new PageInfoService()
        let request = {}
        // if(!from.name)  request = { startSession : true,
        //     resourceUrl: currentUrl,
        //     previousUrl: previousUrl
        // };




        if(!sessionId){
           await pageInfoService.withFetch(useFetch).getPageInfoFromServer(request)

            // if(previousUrl       )
        }

       //



        next();
    });



    // return {
    //     provide: {
    //         sessionId:  sessionId,
    //         previousUrl: previousUrl
    //     }
    // }
});
