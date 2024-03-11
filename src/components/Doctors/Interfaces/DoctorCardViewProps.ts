import type {ClinicInterface, DoctorInterface, ServiceData} from "../../../EastclinicVueApi";
import type {Ref} from "vue";
import type {ServiceCartInterface} from "../../../EastclinicVueApi";

export default interface DoctorCardViewProps {
    doctor: DoctorInterface


//services list
    servicesInCart?: ServiceCartInterface | null;

}