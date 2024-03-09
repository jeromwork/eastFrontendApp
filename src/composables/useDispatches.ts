import type { ClinicInterface } from '../EastclinicVueApi'

interface DispatchKey<T> extends Symbol {
}

export const ShowModalServicesDispatch: DispatchKey<boolean> = Symbol('ShowModalServicesDispatch')
export const ShowModalBookingFormDispatch: DispatchKey<boolean> = Symbol('ShowModalBookingFormDispatch')