import type {ClinicInterface, DoctorInterface, ServiceData} from "../../../EastclinicVueApi";
import type {Ref} from "vue";
import type {ServiceCartInterface} from "../../../EastclinicVueApi";

export default interface DoctorCardViewProps {
    doctor: DoctorInterface

//clinics
    clinicWorkingSelected: ClinicInterface | null

//calendar
    workDays: number[]|Ref<number[]>|null
    currentWorkingDay: number | null,

//slots
    slots: number[]|null;
    selectedSlot: number | null;

//services list
    servicesInCart?: ServiceCartInterface | null;

}