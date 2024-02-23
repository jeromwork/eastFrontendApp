import type RequestAdapterInterface from "../../../interfaces/RequestAdapterInterface";

export interface DoctorsRequestInterface {
    component:string,
    action:string }

export default class DoctorsRequest implements RequestAdapterInterface
{
    private _requestData: { [key: string]: any } = {};
    onUploadProgressCallback:Function = function (){};
    onSuccessCallback:Function = function (){};
    onErrorCallback:Function = function (){};


    //setters



    // withUploadProgressCallback(callback){
    //     onUploadProgressCallback = callback;
    //     return this;
    // }

    withSuccessCallback(callback:Function):this{
        this.onSuccessCallback = callback;
        return this;
    }
    withErrorCallback(callback:Function):this{
        this.onErrorCallback = callback;
        return this;
    }



    with(field: string, value: any):this {
        if (!field) return this;
        this._requestData[field] = value;
        return this;
    }

    forCurrentUrl(url:string):this{
        this._requestData['url'] = url;
        return this;
    }

    forPage( page:Number):this{
        this._requestData['page'] = page;
        return this;
    }

    withCountPerPage( page:Number):this{
        this._requestData['perPage'] = page;
        return this;
    }

    //getters

    getRequestData():DoctorsRequestInterface { return this._requestData as DoctorsRequestInterface; }


}

