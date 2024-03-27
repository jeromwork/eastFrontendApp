
import type {InjectionKey, Ref} from "vue";
import type {ServiceCartInterface, ServiceData, ClinicInterface, DoctorInterface } from "../../EastclinicVueApi";
import { BookingService } from "../../EastclinicVueApi";
import type DoctorCardState from "../../state/DoctorCardState";
import type IScheduleState from "../../interfaces/IScheduleState";
import type IClinicsState from "../../interfaces/IClinicsState";
import type BookingState from "../../state/BookingState";

export const BookingServiceSymbol:InjectionKey<BookingService> = Symbol.for('booking-service')
export const DoctorInfoSymbol:InjectionKey<DoctorInterface> = Symbol.for('DoctorInfo')
export const DoctorCartStateSymbol:InjectionKey<DoctorCardState> = Symbol.for('DoctorCartState')

export const servicesInCartSymbol: InjectionKey<Ref<ServiceCartInterface>> = Symbol.for('doctor-services-in-cart')
export const servicesSelectedSymbol: InjectionKey<Ref<ServiceData[]>> = Symbol.for('doctor-services-selected')

export const servicesSymbol:InjectionKey<Ref<ServiceData[]>> = Symbol.for('services')


export const ScheduleStateSymbol:InjectionKey<IScheduleState> = Symbol.for('schedule-state-of-doctor');
export const ClinicsStateSymbol:InjectionKey<IClinicsState> = Symbol.for('clinics-state');
export const BookingStateSymbol:InjectionKey<BookingState> = Symbol.for('booking-state');




export const currentWorkingDayRefSymbol:InjectionKey<Ref<number | null>> = Symbol.for('current-working-day')
export const workDaysReadonlyRefSymbol:InjectionKey<Readonly<Ref<number[] | null>>> = Symbol.for('work-days')


