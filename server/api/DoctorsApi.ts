import {BASE_URL, API_URL} from '@/api/config.js';
import UseRequestAdapters from '@/services/util/UseRequestAdapters.js';
import buildGetURL from '@/services/util/UseGetParametersBuilder.js';
import {getToServer} from '../../services/util/UseFetchToServer';


export default (() => {
    let _url = '/doctors';
    return {
        ...UseRequestAdapters,
        _requestData : {},

        async get(requestData){
            return await getToServer(BASE_URL + API_URL + _url, {...requestData, ...this._requestData});
        },


        withUrl(url){
            if(url) _url = url;
            return this;
        },


    }
})();
