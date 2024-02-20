import {Buffer} from "unenv/runtime/node/buffer/_buffer";

import from = Buffer.from;
import PageInfoService from "../server/services/PageInfo/PageInfoService";


export default defineNuxtPlugin((_nuxtApp) => {
    const router = useRouter();
    let sessionId = '';
    let previousUrl = '/';
    router.beforeEach(async (to, _from, next) => {
        console.log('---------------------------------------');
        // const request = {url:to.fullPath};
        // if(!from.name) request.startSession = true
        console.log(_from)
        console.log(to)
        const pageInfoService = new PageInfoService()
        let request = {}
        // if(!from.name)  request = { startSession : true,
        //     resourceUrl: currentUrl,
        //     previousUrl: previousUrl
        // };
        if(!sessionId){
            await pageInfoService.getPageInfoFromServer(request)

            // if(previousUrl       )
        }

       //
        console.log(sessionId)



        next();
    });

    // return {
    //     provide: {
    //         sessionId:  sessionId,
    //         previousUrl: previousUrl
    //     }
    // }
});
