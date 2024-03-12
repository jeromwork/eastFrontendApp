import type {DoctorInterface, ClinicInterface, ServiceData} from "../../../EastclinicVueApi";
import type {throttle} from "@antfu/utils";
import type ServiceCartInterface from "../../interfaces/ServiceCartInterface";
import {reactive} from "vue";
import type { Ref, UnwrapNestedRefs } from 'vue';
import Patient from "./Patient";
import Cart from "./Cart";


interface BookingDataInterface {

    slot : number|null
    workingDay : number|null
    clinic : ClinicInterface|null

}

export default class BookingService{
    protected data:Ref<BookingDataInterface> = ref({slot:null, workingDay:null, clinic:null});
    protected _doctor?:DoctorInterface
    public Cart:Cart = new Cart();
    public Patient:Patient = new Patient()



    public withDoctor( doctor:DoctorInterface):this{
        this._doctor = doctor;
        return this;
    }
    public setWorkingSlot(slot:number):this{
        this.data.value.slot = slot;
        return this;
    }

    public setWorkingDay(day:number|null):this{
        this.data.value.workingDay = day;
        return this;
    }

    public setClinic(clinic:ClinicInterface|null):this{
        if(clinic)        this.data.value.clinic = clinic;
        return this;
    }


    public get doctor():DoctorInterface|null{
        return (this._doctor) ?? null;
    }

    public get selectedClinic():ClinicInterface|null{
        return (this.data.value.clinic) ?? null;
    }

    public get selectedSlot():number|null{
        return this.data.value.slot
    }

    public get selectedWorkDay():number|null{
        return this.data.value.workingDay
    }



}
