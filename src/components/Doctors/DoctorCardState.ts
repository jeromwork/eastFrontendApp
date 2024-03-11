import type {DoctorInterface, ClinicInterface} from "../../EastclinicVueApi";
import type {Ref} from 'vue'
import {computed, ref} from "vue";
import { DoctorsService, ScheduleService} from "../../EastclinicVueApi";

interface DoctorCardInterface extends DoctorInterface {
    workDays:Readonly<Ref<number[]|null>>




}



export default class DoctorCardState{

    public doctor:Ref<DoctorInterface|null> = ref(null)
    public workDays:Ref<number[]|null>
    public clinicWorkingSelected:Ref<ClinicInterface | null>
    public currentWorkingDay:Ref<number | null>
    public slots:number[] | null


    constructor(doctor:DoctorInterface) {
        this.doctor.value = doctor
        //init ref data for doctor
        this.clinicWorkingSelected = ref( (new DoctorsService()).clinicWorkingDefault(doctor.id) as ClinicInterface ?? null);

        this.workDays = ref(computed( () => ScheduleService.workDays(doctor.id, (this.clinicWorkingSelected.value) ? this.clinicWorkingSelected.value?.id : null)).value)

        this.currentWorkingDay = ref(    ScheduleService.nearestWorkDayForDoctor(doctor.id) as number ?? null);

        this.slots = computed(() => {
            if (!this.currentWorkingDay.value || !this.clinicWorkingSelected?.value?.id) return null;
            const slotsDoctor = ScheduleService.getSlots(this.clinicWorkingSelected?.value?.id as number, doctor.id, this.currentWorkingDay.value as number);
            return slotsDoctor ?? null;
        }).value;

    }



    // public get Doctor():DoctorCardInterface{
    //     return this.doctor.value as DoctorCardInterface;
    // }

}

