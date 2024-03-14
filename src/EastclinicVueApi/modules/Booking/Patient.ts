import type {Ref} from "vue";
import usePhoneCheck from "../../../composables/usePhoneCheck";

interface PatientInterface{
    setPhone(phone:string):this;
    setFio(phone:string):this;
}

class Patient implements PatientInterface{
    protected patientData:Ref = ref({fio:'', phone:'+7(', fioError:'', phoneError:'', surname:'', patientName:'', refs:{} })
    // protected name:string = ''
    // protected surname:string = '';
    protected lastname:string = '';


    public get fio(){
        return this.patientData.value.fio
    }

    public get phone(){
        return this.patientData.value.phone
    }

    public get isFilledPhone():boolean{
        return (this.patientData.value?.phone.length > 5)
    }

    public get phoneError():string{
        return this.patientData.value.phoneError;
    }
    public get fioError():string{
        return this.patientData.value.fioError;
    }

    public setRef(key:string, refSource:Ref):this{

        return this;

    }

    protected checkFio( fio:string ):string{
        if(!fio || !!fio.match(/[аА-яЯaA-zZ]/gm)) return 'Пожалуйста, введите имя';
        if(fio.length < 51) return 'Введите более короткое имя';
        if(!!fio.match(/[аА-яЯaA-zZ]+ [аА-яЯaA-zZ]+/gm)) 'Пожалуйста, заполните фамилию'
        return '';
    }
    public setFio( fio:string ):this{
        //todo check string

        const fioError = this.checkFio(fio);
        if( fioError ) {
            this.patientData.value.fioError = fioError;
            return this;
        }
        this.patientData.value.fio = fio;
        return this;
    }


    protected checkPhone( phone:string ):string{
        if( !phone ) return 'Пожалуйста, введите телефон';
        if( phone.length > 17 ) return 'Пожалуйста, введите корректный телефон';
        return '';
    }
    public setPhone( phone:string ){
        //todo check string by mask
        const phoneError = this.checkPhone(phone);
        phone = usePhoneCheck(phone);

        console.log(phone)
        if(!phone) phone = '+7('

        this.patientData.value.phone =  phone;
        this.patientData.value.phoneError = phoneError;


        return this;
    }


    public get patientName():string{
        return this.patientData.value.patientName;
    }

    public get surname():string{
        return this.patientData.value.surname;
    }

    public validate(){
        if(!this.fio) {
            this.scroll('fio');
            this.patientData.value.fioError
            return;
        }

    }

    protected scroll(id:string) {
        const el = (window?.document?.getElementById(id))
        if(el) el.scrollIntoView({ behavior: "smooth" });
    }


}
export default Patient;