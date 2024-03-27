import type {Ref} from "vue";
import usePhoneFormat from "../../util/usePhoneFormat";

interface PatientInterface{
    setPhone(phone:string):this;
    setFio(phone:string):this;
    fio:string;
    phone:string;
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
    public set phone(phone:string){
        this.patientData.value.phone = phone;
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


    public checkFioResume():boolean{
        this.checkFio(this.fio)
        if ( this.fio.replace(/[^аА-яЯaA-zZ]/g, '').length === 0 ) this.patientData.value.fioError =  'Пожалуйста, введите имя';
        return !(this.patientData.value.fioError);
    }
    public checkFio( fio:string ):boolean{
        this.patientData.value.fioError = '';
        if(!fio || fio === '' || !fio.match(/[аА-яЯaA-zZ]/gm)) {
            this.patientData.value.fioError = 'Пожалуйста, введите имя';
        }
        if(fio.length > 51) this.patientData.value.fioError = 'Введите более короткое имя';
        if(!!fio.match(/[аА-яЯaA-zZ]+ [аА-яЯaA-zZ]+/gm)) this.patientData.value.fioError = 'Пожалуйста, заполните фамилию'
        return !!(this.patientData.value.fioError);
    }
    public setFio( fio:string ):this{
        //todo check string
        this.checkFio(fio);
        this.patientData.value.fio = fio.replace(/[^аА-яЯaA-zZ]/g, '');

        return this;
    }


    public checkPhoneResume():boolean{
        this.checkPhone(this.phone)
        this.patientData.value.phoneError = ''
        if (this.phone.replace(/[^0-9]/g, '').length !== 11) this.patientData.value.phoneError =  'Пожалуйста, введите корректный телефон';
        console.log(this.patientData.value.phoneError)
        return !(this.patientData.value.phoneError);
    }
    public checkPhone( phone:string ):boolean{

        let rawPhone = phone;
        const dirtySymbols = rawPhone.replace(/[+0-9()-]/g, '')
        if (dirtySymbols.length) this.patientData.value.phoneError =  'Пожалуйста, введите корректный телефон';
        phone = usePhoneFormat(phone);
        this.patientData.value.phoneError = '';
        if( !phone || phone === '+7(' ) this.patientData.value.phoneError =  'Пожалуйста, введите корректный телефон';
        if( phone.length > 17 ) this.patientData.value.phoneError = 'Пожалуйста, введите корректный телефон';


        return !!(this.patientData.value.phoneError);
    }
    public setPhone( phone:string ){
        // this.checkPhone(phone);
        // this.patientData.value.phone =  usePhoneFormat(phone);

        this.patientData.value.phone = phone;
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
            //this.scroll('fio');
            this.patientData.value.fioError
            return;
        }

    }

    // protected scroll(id:string) {
    //     const el = (window?.document?.getElementById(id))
    //     if(el) el.scrollIntoView({ behavior: "smooth" });
    // }


}
export default Patient;