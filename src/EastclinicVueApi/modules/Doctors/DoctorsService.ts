
import {computed, reactive, ref, toRaw} from "vue";
import type {Ref } from "vue";
import DoctorsApi from './api/DoctorsApi';
import DoctorsModxApi from './api/DoctorsModxApi';
import MultiStateManager from "../../util/MultiStateManager";//probably to use one state manage for many services - its global state
import type DoctorsRequestInterface from "./api/DoctorsRequest";
import  DoctorsRequest from "./api/DoctorsRequest";
import StateManager from "../../util/StateManager";
import type ApiDoctorsResponseInterface from "./api/ResponceInterfaces/ApiDoctorsResponseInterface";
import type DefaultState from "../../util/DefaultState";
import scheduleService from '../Schedule/ScheduleService'
import type {ClinicInterface} from "../../index";
import type {DoctorInterface} from "../../index";
import ScheduleService from "../Schedule/ScheduleService";
import { ClinicsService } from "../../index";
import type { ContentInterface, ServiceData }  from "../../index";


const globalMultiState = new MultiStateManager();
export default class DoctorsService{
    private state: DefaultState;
    private stateName: string = 'default';

    constructor(stateName:string = 'default', state?: StateManager) {
        if(state){
            this.state = state;
        }else{
            this.state = globalMultiState;
        }
        this.stateName = stateName;

    }
    async getItemsFromServer(request:DoctorsRequest){

        let response;
        //use modx, add modx request data
        request.with('action', 'doctors/getDoctorsMultiList').with('component', 'health')

        if(!request.component || !request.action ){
            throw new Error('Error modx request data for get doctors');
        }
        response = await (new DoctorsModxApi).get(request.getRequestData() as DoctorsRequest) as ApiDoctorsResponseInterface;
        // response = await (new DoctorsApi).get(request.getRequestData()) as ApiDoctorsResponseInterface;

//todo add to state info type doctor page: list, single doctor, dismiss doctor from server
        if(response.doctors && response.doctors.length === 1){
            this.state.set('typeDoctorPage', 'single');
        }else {
            this.state.set('typeDoctorPage', 'list');
        }

        let doctors = this.addSpecialsString(response.doctors)
        doctors = this.addPhoto120x120(doctors);
        doctors = this.addFavoriteService(doctors);
        doctors = this.addClinicsForDoctors(doctors);
        doctors = this.addClinicWorkingSelected(doctors);
        doctors = this.addShortFio(doctors);


        this.state.setItems(doctors);

    // for legacy alg, schedules init in doctors request
        scheduleService.setSchedules((response.schedule) ?? [] );


    }
    items(condition?:any) {
        return this.state.getItems();
    };

    count() {
        // return this.state.count();
    };

    typeDoctorPage(){
        return this.state.get('typeDoctorPage');
    }


    public clinicWorkingDefault(doctorId:number):ClinicInterface|null{
        return computed(() => {
            const doctor =  this.state.getItem( doctorId ) as DoctorInterface;

            if(!doctor || !doctor.filials) return null;
            //get current clinic from url
            if( ClinicsService.currentClinic ) return ClinicsService.currentClinic;

            //get doctors schedule
            const schedule = ScheduleService.getScheduleForDoctor(doctorId)
            if( !schedule?.[0] ) return null;
            return (ClinicsService.getClinic(schedule[0].clinicId))?? null
        }).value

        }

    protected addSpecialsString(doctors:DoctorInterface[]):DoctorInterface[]{
        for (const d in doctors){
            const doctorInfo = doctors[d];
            let specs = '';
            if (doctorInfo.main_specials) {
                specs +=  doctorInfo.main_specials.map(special => special.name).join(' · ');
            }
            if (doctorInfo.specials_of_service) {
                specs += doctorInfo.specials_of_service.map(special => special.name).join(' · ');
            }
            doctors[d].specials = specs;
        }

        return doctors;
    }

    protected addPhoto120x120(doctors:DoctorInterface[]):DoctorInterface[]{
        for (const d in doctors){
            const doctorInfo = doctors[d];
            let photo120x120 = null;
                if ( doctorInfo.content ){
                    for (const i in doctorInfo.content){
                        const img = doctorInfo.content[i]
                        if(img.type === '120x120' && img.typeFile === 'image') photo120x120 =  img;
                    }
                    photo120x120 = { id : null, type:'120x120', typeFile:"image", url:doctorInfo.photos['120x120'][0] } as ContentInterface;
                } else {
                    photo120x120 =  { id : null, type:'120x120', typeFile:"image", url:'/images/photo_soon.png' } as ContentInterface;
                }
            doctors[d].photo120x120 = photo120x120  as ContentInterface;
        }

        return doctors;
    }

    protected addFavoriteService(doctors:DoctorInterface[]):DoctorInterface[]{
        for (const d in doctors) {
            const doctorInfo = doctors[d];
            doctors[d].favoriteService = computed(() => {
                let mainService = (doctorInfo.choosen_service_data?.[0]) ?? null
                if(!mainService && doctorInfo.service_data?.[0]) mainService = doctorInfo.service_data[0];
                return mainService as ServiceData;
            }).value

        }
        return doctors;
    }

    protected addClinicWorkingSelected(doctors:DoctorInterface[]):DoctorInterface[]{
        for (const d in doctors) {
            const doctorInfo = doctors[d];
            doctors[d].clinicWorkingSelected = ref( this.clinicWorkingDefault(doctorInfo.id) as ClinicInterface ?? null);
        }
        return doctors;
    }
    protected addClinicsForDoctors(doctors:DoctorInterface[]):DoctorInterface[]{
        for (const d in doctors) {
            const doctorInfo = doctors[d];
            doctors[d].clinics = ClinicsService.getClinicsByIds(Object.values(doctorInfo.filials));
        }
        return doctors;
    }

    public addShortFio(doctors:DoctorInterface[]):DoctorInterface[]{
        for (const d in doctors) {
            const doctorInfo = doctors[d];
            let fio = doctorInfo.fullname;
            doctors[d].shortFio = ( fio ) ? fio.split(' ').map((part, index) => index !== 0 ? part.charAt(0) + '.' : part).join(' '): fio;
        }
        return doctors;
    }



}
