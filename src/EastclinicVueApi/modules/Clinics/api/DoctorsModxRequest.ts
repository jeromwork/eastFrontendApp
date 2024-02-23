import type RequestAdapterInterface from "../../api/RequestAdapterInterface";


export default class DoctorsModxRequest implements RequestAdapterInterface
{
    private _requestData: { [key: string]: any } = {};


    //setters


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

    public forAction( action:string ):this{
        this._requestData['action'] = action;
        return this;
    }

    public forComponent( component:string ):this{
        this._requestData['component'] = component;
        return this;
    }



    //getters

    getRequestData() { return this._requestData; }


}

