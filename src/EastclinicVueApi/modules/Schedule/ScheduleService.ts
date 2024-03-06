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
            workDaysByDoctorsDaysClinics[schedule.doctorId] ??= {};
            workDaysByDoctorsDaysClinics[schedule.doctorId][schedule.date] ??= {};
            workDaysByDoctorsDaysClinics[schedule.doctorId][schedule.date][schedule.clinicId] = schedule;
        }
        this.state.set('schedulesByDoctorsIds', workDaysByDoctorsDaysClinics);
        return this;
    }

    public workDays(doctorId: number, clinicId?:number|null): number[] | null {
        const schedules = this.state.get('schedules');
        console.log(clinicId)
        if( !schedules || schedules.length === 0 ) return null;
        schedules.filter((shd) => (shd.doctorId === doctorId && (!clinicId || (clinicId && shd.clinicId === clinicId))) )
        return schedules.map((shd) => shd.date );
    }

    public nearestWorkDayForDoctor(doctorId:number):number|null{
        return (this.workDays(doctorId)?.[0]) ?? null;
    }
    public workDayInfoForDoctorDayClinic( clinicId:number, doctorId:number, day:number ):ScheduleInterface{

        return toRef(this.state.get('schedulesByDoctorsIds').value[doctorId] )
    }




    public getSlots(clinicId:number, doctorId:number, day:number, ):number[]|null {
        return (this.state.get('schedulesByDoctorsIds')?.[doctorId]?.[day]?.[clinicId]?.slots) ?? null;
    }

    public getScheduleForDoctor(doctorId: number): ScheduleInterface[]|null {
        return computed(()=>{
            const schedules = this.state.get('schedules');
            return ( schedules ) ? schedules.filter((shd:ScheduleInterface) => shd.doctorId === doctorId) : null;
        }).value

    }


    public get schedules(): Ref<ScheduleInterface>[]|Ref<null> {
        return (this.state.get('schedules').value ) ? this.state.get('schedules') as any as Ref<ScheduleInterface>[] : toRef(null);
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
