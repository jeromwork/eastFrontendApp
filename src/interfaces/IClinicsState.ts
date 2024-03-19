import type {ClinicInterface} from "../EastclinicVueApi";

export default interface IClinicsState{
    clinics: Readonly<ClinicInterface[]> | null;
    selectedClinic: ClinicInterface | null;
    setSelectedClinic( clinic:ClinicInterface):this
}
