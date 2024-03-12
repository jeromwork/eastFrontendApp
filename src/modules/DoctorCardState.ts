import type {DoctorInterface, ClinicInterface} from "../EastclinicVueApi";
import type {Ref} from 'vue'
import {computed, ref} from "vue";
import { DoctorsService, ScheduleService, BookingService} from "../EastclinicVueApi";
import type BookingFormViewProps from "../components/Booking/imterfaces/BookingFormViewProprs";

interface DoctorCardInterface {
    BookingService: BookingService | null;  // Adjust the type here

    Doctor: DoctorInterface | null;

    workDays: number[] | null;
    workingDay:number|null;
    slots: number[] | null;
    selectedSlot:number|null;
    selectedClinic: ClinicInterface | null;

    showModalBooking:boolean;
    showModalServices:boolean;
    showLeaveMessage:boolean;
    bookingFormViewProps:BookingFormViewProps | null;
}



export default class DoctorCardState {
    protected data: Ref<DoctorCardInterface> = ref({
        BookingService: null,  // or provide a valid instance of BookingService
        Doctor: null,

        slots: null,
        selectedSlot:null,

        workDays: null,
        workingDay: null,

        clinic: null,
        selectedClinic: null,


        showModalBooking:false,
        showModalServices:false,
        showLeaveMessage:false,
        bookingFormViewProps:null,
    });



    public withDoctor( doctor:DoctorInterface ):this{
        this.data.value.Doctor = doctor;
        this.initDoctorData(doctor);
        return this
    }

    public withBookingService( bookingService:BookingService ):this{
        this.data.value.BookingService = bookingService;
        return this
    }



    protected initDoctorData(doctor:DoctorInterface):this{
        const selectedClinicInit = (new DoctorsService()).clinicWorkingDefault(doctor.id) as ClinicInterface ?? null;
        this.data.value.selectedClinic = selectedClinicInit;

        this.data.value.workDays = computed( () => ScheduleService.workDays(doctor.id, ( selectedClinicInit ) ? selectedClinicInit.id : null)).value
        const workingDay = ScheduleService.nearestWorkDayForDoctor(doctor.id) as number ?? null
        this.data.value.workingDay = workingDay;

        this.data.value.slots = computed(() => {
            if (!workingDay || !selectedClinicInit.id) return null;
            const slotsDoctor = ScheduleService.getSlots(selectedClinicInit?.id as number, doctor.id, workingDay as number);
            return slotsDoctor ?? null;
        }).value;
        return this;
    }



    public toogleModalBooking( show:boolean ):this{
        this.data.value.showModalBooking = show;
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

    public setBookingFormBlocks( viewProps:BookingFormViewProps ):this{
        this.data.value.bookingFormViewProps = viewProps;
        return this;
    }

    public setSelectedClinic( clinic:ClinicInterface):this{
        this.data.value.selectedClinic = clinic;
        return this;
    }

    public setWorkingDay(day:number|null):this{
        this.data.value.workingDay = day;
        return this;
    }

    public setSelectedSlot(slot:number|null):this{
        this.data.value.selectedSlot = slot;
        return this;
    }



    public get BookingService():BookingService{
        if(!this.data.value.BookingService) throw new Error('Not set BookingService')
        return this.data.value.BookingService ;
    }

    public get Doctor():DoctorInterface{
        if(!this.data.value.Doctor) throw new Error('Not set Doctor')
        return this.data.value.Doctor;
    }


    public get workDays():number[] | null{        return this.data.value.workDays;    }
    public get workingDay():number | null{        return this.data.value.workingDay;    }
    public get slots():Readonly<number[]> | null{        return (this.data.value.slots) ? readonly(this.data.value.slots) : null;    }

    public get selectedClinic():ClinicInterface | null{        return this.data.value.selectedClinic;    }

    public get showModalBooking():boolean | null{        return this.data.value.showModalBooking;    }
    public get showModalServices():boolean | null{        return this.data.value.showModalServices;    }
    public get showLeaveMessage():boolean | null{        return this.data.value.showLeaveMessage;    }
    public get bookingFormViewProps():BookingFormViewProps | null{        return this.data.value.bookingFormViewProps;    }


}

