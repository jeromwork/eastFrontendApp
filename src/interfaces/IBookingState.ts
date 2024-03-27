import type BookingFormViewProps from "../components/Booking/imterfaces/BookingFormViewProprs";
import { ref } from "vue";
import  type {Ref} from "vue";
import type { IBookingRequest } from '../EastclinicVueApi'

export default interface IBookingState{


    bookingFormViewProps:Ref<BookingFormViewProps| Object>;
    showBookingSuccessMessage:boolean;
    showLeaveMessage:boolean;
    showModalBooking:boolean;
    showBookingScheduleBlock:boolean;

    toggleBookingLeaveMessage( show:boolean ):this;
    toogleBookingSuccessMessage(show:boolean):this;
    setBookingFormBlocks( viewProps:BookingFormViewProps ):this;
    book():Promise<IBookingRequest|undefined>;



}
