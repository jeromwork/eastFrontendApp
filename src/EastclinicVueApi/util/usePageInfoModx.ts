

import {postToServer} from '~/server/services/util/UseFetchToServer';
import {fetchToServer} from "./UseFetchToServer";
 interface ApiGetPageInfoResponseInterface {
    data: {
        resource: {
            parents: { [key: string]: number },
            isCatalog: boolean,
            type: string,
            template: number,
            url: string,
            parent: number,
            id: number,
            title: string,
            pagetitle: string,
            longtitle: string,
            menutitle: string,
            content: string,
            description: string,
            qualityDescription: string,
            authorArticle: string,
            urlAuthorArticle: string,
            useWorkerType: number,
            showInstaSlider: number,
            breadcrumbs?: Breadcrumb[];
        };
    };
    sessionId: string;
}

interface Breadcrumb {
    title: string;
    url: string;
}

async function postToServer<T>(url: string, requestData: Object, options?: RequestInit) {
    try {
        if(!options) options = {};
        options.method = 'POST';
        options.headers = {   'Content-Type': 'application/json', };
        options.body = JSON.stringify(requestData)
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();
    return data as T;
} catch (error) {
    throw new Error(`Fetch error: ${error.message}`);
}
}

 const get = async(requestData: Object): Promise<ApiGetPageInfoResponseInterface> => {
     try {

         //
         // console.log(res)
         return {data:{resource:{}}}
         //const res = await postToServer(API_MODX_URL, { ...requestData });

         // // Add a return statement here
         // return res as ApiGetPageInfoResponseInterface;

     } catch (error) {
         console.log('error')
         // Handle the error if needed

         // You might want to return something in case of an error, or throw it again
         throw error;
     }
 }
export default {
    install: (app:any, options:any) => {
        const { router, apiUrl } = options;

        if(!router || !apiUrl) return;
        if (!router) {
            console.error('Router instance is required for the plugin');
            return;
        }

        router.beforeEach((to, from, next) => {
            //load page info data every time
            //save page info data in reactive obj
            //add reactive state prevUrl

            // console.log(from)
            // console.log(to)
            if(from.path === to.path){

                console.log('first visit')
            }
            // const res = await postToServer(API_MODX_URL, { ...requestData });

            // Your middleware logic here
            // For example, checking if the user is authenticated

            // If the middleware logic is successful, call next() to proceed with the route change
            // If the middleware logic fails, call next(false) to abort the navigation
            next();
        });

        // You can add more plugin-related logic here if needed
    }
};