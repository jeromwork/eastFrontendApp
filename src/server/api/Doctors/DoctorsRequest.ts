import RequestAdapterInterface from "~/server/api/RequestAdapterInterface";


class DoctorsRequest implements RequestAdapterInterface
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

    withSuccessCallback(callback:Function){
        this.onSuccessCallback = callback;
        return this;
    }
    withErrorCallback(callback:Function){
        this.onErrorCallback = callback;
        return this;
    }



    with(field: string, value: any) {
        if (!field) return this;
        this._requestData[field] = value;
        return this;
    }

    forCurrentUrl(url:string){
        this._requestData['currentUrl'] = url;
    }


    //getters

    getRequestData() { return this._requestData; }


}

export default DoctorsRequest

