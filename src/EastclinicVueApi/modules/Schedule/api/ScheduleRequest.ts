import type RequestAdapterInterface from "../../../interfaces/RequestAdapterInterface";
import type {DoctorInterface} from "../../../index";

type ClinicDoctorDays = {
    date_from?:number; //unix time
    date_to?:number; //unix time
    countDays?:number; //unix time
    doctor:number; //doctor iid
    clinic:number; //clinic iid
}
export default class ScheduleRequest implements RequestAdapterInterface
{
    protected _requestData: { [key: string]: any } = {};
    protected doctors:DoctorInterface[] = [];
    protected dayTo?:number
    protected countDays:number = 30


    //setters


    public with(field: string, value: any):this {
        if (!field) return this;
        this._requestData[field] = value;
        return this;
    }

    public withDoctor(doctor:DoctorInterface):this{
        this.doctors.push(doctor);
        return this;
    }

    public withDayTo():this{

        return this;
    }

    public forCountDays(countDays:number):this{
        this.countDays = countDays;

        return this;
    }

    getRequestData() {
        if(!this._requestData['action'] || !this._requestData['component']) throw new Error( 'Not have necessarily action and component params in request' )

        const clinicDoctorDays = this.buildClinicDoctorDays();
        if(!clinicDoctorDays.length) throw new Error( 'Not have necessarily action and component params in request' )

        return {...this._requestData, clinicDoctorDays}; }


    protected buildClinicDoctorDays():Array<ClinicDoctorDays>{
        if (!this.doctors.length) throw new Error( 'Not have necessarily action and component params in request' )
        if (!this.dayTo && !this.countDays) throw new Error( 'Not have date settings for clinicDoctorDays' )
        const clinicDoctorDays:ClinicDoctorDays[] = [];
        const nowDayUnix = 0;
        for ( const d in this.doctors ){
            const doctor = this.doctors[d];
            if(doctor.clinics?.length) doctor.clinics.map((clinic) => {
                clinicDoctorDays.push({clinic:clinic.id, doctor:doctor.id, countDays:this.countDays})
            })
        }
        return clinicDoctorDays;
    }

}

