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
        this.setSchedulesByDoctorsIds(schedules);
        return this;
    }


    protected setSchedulesByDoctorsIds( schedules: ScheduleInterface[]):this{
        const workDaysByDoctorsIds:any = {};
        for (const s in schedules.sort(this.sortAsc)){
            if(!workDaysByDoctorsIds[schedules[s]['doctorId']]) workDaysByDoctorsIds[schedules[s]['doctorId']] = {};
            if(!workDaysByDoctorsIds[schedules[s]['doctorId']][schedules[s]['date']]) workDaysByDoctorsIds[schedules[s]['doctorId']][schedules[s]['date']] = {};
            workDaysByDoctorsIds[schedules[s]['doctorId']][schedules[s]['date']][schedules[s]['date']] = schedules[s]['date'];
        }
        this.state.set('schedulesByDoctorsIds', workDaysByDoctorsIds);
        return this;
    }

    public workDaysForDoctor( doctorId:number ):Ref<number[]>{
        return toRef(this.state.get('schedulesByDoctorsIds').value[doctorId] )
    }

    public workDayInfoForDoctor( doctorId:number, day:number ):ScheduleInterface{
        return toRef(this.state.get('schedulesByDoctorsIds').value[doctorId] )
    }


    public nearestWorkDayForDoctor(doctorId:number):Ref<number>|null{
        const workDaysRef = this.workDaysForDoctor(doctorId);
        if (workDaysRef.value) {
            const nearestDay = Object.keys(workDaysRef.value)[0];
            const nearestDayAsNumber = parseInt(nearestDay, 10); // Assuming the day is represented as a string
            return toRef(nearestDayAsNumber);
        }
        return null
    }

    public getSlots(doctorId:number, day:number):Ref<number[]>|null{
        const nearestWorkDay = this.nearestWorkDayForDoctor(doctorId);
        if (nearestWorkDay?.value) {
            this.workDayInfoForDoctor(doctorId, day)
            return null;
        }
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
