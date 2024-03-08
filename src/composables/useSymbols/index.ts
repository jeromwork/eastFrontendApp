
import type {InjectionKey, Ref} from "vue";
import type {ServiceCartInterface} from "../../EastclinicVueApi";


export const servicesInCartSymbol: InjectionKey<Ref<ServiceCartInterface>> = Symbol.for('doctor-services-in-cart') as InjectionKey<Ref<number>>