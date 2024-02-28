export default interface ServiceData {
    id: string;
    serviceId: number;
    variationId: number;
    name: string;
    variationName: string;
    variationOfficialCode: string;
    price: number;
    custom_price: number;
    default_option: string;
    option: string;
    discount?: number;
    weight: number;
}