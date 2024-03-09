import type {DoctorInterface, ClinicInterface, ServiceData} from "../../../EastclinicVueApi";
import type {throttle} from "@antfu/utils";
import type ServiceCartInterface from "../../interfaces/ServiceCartInterface";
import {reactive} from "vue";
import type { Ref, UnwrapNestedRefs } from 'vue';

class Cart{
    protected _cart:Ref<ServiceCartInterface>= ref({})

    public toogleService( service:ServiceData ):this{
        if(this.getGoodByService(service))   delete this._cart.value[service.id];
        else this._cart.value[service.id] = {count:1, service:service}
        return this;
    }

    public add ( service:ServiceData ):this {
        if(this.getGoodByService(service)) this._cart.value[service.id].count++;
        else this._cart.value[service.id] = {count:1, service:service}
        return this;
    };

    public remove ( service:ServiceData ):this {
        const good = this.getGoodByService(service);
        if(good) {
            if(good.count === 1) delete this._cart.value[service.id];
            else this._cart.value[service.id].count--;
        }
        else this._cart.value[service.id] = {count:1, service:service}
        return this;
    };

    public clear():this {
        this._cart.value = {};
        return this;
    }


    public get servicesList():ServiceData[]|null{
        return ( Object.values( this._cart.value ).map((good) => good.service) ) ?? null;
    }

    public get sum():number{
        const sumServices = Object.values(this._cart.value).map((good) =>
                ( good.service.custom_price > 0 ) ? good.service.custom_price * good.count  : good.service.price * good.count )
        return sumServices.reduce((a, b) => a + b, 0);
    }

    public get count():number{
        Object.keys( this._cart.value ).length
        return ( Object.keys( this._cart.value ).length ) ?? 0;
    }

    public get goods():ServiceCartInterface {
        return this._cart.value;
    }




    protected getGoodByService( service:ServiceData ):{count:number, service:ServiceData}|null{
        return (this._cart.value[service.id]) ?? null;
    }

}


export default class BookingService{

    protected _doctor?:DoctorInterface
    protected _slot?:number
    protected _clinic?:ClinicInterface
    protected _services:ServiceData[] = [];
    public Cart:Cart = new Cart();



    public withDoctor( doctor:DoctorInterface):this{
        this._doctor = doctor;
        return this;
    }
    public withSlot(slot:number):this{
        this._slot = slot;
        return this;
    }

    public withWorkingDay(day:number):this{
        this._slot = day;
        return this;
    }

    public withClinic(clinic:ClinicInterface|null):this{
        if(clinic)        this._clinic = clinic;
        return this;
    }

    public withServices(services:ServiceData[]|ServiceData):this{
        if(Array.isArray(services)){
            this._services = services;
        }else this._services = [services];
        return this;
    }

    public addService(service:ServiceData):this{
        this._services.push(service)
        return this;
    }

    public get doctor():DoctorInterface|null{
        return (this._doctor) ?? null;
    }

    public get selectedClinic():ClinicInterface|null{
        return (this._clinic) ?? null;
    }


}
