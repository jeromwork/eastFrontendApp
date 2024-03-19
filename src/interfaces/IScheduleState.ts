export default interface IScheduleState{
    slots: Readonly<number[]> | null;
    selectedSlot: number|null;
    selectedSlotError?:string;
    setSelectedSlot(slot:number|null):this
}
