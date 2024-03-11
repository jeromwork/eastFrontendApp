import type { ClinicInterface } from '../EastclinicVueApi'

interface DispatchKey<T> extends Symbol {
}

/** function for show/hide modal services */
export const ShowModalServicesDispatch: DispatchKey<boolean> = Symbol('ShowModalServicesDispatch')

/**  function for show/hide booking form */
export const ShowModalBookingFormDispatch: DispatchKey<boolean> = Symbol('ShowModalBookingFormDispatch')


import type BookingFormViewProps from "../components/Booking/imterfaces/BookingFormViewProprs";

export const OpenBookingFormDispatch: DispatchKey<BookingFormViewProps> = Symbol('OpenBookingFormDispatch')