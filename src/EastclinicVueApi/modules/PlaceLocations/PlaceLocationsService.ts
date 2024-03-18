

import StateManager from "../../util/StateManager";
import type {Ref} from "vue";
import {toRef, ref} from "vue";

import type PlaceInterface from "../../interfaces/PlaceInterface";
import {postToServer} from "../../util/UseFetchToServer";
import {API_MODX_URL} from "../../config";

const state = new StateManager();


type IPlace = {
    id:number,
    name:string
}

type IPlaceResponse = {
    data:IPlace[]
}

class PlaceLocationsService {
    private state: StateManager;

    constructor() {
        this.state = state;
    }

    public async getPlacesFromServer( ){
        try {

            const res = await postToServer(API_MODX_URL, { component: 'placeslocations', action: 'get_places' }) as IPlaceResponse;

            if(res?.data?.length ){
                const places: { [key: string]: IPlace } = {};
                res.data.map( place=>{
                    places[place.name] = place;
                });
                this.state.set('places', places);
            }else {
                throw new Error('not have places from server')
            }


        } catch (error) {
            console.log('error')
            // Handle the error if needed

            // You might want to return something in case of an error, or throw it again
            throw error;
        }

    }


    public get places():{ [key: string]: IPlace }{
        return this.state.get('places') as { [key: string]: IPlace };
    }

    public place( name:string):IPlace|null{
        return (this.places?.[name]) ?? null
    }

    public getUrlWithPlace (url:string, placeName:string = ''):string{

        if(!url){
            throw new Error('Necessarily get {url}');
        }
        let urlParts = this.getUrlPartsWithoutPlace(url);
        //add placeName to url
        if(placeName && this.place(placeName)) {
            urlParts.push(placeName);
        } else {
            return url;
        }

        return '/' + urlParts.join('/');
        }


    public getUrlPartsWithoutPlace(url:string):string[]{
        //clear url for previous place
        let urlParts = url.split('/')
        if(urlParts.length === 0) return [url];
        urlParts = urlParts.filter( part => part !== '' && !this.places[part] );
        return urlParts;
    }
}
export default new PlaceLocationsService()
