
//only one api for get page info, modx or laravel
//

import {API_MODX_URL} from '../../../config';
// import UseRequestAdapters from '~/server/services/util/UseRequestAdapters';
// import {postToServer} from '~/server/services/util/UseFetchToServer';
import type ApiGetPageInfoResponseInterface from "./ApiGetPageInfoResponseInterface";
// import {useFetchEastApi} from "#build/.nuxt/imports";



export default class PageInfoApi {

    public async get(requestData: Object): Promise<ApiGetPageInfoResponseInterface> {
        try {

            // const config = useRuntimeConfig()
            // const nuxtApp = useNuxtApp()
            // console.log(useNuxtApp())
            // const {useFetch} = useFetchEastApi();

            console.log(222222)

            console.log(3333333)

            //
            // console.log(res)
            return {data:{resource:{}}}
             // const res = await postToServer(API_MODX_URL, { ...requestData });

            // // Assuming postToServer returns a Promise, you should await it
            //
            // // Add a return statement here
            // return res as ApiGetPageInfoResponseInterface;

        } catch (error) {
            console.log('error')
            // Handle the error if needed

            // You might want to return something in case of an error, or throw it again
            throw error;
        }
    }

}
