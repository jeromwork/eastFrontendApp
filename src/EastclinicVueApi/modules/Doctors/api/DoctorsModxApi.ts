import {BASE_URL, API_URL, API_MODX_URL} from '../../../config';
import {postToServer} from '../../../util/UseFetchToServer';
import type ApiDoctorsResponseInterface from "./ResponceInterfaces/ApiDoctorsResponseInterface";



export default class DoctorsApi {
    protected _url:string = '/doctors';
    public async get(requestData: Object): Promise<ApiDoctorsResponseInterface> {
        try {
            //check request data for working modx api
            const res = await postToServer(API_MODX_URL, { ...requestData });
            //todo create useHandleAndSaveErrorFromServer class

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
