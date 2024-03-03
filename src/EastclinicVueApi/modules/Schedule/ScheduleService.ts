import ScheduleApi from './api/ScheduleApi';
import StateManager from "../../util/StateManager";
import type ScheduleRequest from "./api/ScheduleRequest";
import type {Ref} from "vue";
import {toRef} from "vue";
import type ScheduleInterface from "../../interfaces/ScheduleInterface";

//singleton state
const state = new StateManager();
class ScheduleService{
    private state: StateManager;

    constructor() {
        this.state = state;
    }

    public async getSchedulesFromServer( request:ScheduleRequest ){
        //add modx api data
        request.with('component', 'east_schedule').with('action', 'getSchedule')

        const { schedules } = await (new ScheduleApi).get(request.with('component', 'east').getRequestData()) ;

        this.setSchedules( schedules );
    }


    public setSchedules(schedules: ScheduleInterface[]):this{
        this.state.set('schedules', schedules);
        this.setSchedulesByDoctorsDays(schedules);
        return this;
    }


    protected setSchedulesByDoctorsDays( schedules: ScheduleInterface[]):this{
        const workDaysByDoctorsDaysClinics:any = {};
        for (const s in schedules.sort(this.sortAsc)){
            const schedule = schedules[s];
            workDaysByDoctorsDaysClinics['doctorId'] ??= {};
            workDaysByDoctorsDaysClinics['doctorId']['date'] ??= {};
            workDaysByDoctorsDaysClinics['doctorId']['date']['clinicId'] = schedule;
        }
        this.state.set('schedulesByDoctorsIds', workDaysByDoctorsDaysClinics);
        return this;
    }

    public workDaysForDoctor( doctorId:number ):Ref<string[]>|null{
        const workDays = this.state.get('schedulesByDoctorsIds')?.value?.[doctorId];
        return (workDays) ? toRef(Object.keys(workDays)) : null;
    }

    public workDayInfoForDoctorDayClinic( doctorId:number, day:number ):ScheduleInterface{

        return toRef(this.state.get('schedulesByDoctorsIds').value[doctorId] )
    }


    public nearestWorkDayForDoctor(doctorId:number):Ref<string>|null{
        const workDaysRef = this.workDaysForDoctor(doctorId);
        return (workDaysRef?.value) ? toRef(Object.keys(workDaysRef.value)[0]) : null;
    }

    public getSlots(doctorId:number, day:number, clinicId:number):Ref<string[]>|null{
        const nearestWorkDay = this.nearestWorkDayForDoctor(doctorId);
        // if (nearestWorkDay?.value) {
        //     this.workDayInfoForDoctor(doctorId, day)
        //     return null;
        // }
        return null
    }



    public get schedules():Ref<ScheduleInterface>{
        return this.state.get('schedules') as Ref<ScheduleInterface>;
    }

protected sortAsc(a:ScheduleInterface, b:ScheduleInterface) {
        if (a.doctorId !== b.doctorId) {
            return a.doctorId - b.doctorId;
        }
        return a.date - b.date;
    }



}


//schedule service is singleton of class ScheduleService
export default new ScheduleService()
