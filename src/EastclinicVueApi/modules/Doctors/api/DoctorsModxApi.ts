import {BASE_URL, API_URL, API_MODX_URL} from '../../../config';
import {postToServer} from '../../../util/UseFetchToServer';
import type ApiDoctorsResponseInterface from "./ResponceInterfaces/ApiDoctorsResponseInterface";



export default class DoctorsApi {
    protected _url:string = '/doctors';
    public async get(requestData: { component:string, action:string }): Promise<ApiDoctorsResponseInterface> {
        try {
            //check request data for working modx api
            if(!requestData.component || !requestData.action ){
                throw new Error('Error modx request data for get doctors');
            }
            const res = await postToServer(API_MODX_URL, { ...requestData });
            // Assuming postToServer returns a Promise, you should await it
            //todo create useHandleAndSaveErrorFromServer class

            // const res2 = await useFetch(API_MODX_URL)
            //
            // const { data } = await useFetch(API_MODX_URL, {
            //     method: 'POST',
            //     body: JSON.stringify(requestData),
            //     server: true,
            // })
            // if(process.server){
            //     console.log('-------------------------------')
            // }
            //
            //
            // const res = await $fetch(API_MODX_URL, {
            //     method: 'POST',
            //     body: { ...requestData }
            // })
            return res as ApiDoctorsResponseInterface;
            // Add a return statement here
            return JSON.parse(res as string) as ApiDoctorsResponseInterface;

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
