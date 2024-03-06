import type {ClinicInterface, DoctorInterface} from "../../../EastclinicVueApi";
import type {Ref} from "vue";

export default interface DoctorCardViewProps {
    doctor: DoctorInterface

//clinics
    clinicWorkingSelected: ClinicInterface | null

//calendar
    workDays: number[]|Ref<number[]>|null
    currentWorkingDay: number | null,

//slots
    slots: number[]|null,
    selectedSlot: number | null,

}