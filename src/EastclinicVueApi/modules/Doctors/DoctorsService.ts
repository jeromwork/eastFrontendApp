
import {computed, reactive, ref, toRaw} from "vue";
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



        this.state.setItems(response.doctors);


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
            const doctor =  this.state.getItem(doctorId) as DoctorInterface;

            if(!doctor || !doctor.filials) return null;
            //get doctors schedule
            const schedule = ScheduleService.getScheduleForDoctor(doctorId)
            //get current clinic from url



            // console.log(schedule)

            return null;
        }).value

        }

}
