
import type {InjectionKey, Ref} from "vue";
import type {ServiceCartInterface, ServiceData, } from "../../EastclinicVueApi";


export const servicesInCartSymbol: InjectionKey<Ref<ServiceCartInterface>> = Symbol.for('doctor-services-in-cart')
export const servicesSelectedSymbol: InjectionKey<Ref<ServiceData[]>> = Symbol.for('doctor-services-selected')