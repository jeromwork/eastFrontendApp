//only one api for get page info, modx or laravel

import {API_MODX_URL} from '../../../config';
import {postToServer} from '../../../util/UseFetchToServer';



export default class PageInfoApi {

    public async get(requestData: Object): Promise<any> {
        try {

             const res = await postToServer(API_MODX_URL, { ...requestData });
            return res as any;

        } catch (error) {
            console.log('error')
            // Handle the error if needed

            // You might want to return something in case of an error, or throw it again
            throw error;
        }
    }

}
