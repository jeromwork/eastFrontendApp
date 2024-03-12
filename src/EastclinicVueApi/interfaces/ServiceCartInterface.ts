import type ServiceData from "./ServiceData";

export default interface ServiceCartInterface {
    [key: string]:{
        service:ServiceData;
        count:number;
    },
}