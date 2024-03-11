
import type {InjectionKey, Ref} from "vue";
import type {ServiceCartInterface, ServiceData, ClinicInterface, DoctorInterface } from "../../EastclinicVueApi";
import { BookingService } from "../../EastclinicVueApi";
import type DoctorCardState from "../../components/Doctors/DoctorCardState";

export const bookingServiceSymbol:InjectionKey<BookingService> = Symbol.for('booking-service')
export const DoctorInfoSymbol:InjectionKey<Ref<DoctorInterface>> = Symbol.for('DoctorInfo')
export const DoctorCartStateSymbol:InjectionKey<DoctorCardState> = Symbol.for('DoctorCartState')

export const servicesInCartSymbol: InjectionKey<Ref<ServiceCartInterface>> = Symbol.for('doctor-services-in-cart')
export const servicesSelectedSymbol: InjectionKey<Ref<ServiceData[]>> = Symbol.for('doctor-services-selected')

export const servicesSymbol:InjectionKey<Ref<ServiceData[]>> = Symbol.for('services')


export const slotsRefSymbol:InjectionKey<Readonly<Ref<number[]|null>>> = Symbol.for('slots-of-doctor');




export const currentWorkingDayRefSymbol:InjectionKey<Ref<number | null>> = Symbol.for('current-working-day')
export const workDaysReadonlyRefSymbol:InjectionKey<Readonly<Ref<number[] | null>>> = Symbol.for('work-days')


