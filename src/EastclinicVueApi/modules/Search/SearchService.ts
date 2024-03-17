import StateManager from "../../util/StateManager";
import type {Ref} from "vue";
import {toRef} from "vue";
import type SearchResultInterface from '../../interfaces/SearchResultInterface'

import {postToServer} from "../../util/UseFetchToServer";
import {API_MODX_URL} from "../../config";
// import {createWebHistory, useRouter} from "vue-router";

const state = new StateManager();


type TSearchResponse = {
    data:SearchResultInterface[]
}


class SearchService {
    private state: StateManager;

    constructor() {
        this.state = state;
    }

    public async searchFetch( searchString:string ){

        const {data} = await postToServer(API_MODX_URL, { component: 'placeslocations', action: 'get_places' }) as TSearchResponse;

        this.state.set('searchSeo', data);
    }


    public foundItems():SearchResultInterface[]|null{
        return (this.state.get('searchSeo')) ?? null;
    }

}

export default new SearchService()
