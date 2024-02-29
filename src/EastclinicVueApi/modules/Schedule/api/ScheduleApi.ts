//only one api for get page info, modx or laravel

import {API_MODX_URL} from '../../../config';
import {postToServer} from '../../../util/UseFetchToServer';
import type ApiScheduleResponseInterface from "./ApiScheduleResponseInterface";



export default class ScheduleApi {

    public async get(requestData: Object): Promise<ApiScheduleResponseInterface> {
        try {
            console.log('refreshPageInfoFromServer')

             const res = await postToServer(API_MODX_URL, { ...requestData });

            return res as ApiScheduleResponseInterface;

        } catch (error) {
            console.log('error')
            // Handle the error if needed

            // You might want to return something in case of an error, or throw it again
            throw error;
        }
    }

}
