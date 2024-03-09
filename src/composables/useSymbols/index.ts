
import type {InjectionKey, Ref} from "vue";
import type {ServiceCartInterface, ServiceData, } from "../../EastclinicVueApi";
import {BookingService} from "../../EastclinicVueApi";


export const servicesInCartSymbol: InjectionKey<Ref<ServiceCartInterface>> = Symbol.for('doctor-services-in-cart')
export const servicesSelectedSymbol: InjectionKey<Ref<ServiceData[]>> = Symbol.for('doctor-services-selected')

export const bookingServiceSymbol:InjectionKey<BookingService> = Symbol.for('booking-service')
export const servicesSymbol:InjectionKey<Ref<ServiceData[]>> = Symbol.for('booking-service')