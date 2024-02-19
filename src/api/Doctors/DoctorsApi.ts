import {BASE_URL, API_URL} from '../config';
import UseRequestAdapters from '~/server/services/util/UseRequestAdapters';
// import buildGetURL from '~/services/util/UseGetParametersBuilder';
import {getToServer} from '../../services/util/UseFetchToServer';


export default (() => {
    let _url = '/doctors';
    return {
        ...UseRequestAdapters,
        _requestData : {},

        async get(requestData){
            return await getToServer(BASE_URL + API_URL + _url, {...requestData });
        },


        withUrl(url){
            if(url) _url = url;
            return this;
        },


    }
})();
