import type {DoctorInterface, ClinicInterface, ServiceData} from "../../../EastclinicVueApi";
import type {throttle} from "@antfu/utils";
import type ServiceCartInterface from "../../interfaces/ServiceCartInterface";
import {reactive} from "vue";
import type { Ref, UnwrapNestedRefs } from 'vue';
import Patient from "./Patient";
import Cart from "./Cart";
import type BookingResponseInterface from "./api/BookingResponseInterface";
import BookingApi from "./api/BookingApi";
import {ScheduleRequest, ScheduleService} from "../../../EastclinicVueApi";


interface BookingDataInterface {

    slot : number|null
    clinic : ClinicInterface|null
    doctor : DoctorInterface|null
    sessionId:string|null
}

export default class BookingService{
    protected data:Ref<BookingDataInterface> = ref({slot:null, clinic:null, doctor:null, sessionId:null});
    protected _doctor?:DoctorInterface
    public Cart:Cart = new Cart();
    public Patient:Patient = new Patient()



    public withDoctor( doctor:DoctorInterface):this{
        this.data.value.doctor = doctor;
        return this;
    }

    public withClinic(clinic:ClinicInterface|null):this{
        if(clinic)        this.data.value.clinic = clinic;
        return this;
    }

    public withSlot(slot:number|null):this{
        this.data.value.slot = slot;
        return this;
    }

    public withSessionId(sessionId:string):this{
        this.data.value.sessionId = sessionId;
        return this;
    }


    public get doctor():DoctorInterface|null{
        return ( this.data.value.doctor) ?? null;
    }

    public get clinic():ClinicInterface|null{
        return (this.data.value.clinic) ?? null;
    }

    public get slot():number|null{
        return (this.data.value.slot) ?? null;
    }



    public async book(){
        //this errors check early
        // if (!this.doctor) throw new Error('Not set doctor to booking')
        // if (!this.selectedClinic) throw new Error('Not set clinic to booking')
        // if(!this.Patient.patientName) throw new Error('Not set patient name to booking')
        if(!this.Patient.checkFioResume() || !this.Patient.checkPhoneResume() )  return null;
        if (!this.doctor) return null;

        const bookData:BookingResponseInterface = {
            key : 'a56f164d50be6d6164c6117a6b75cafe93cc3d43dc698861bdda75ab1d23809d',
            doctor: ( this.doctor?.id ) ?? '',
            clinic: ( this.clinic?.id ) ?? '',
            slot:   ( this.slot ) ?? '',
            name: this.Patient.fio,
            // surname: this.Patient.surname,
            phone:this.Patient.phone
        };


        if(this.data.value.sessionId){
            bookData.sessionId = this.data.value.sessionId;
        }

        if(this.doctor?.is_cabinet){
            bookData.onlyMessages = true;
        }
        const res = await (new BookingApi).book(bookData);
        if (!res.ok){
            if ( res?.code === 24 || res?.code === 25 ){  //handle busy slot
                await ScheduleService.getSchedulesFromServer(new ScheduleRequest().withDoctor(this.doctor).forCountDays(30))
            }
        }
        return res;



    }


}
