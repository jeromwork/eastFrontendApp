import type {DoctorInterface, ClinicInterface} from "../EastclinicVueApi";
import {Patient} from "../EastclinicVueApi";
import useGetParametersBuilder from "./UseGetParametersBuilder";


export class CalltouchClass {
    protected tags:string[] = [];
    protected doctor?:DoctorInterface;
    protected clinic?:ClinicInterface;
    protected patient?:Patient;
    public booking():boolean{
        if(!this.patient || !this.patient.fio || !this.patient.phone) throw new Error('Not set patient');
        if(process?.browser) {
            const data = {
                fio: this.patient.fio,
                phoneNumber: this.patient.phone,
                subject: 'booking',
                tags: ( this.tags.length ) ? this.tags.join(',') : '',
                requestUrl: window.location.href,
                // @ts-ignore
                sessionId: (window.call_value) ? window.call_value : '0',
            }
            this.fetch('https://api.calltouch.ru/calls-service/RestAPI/requests/1145/register/', data)
            return true;
        }
        return false;
    }

    withDoctor(doctor:DoctorInterface):this{
        this.doctor = doctor;
        return this;
    }

    withClinic(clinic:ClinicInterface):this{
        this.clinic = clinic;
        return this;
    }

    forPatient(patient:Patient):this{
        this.patient = patient;
        return this;
    }




    public withTags(tags:string[]|string):this{
        if(Array.isArray(tags)) tags.map((tag) => {this.tags.push('tag')})
        else this.tags.push(tags)
        return this;
    }
    protected async fetch(url:string, options:object){
        const response = await fetch(useGetParametersBuilder(url, options), {method: 'GET',});
        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }
        return  await response.json();
    }


}

export const useCalltouch = ():CalltouchClass => {
return new CalltouchClass();


}

export default useCalltouch