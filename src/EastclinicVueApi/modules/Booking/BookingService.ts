import type {DoctorInterface, ClinicInterface, ServiceData} from "../../../EastclinicVueApi";
import type {throttle} from "@antfu/utils";


export default class BookingService{

    protected _doctor?:DoctorInterface
    protected _slot?:number
    protected _clinic?:ClinicInterface
    protected _services:ServiceData[] = [];

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
