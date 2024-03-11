import type {Ref} from "vue";
import usePhoneCheck from "../../../composables/usePhoneCheck";

interface PatientInterface{
    setPhone(phone:string):this;
    setFio(phone:string):this;
}

class Patient implements PatientInterface{
    protected patientData:Ref = ref({fio:'', phone:'', fioError:'', phoneError:'' })
    protected name:string = ''
    protected surname:string = '';
    protected lastname:string = '';


    public get fio(){
        return this.patientData.value.fio
    }

    public get phone(){
        return this.patientData.value.phone
    }

    public get phoneError():string{
        return this.patientData.value.phoneError;
    }
    public get fioError():string{
        return this.patientData.value.fioError;
    }

    public setFio( fio:string ):this{
        //todo check string
        if(!fio) {
            this.patientData.value.fioError = 'Error';
            return this;
        }
        this.patientData.value.fio = fio;
        return this;
    }

    public setPhone( phone:string ){
        //todo check string by mask
        phone = usePhoneCheck(phone);
        if(!phone) {
            this.patientData.value.phoneError = 'Error';
            return this;
        }
        this.patientData.value.phone = phone;
        return this;
    }



}
export default Patient;