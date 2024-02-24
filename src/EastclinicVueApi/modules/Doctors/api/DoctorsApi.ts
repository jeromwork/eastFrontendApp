import {BASE_URL, API_URL} from '../../../config';
import {postToServer} from '../../../util/UseFetchToServer';
import type ApiResponseInterface from "./ResponceInterfaces/ApiDoctorsResponseInterface";


export default class DoctorsApi {
    protected _url:string = '/doctors';
    public async get(requestData: Object): Promise<ApiResponseInterface> {
        try {
            console.log(BASE_URL + API_URL + this._url)
            const res = await postToServer(BASE_URL + API_URL + this._url, { ...requestData });
            // Assuming postToServer returns a Promise, you should await it

            // Add a return statement here
            return res as ApiResponseInterface;

        } catch (error) {
            console.log('error')
            // Handle the error if needed

            // You might want to return something in case of an error, or throw it again
            throw error;
        }
    }

    withUrl(url:string):this{
        this._url = url;
        return this;
    }
}
