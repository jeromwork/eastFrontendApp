import type {DoctorInterface, ClinicInterface} from "../EastclinicVueApi";
import type {Ref} from 'vue'
import {computed, ref} from "vue";
import { DoctorsService, ScheduleService, BookingService, ScheduleRequest, Patient} from "../EastclinicVueApi";
import type BookingFormViewProps from "../components/Booking/imterfaces/BookingFormViewProprs";
import { YandexMetrika } from "../composables/useYandexMetrika";
import useCalltouch from "../composables/useCalltouch";
// import {Ecommerce} from "#build/src/EastclinicVueApi/modules/Ecommerce";
import type IScheduleState from '../interfaces/IScheduleState'
import type IClinicsState from "../interfaces/IClinicsState";
import type IBookingState from "../interfaces/IBookingState";

interface DoctorCardInterface{
    workDays: number[] | null;
    workingDay:number|null;
    selectedClinic: ClinicInterface | null;
    showModalServices:boolean;
}



export default class DoctorCardState   implements IScheduleState, IClinicsState, IBookingState{
    protected data: Ref<DoctorCardInterface> = ref({
        workDays: null,
        workingDay: null,

        selectedClinic: null,
        showModalServices:false,

    });
    protected _slots:Ref<number[] | null> = ref(null);
    public selectedSlot:number | null = null; //implements IScheduleState
    public selectedSlotError?:string; //implements IScheduleState
    public selectedClinic:ClinicInterface | null = null; //implements IScheduleState
    public bookingFormViewProps:Ref<BookingFormViewProps| Object> = ref({});//implements IBookingState
    public showBookingSuccessMessage:Ref<boolean> = ref(false); //implements IBookingState
    public showLeaveMessage:Ref<boolean> = ref(false); //implements IBookingState
    public showModalBooking:boolean = false; //implements IBookingState

    protected bookingYAMetrikaGoal = '';
    protected bookingService:BookingService | null = null;  // Adjust the type here
    protected doctor: DoctorInterface | null = null;
    public clinics: Readonly<ClinicInterface[]> | null = null;

    public withDoctor( doctor:DoctorInterface ):this{
        this.doctor = doctor;
        this.initDoctorData(doctor);
        return this
    }

    public withBookingService( bookingService:BookingService ):this{
        this.bookingService = bookingService;
        return this
    }



    protected initDoctorData(doctor:DoctorInterface):this{
        const selectedClinicInit = (new DoctorsService()).clinicWorkingDefault(doctor.id) as ClinicInterface ?? null;
        this.selectedClinic = selectedClinicInit;
        this.clinics = doctor.clinics;

        const workingDay = ScheduleService.nearestWorkDay(doctor.id) as number ?? null
        this.data.value.workingDay = workingDay;

        this._slots.value = computed(() => {
            if (!workingDay || !selectedClinicInit.id) return null;
            const slotsDoctor = ScheduleService.getSlots(selectedClinicInit?.id as number, doctor.id, workingDay as number);
            return slotsDoctor ?? null;
        }).value;
        return this;
    }




    public toogleModalBooking( show:boolean ):this{
        this.setShowModalBooking(show);
        return this;
    }

    public toogleModalServices( show:boolean ):this{
        this.data.value.showModalServices = show;
        return this;
    }

    public toggleBookingLeaveMessage( show:boolean ):this{
        this.showLeaveMessage.value = show;
        return this;
    }


    public toogleBookingSuccessMessage(show:boolean):this{
        this.showBookingSuccessMessage.value = show;
        return this
    }

    public setBookingFormBlocks( viewProps:BookingFormViewProps ):this{
        this.bookingFormViewProps.value = viewProps;
        return this;
    }

    public setSelectedClinic( clinic:ClinicInterface):this{
        this.selectedClinic = clinic;
        //recalc working day
        this.setWorkingDay(ScheduleService.nearestWorkDay(this.Doctor.id, clinic.id) as number ?? null)
        return this;
    }

    public setWorkingDay(day:number|null):this{
        this.data.value.workingDay = day;
        //recalc slots for day
        if (!day || !this.selectedClinic?.id) this._slots.value =  null;
        const slotsDoctor = ScheduleService.getSlots(this.selectedClinic?.id as number, this.Doctor.id, day as number);
        this._slots.value = slotsDoctor ?? null;
        return this;
    }
    public get slots():Readonly<number[]> | null{        return (this._slots.value) ? readonly(this._slots.value) : null;    }
    public setSelectedSlot(slot:number|null):this{
        this.selectedSlot = slot;
        this.selectedSlotError = '';
        this.setBookingFormBlocks({
            showDoctorBlock:true,
            showClinicBlock:true,
            showScheduleBlock:true,})        //settings view booking form
            .toogleModalBooking(true)


        return this;
    }



    public get BookingService():BookingService{
        if(!this.bookingService) throw new Error('Not set BookingService')
        return this.bookingService ;
    }

    public get Doctor():DoctorInterface{
        if(!this.doctor) throw new Error('Not set Doctor')
        return this.doctor;
    }


    public get workDays():number[] | null{
        return computed( () => ScheduleService.workDays(this.Doctor.id, ( this.selectedClinic ) ? this.selectedClinic.id : null)).value
    }
    public get workingDay():number | null{        return this.data.value.workingDay;    }



    public get showModalServices():boolean | null{        return this.data.value.showModalServices;    }
    public set showModalServices( show){        this.data.value.showModalServices = show as boolean;    }



    public async book(){
        //todo #captha_enable
        //todo check fill form


        //if error form, scroll here
        if(!this.selectedSlot) {
            this.selectedSlotError = 'Выберите время для записи';
            return null;
        }


        //check patient
        this.BookingService
            .withDoctor(this.Doctor)
            .withClinic(this.selectedClinic)
            .withSlot(this.selectedSlot);
        const res = await this.BookingService.book()

        // Ecommerce.withDoctor(this.Doctor).purchase();

        if(res?.ok) {
            this.toogleModalBooking(false);
            this.toogleBookingSuccessMessage(true);
            YandexMetrika.reachGoal('booking_done')
            if(this.bookingService && this.bookingService.Cart?.count > 0){
                YandexMetrika.reachGoal('service_booking_done')
            }

            useCalltouch()
                .forPatient(this.bookingService?.Patient as Patient)
                .withTags([this.Doctor.shortFio as string, this.selectedClinic?.node_address as string])
                .booking()

            //clear form data
            this.selectedSlot = null;
            this.selectedSlotError = '';
            this.data.value.workingDay = null;
            this.selectedClinic = null;
            this.bookingService = null; //???


        }else {
            if ( res?.code === 24 || res?.code === 25 ){  //handle busy slot
                this.selectedSlot = null;
                this.selectedSlotError = res.error;
            }
        }



        //todo show success or error message

    }

    protected setShowModalBooking(show:boolean){
        this.showModalBooking = show as boolean;
        console.log(show)
        if(!show){ //if close booking form
            this.selectedSlot = null;
            this.selectedSlotError = '';
            this.data.value.workingDay = null;
        }else  { //if open booking form
            //set goal for yam
            if(this.bookingService && this.bookingService.Cart?.count > 0){
                this.bookingYAMetrikaGoal = 'service_booking_done';
            }


        }
    }

}

