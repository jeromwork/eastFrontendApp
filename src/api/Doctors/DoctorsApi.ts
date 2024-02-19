import {BASE_URL, API_URL} from '../config';
import UseRequestAdapters from '~/server/services/util/UseRequestAdapters';
import {postToServer} from '~/server/services/util/UseFetchToServer';
import type RequestAdapterInterface from "../../api/RequestAdapterInterface";


export default class DoctorsApi {
    protected _url:string = '/doctors';
    public async get(requestData:Object){
        return await postToServer(BASE_URL + API_URL + this._url, {...requestData });
    }

    withUrl(url:string):this{
        this._url = url;
        return this;
    }
}
