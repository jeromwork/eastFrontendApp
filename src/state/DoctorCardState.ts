import type {DoctorInterface, ClinicInterface, IBookingRequest} from "../EastclinicVueApi";
import type {Ref} from 'vue'
import {computed, ref} from "vue";
import {
    DoctorsService,
    ScheduleService,
    BookingService,
    ScheduleRequest,
    Patient
} from "../EastclinicVueApi";
import type BookingFormViewProps from "../components/Booking/imterfaces/BookingFormViewProprs";
import { YandexMetrika } from "../composables/useYandexMetrika";
import useCalltouch from "../composables/useCalltouch";
// import {Ecommerce} from "#build/src/EastclinicVueApi/modules/Ecommerce";
import type IScheduleState from '../interfaces/IScheduleState'
import type IClinicsState from "../interfaces/IClinicsState";
import type IBookingState from "../interfaces/IBookingState";
import BookingState from "../state/BookingState";
import ScheduleState from "../state/ScheduleState";

interface DoctorCardInterface{
    workDays: number[] | null;
    workingDay:number|null;
    showModalServices:boolean;
}



export default class DoctorCardState   implements IClinicsState{
    protected data: Ref<DoctorCardInterface> = ref({
        workDays: null,
        workingDay: null,

        showModalServices:false,

    });


    protected _selectedClinic:Ref<ClinicInterface | null> = ref(null); //implements IScheduleState

    public bookingState:BookingState = new BookingState();
    public scheduleState:ScheduleState = new ScheduleState();


    protected bookingYAMetrikaGoal = '';
    protected bookingService:BookingService | null = null;  // Adjust the type here
    protected doctor: DoctorInterface | null = null;
    public clinics: Readonly<ClinicInterface[]> | null = null;

    constructor() {
//set callback during selected slot
        this.scheduleState.selectedSlotCallback = this.selectedSlotCallback.bind(this );
        this.bookingState.book = this.book.bind(this)

    }

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

        this.scheduleState.slots = computed(() => {
            if (!workingDay || !selectedClinicInit.id) return null;
            const slotsDoctor = ScheduleService.getSlots(selectedClinicInit?.id as number, doctor.id, workingDay as number);
            return slotsDoctor ?? null;
        }).value;
        return this;
    }






    public toogleModalServices( show:boolean ):this{
        this.data.value.showModalServices = show;
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
        if (!day || !this.selectedClinic?.id) this.scheduleState.slots =  null;
        const slotsDoctor = ScheduleService.getSlots(this.selectedClinic?.id as number, this.Doctor.id, day as number);
        this.scheduleState.slots = slotsDoctor ?? null;
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


    public get selectedClinic():ClinicInterface | null{        return this._selectedClinic.value;    }
    public set selectedClinic( clinic:ClinicInterface|null ){        this._selectedClinic.value = clinic;    }

//this method replace bookingService.book()
    public async book():Promise<IBookingRequest|undefined>{
        //todo #captha_enable
        //todo check fill form
        //check patient
        if(!this.bookingState.Patient.checkFioResume() || !this.bookingState.Patient.checkPhoneResume() )  return ;

        //if error form, scroll here
        if(!this.scheduleState.selectedSlot) {
            this.scheduleState.selectedSlotError = 'Выберите время для записи';
            return;
        }


        this.BookingService
            .withDoctor(this.Doctor)
            .withClinic(this.selectedClinic)
            .withSlot(this.scheduleState.selectedSlot)
            .withPatient(this.bookingState.Patient)

        const res = await this.BookingService.book()

        // Ecommerce.withDoctor(this.Doctor).purchase();

        if(res?.ok) {
            this.toogleModalBooking(false);
            if(this.BookingService.Cart?.count > 0){
                YandexMetrika.reachGoal('service_booking_done')
            }

            useCalltouch()
                .forPatient(this.bookingService?.Patient as Patient)
                .withTags([this.Doctor.shortFio as string, this.selectedClinic?.node_address as string])
                .booking()

            //clear form data
            this.scheduleState.selectedSlot = null;
            this.scheduleState.selectedSlotError = '';
            this.data.value.workingDay = null;
            this.selectedClinic = null;
            this.bookingService = new BookingService(); //???


        }else {
            if ( res?.code === 24 || res?.code === 25 ){  //handle busy slot
                this.scheduleState.selectedSlot = null;
                this.scheduleState.selectedSlotError = res?.error as string;
                console.log(111111111111)
                await ScheduleService.getSchedulesFromServer(new ScheduleRequest().withDoctor(this.Doctor).forCountDays(30))
            }else {
                if (res?.error){
                    this.bookingState.errorText = res.error;
                }
            }

        }

        return res;
        //todo show success or error message

    }

    public toogleModalBooking( show:boolean ):this{
        this.bookingState.showModalBooking = show as boolean;
        if(!show){ //if close booking form
            this.scheduleState.selectedSlot = null;
            this.scheduleState.selectedSlotError = '';
            this.data.value.workingDay = null;
        }else  { //if open booking form
            //set goal for yam
            if(this.bookingService && this.bookingService.Cart?.count > 0){
                this.bookingYAMetrikaGoal = 'service_booking_done';
            }


        }
        return this;
    }

    protected selectedSlotCallback ( slot:number){
        this.bookingState.setBookingFormBlocks({
            showDoctorBlock:true,
            showClinicBlock:true,
            showScheduleBlock:true})        //settings view booking form
        this.toogleModalBooking(true)

    }

}

