import type RequestAdapterInterface from "../../../interfaces/RequestAdapterInterface";

export default class PageInfoRequest implements RequestAdapterInterface
{
    protected _requestData: { [key: string]: any } = {};


    //setters


    public with(field: string, value: any):this {
        if (!field) return this;
        this._requestData[field] = value;
        return this;
    }
    getRequestData() {
        if(!this._requestData['action'] || !this._requestData['component']) throw new Error('Not have necessarily action and component params in request')
        return this._requestData; }
    public withResourceUrl(resourceUrl:string):this{
        this._requestData['resourceUrl'] = resourceUrl;
        return this;
    }


    public withPreviousUrl(previousUrl:string):this{
        this._requestData['previousUrl'] = previousUrl;
        return this;
    }

    public withNewSession():this{
        this._requestData['startSession'] = true;
        return this;
    }

}

