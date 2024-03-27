interface ServicesResponseInterface{
    id:string;
    counter:number;
}

export default interface BookingResponseInterface {
    key : string;
    sessionId?:string|null;
    doctor?: number|string|null,
    clinic?: number|string|null,
    slot?:   number|string|null,
    services?: ServicesResponseInterface[],
    onlyMessages?:boolean|null;
    name: string|undefined|null,
    // surname: string|undefined|null,
    phone:string|undefined|null,
    type?:string,
}