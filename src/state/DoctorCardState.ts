import type {DoctorInterface, ClinicInterface} from "../EastclinicVueApi";
import type {Ref} from 'vue'
import {computed, ref} from "vue";
import { DoctorsService, ScheduleService, BookingService, ScheduleRequest} from "../EastclinicVueApi";
import type BookingFormViewProps from "../components/Booking/imterfaces/BookingFormViewProprs";
import {Ecommerce} from "#build/src/EastclinicVueApi/modules/Ecommerce";

interface DoctorCardInterface {
    workDays: number[] | null;
    workingDay:number|null;
    slots: number[] | null;
    selectedSlot:number|null;
    selectedSlotError?:string;
    selectedClinic: ClinicInterface | null;

    showModalBooking:boolean;
    showModalServices:boolean;
    showLeaveMessage:boolean;
    showBookingScheduleBlock:boolean;
    showBookingSuccessMessage:boolean;
    bookingFormViewProps:BookingFormViewProps | null;
}



export default class DoctorCardState {
    protected data: Ref<DoctorCardInterface> = ref({
        slots: null,
        selectedSlot:null,

        workDays: null,
        workingDay: null,

        selectedClinic: null,


        showModalBooking:false,
        showModalServices:false,
        showLeaveMessage:false,
        showBookingScheduleBlock:false,
        showBookingSuccessMessage:false,
        bookingFormViewProps:null,


    });
    protected bookingService:BookingService | null = null;  // Adjust the type here
    protected doctor: DoctorInterface | null = null;


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
        this.data.value.selectedClinic = selectedClinicInit;


        const workingDay = ScheduleService.nearestWorkDay(doctor.id) as number ?? null
        this.data.value.workingDay = workingDay;

        this.data.value.slots = computed(() => {
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
        this.data.value.showLeaveMessage = show;
        return this;
    }

    public toogleBookingScheduleBlock(show:boolean):this{
        this.data.value.showBookingScheduleBlock = show;
        return this
    }

    public toogleBookingSuccessMessage(show:boolean):this{
        this.data.value.showBookingSuccessMessage = show;
        return this
    }

    public setBookingFormBlocks( viewProps:BookingFormViewProps ):this{
        this.data.value.bookingFormViewProps = viewProps;
        return this;
    }

    public setSelectedClinic( clinic:ClinicInterface):this{
        this.data.value.selectedClinic = clinic;
        //recalc working day
        this.setWorkingDay(ScheduleService.nearestWorkDay(this.Doctor.id, clinic.id) as number ?? null)
        return this;
    }

    public setWorkingDay(day:number|null):this{
        this.data.value.workingDay = day;
        //recalc slots for day
        if (!day || !this.selectedClinic?.id) this.data.value.slots =  null;
        const slotsDoctor = ScheduleService.getSlots(this.selectedClinic?.id as number, this.Doctor.id, day as number);
        this.data.value.slots = slotsDoctor ?? null;
        return this;
    }

    public setSelectedSlot(slot:number|null):this{
        this.data.value.selectedSlot = slot;
        this.data.value.selectedSlotError = '';
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

    public get slots():Readonly<number[]> | null{        return (this.data.value.slots) ? readonly(this.data.value.slots) : null;    }

    public get selectedSlot():number | null{        return this.data.value.selectedSlot;    }
    public get selectedSlotError():string | undefined{        return this.data.value.selectedSlotError;    }


    public get selectedClinic():ClinicInterface | null{
        return this.data.value.selectedClinic;    }

    public get showModalBooking():boolean | null{        return this.data.value.showModalBooking;    }
    public set showModalBooking( show){     this.setShowModalBooking(!!(show));   }
    public get showModalServices():boolean | null{        return this.data.value.showModalServices;    }
    public set showModalServices( show){        this.data.value.showModalServices = show as boolean;    }
    public get showBookingScheduleBlock():boolean | null{        return this.data.value.showBookingScheduleBlock;    }
    // public set showBookingScheduleBlock( show){        this.data.value.showBookingScheduleBlock = show as boolean;    }

    public get showBookingSuccessMessage():boolean | null{        return this.data.value.showBookingSuccessMessage;    }
    public set showBookingSuccessMessage( show){
        this.data.value.showBookingSuccessMessage = show as boolean;
    }

    public get showLeaveMessage():boolean | null{        return this.data.value.showLeaveMessage;    }
    public get bookingFormViewProps():BookingFormViewProps | null{        return this.data.value.bookingFormViewProps;    }




    public async book(){
        //todo #captha_enable
        //todo check fill form

        //if error form, scroll here
        if(!this.selectedSlot) {
            this.data.value.selectedSlotError = 'Выберите время для записи';
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
            //clear form data
            this.data.value.selectedSlot = null;
            this.data.value.selectedSlotError = '';
            this.data.value.workingDay = null;
            this.data.value.selectedClinic = null;
            this.bookingService = null;

        }else {
            if ( res?.code === 24 || res?.code === 25 ){  //handle busy slot
                this.data.value.selectedSlot = null;
                this.data.value.selectedSlotError = res.error;
            }
        }



        //todo show success or error message

    }

    protected setShowModalBooking(show:boolean){
        this.data.value.showModalBooking = show as boolean;
        if(!show){
            this.data.value.selectedSlot = null;
            this.data.value.selectedSlotError = '';
            this.data.value.workingDay = null;
        }else  this.data.value.showBookingScheduleBlock = false;
    }

}

