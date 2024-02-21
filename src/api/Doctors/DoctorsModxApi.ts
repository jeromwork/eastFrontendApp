import {BASE_URL, API_URL, API_MODX_URL} from '../config';
import UseRequestAdapters from '~/server/services/util/UseRequestAdapters';
import {postToServer} from '~/server/services/util/UseFetchToServer';
import type ApiDoctorsResponseInterface from "./ResponceInterfaces/ApiDoctorsResponseInterface";


export default class DoctorsApi {
    protected _url:string = '/doctors';
    public async get(requestData: Object): Promise<ApiDoctorsResponseInterface> {
        try {
            const res = await postToServer(API_MODX_URL, { ...requestData });
            // Assuming postToServer returns a Promise, you should await it
            //todo create useHandleAndSaveErrorFromServer class
            console.log(11111111111)


            const res2 = await $fetch(API_MODX_URL, {
                method: 'POST',
                body: { ...requestData }


            })
            // Add a return statement here
            return res as ApiDoctorsResponseInterface;

        } catch (error) {
            // Handle the error if needed
            console.log('error')
            // You might want to return something in case of an error, or throw it again
            throw error;
        }
    }

    withUrl(url:string):this{
        this._url = url;
        return this;
    }
    // protected isApiResponse(obj: any): obj is ApiResponseInterface {
    //     // Implement your logic to check if 'obj' conforms to ApiResponseInterface
    //     // Return true if it does, false otherwise
    //     return /* your implementation */;
    // }
}
