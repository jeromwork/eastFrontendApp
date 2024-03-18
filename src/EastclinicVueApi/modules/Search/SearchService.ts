import StateManager from "../../util/StateManager";
import type {Ref} from "vue";
import {toRef, ref} from "vue";
import type SearchResultInterface from '../../interfaces/SearchResultInterface'

import {postToServer} from "../../util/UseFetchToServer";
import {API_MODX_URL} from "../../config";
import {PageInfoService} from "../../../EastclinicVueApi";
// import {createWebHistory, useRouter} from "vue-router";


type TSearchResponse = {
    data:SearchResultInterface[]
}


class SearchService {
    private searchSeoResults:Ref<SearchResultInterface[]> =  ref([]);



    public async searchFetch( searchString:string = '' ){
        const sessionId = PageInfoService.getSessionId();
        const {data} = await postToServer(API_MODX_URL, { component: 'health', action: 'search', searchString, sessionId }) as TSearchResponse;
        this.searchSeoResults.value = ( data && data.length ) ? data : [];
    }


    public foundItems():SearchResultInterface[]{
        return computed(() => this.searchSeoResults.value).value;
    }

}

export default new SearchService()
