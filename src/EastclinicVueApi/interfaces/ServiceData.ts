export default interface ServiceData {
    id: string;
    serviceId: number;
    variationId: number;
    name: string;
    variationName: string;
    price: number;
    custom_price: number;
    option: string;
    discount?: number;
    favorite?:boolean;
    selected?:boolean;
}