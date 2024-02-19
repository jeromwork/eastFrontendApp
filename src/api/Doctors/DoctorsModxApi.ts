import {BASE_URL, API_URL} from '../config';
import UseRequestAdapters from '~/server/services/util/UseRequestAdapters';
import {postToServer} from '~/server/services/util/UseFetchToServer';
import type ApiResponseInterface from "./ResponceInterfaces/ApiResponseInterface";


export default class DoctorsApi {
    protected _url:string = '/doctors';
    public async get(requestData: Object): Promise<ApiResponseInterface> {
        try {
            const res = await postToServer(BASE_URL + API_URL + this._url, { ...requestData });
            // Assuming postToServer returns a Promise, you should await it

            // Add a return statement here
            return res as ApiResponseInterface;

        } catch (error) {
            // Handle the error if needed

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
