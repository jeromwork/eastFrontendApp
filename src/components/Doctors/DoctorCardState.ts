import type {DoctorInterface, ClinicInterface} from "../../EastclinicVueApi";
import type {Ref} from 'vue'
import {computed, ref} from "vue";
import { DoctorsService, ScheduleService} from "../../EastclinicVueApi";
import type BookingFormViewProps from "../../components/Booking/imterfaces/BookingFormViewProprs";

interface DoctorCardInterface extends DoctorInterface {
    workDays:Readonly<Ref<number[]|null>>




}



export default class DoctorCardState{

    public doctor:Ref<DoctorInterface|null> = ref(null)
    public workDays:Ref<number[]|null>
    public selectedClinic:Ref<ClinicInterface | null>
    public currentWorkingDay:Ref<number | null>
    public showModalBooking:Ref<boolean> = ref(false)
    public showModalServices:Ref<boolean> = ref(false)
    public slots:number[] | null
    public bookingFormViewProps: Ref<BookingFormViewProps | null> = ref(null)


    constructor(doctor:DoctorInterface) {
        this.doctor.value = doctor
        //init ref data for doctor
        this.selectedClinic = ref( (new DoctorsService()).clinicWorkingDefault(doctor.id) as ClinicInterface ?? null);

        this.workDays = ref(computed( () => ScheduleService.workDays(doctor.id, (this.selectedClinic.value) ? this.selectedClinic.value?.id : null)).value)

        this.currentWorkingDay = ref(    ScheduleService.nearestWorkDayForDoctor(doctor.id) as number ?? null);

        this.slots = computed(() => {
            if (!this.currentWorkingDay.value || !this.selectedClinic?.value?.id) return null;
            const slotsDoctor = ScheduleService.getSlots(this.selectedClinic?.value?.id as number, doctor.id, this.currentWorkingDay.value as number);
            return slotsDoctor ?? null;
        }).value;





    }



    // public get Doctor():DoctorCardInterface{
    //     return this.doctor.value as DoctorCardInterface;
    // }

    public toogleModalBooking( show:boolean ):this{
        this.showModalBooking.value = show;
        return this;
    }

    public toogleModalServices( show:boolean ):this{
        this.showModalServices.value = show;
        return this;
    }

    public toggleBookingLeaveMessage( show:boolean ):this{
        this.showModalServices.value = show;
        return this;
    }

    public setBookingFormBlocks( viewProps:BookingFormViewProps ):this{
        this.bookingFormViewProps.value = viewProps;

        return this;
    }

    public setSelectedClinic( clinic:ClinicInterface):this{
        this.selectedClinic.value = clinic;
        return this;
    }



}

