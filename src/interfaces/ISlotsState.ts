export default interface ISlotsState{
    slots: Readonly<number[]> | null;
    setSelectedSlot(slot:number|null):this
}
