

import StateManager from "../../util/StateManager";
import type {Ref} from "vue";
import {toRef, ref} from "vue";

import type PlaceInterface from "../../interfaces/PlaceInterface";
import {postToServer} from "../../util/UseFetchToServer";
import {API_MODX_URL} from "../../config";

const state = new StateManager();
class PlaceLocationsService {
    private state: StateManager;

    constructor() {
        this.state = state;
    }

    public async getPlacesFromServer( ){
        try {

            const res = await postToServer(API_MODX_URL, { component: 'placeslocations', action: 'get_places' });
            this.state.set('places', res);
        } catch (error) {
            console.log('error')
            // Handle the error if needed

            // You might want to return something in case of an error, or throw it again
            throw error;
        }

    }


    public get places():PlaceInterface[]{
        return this.state.get('places') as PlaceInterface[];
    }


    // public getClinic( id:number):ClinicInterface|null{
    //     return (this.state.get('clinics')?.[id]) ? this.state.get('clinics')[id] : null
    // }




}
export default new PlaceLocationsService()
