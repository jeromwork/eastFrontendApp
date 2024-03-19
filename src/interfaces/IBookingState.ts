import type BookingFormViewProps from "../components/Booking/imterfaces/BookingFormViewProprs";
import { ref } from "vue";

export default interface IBookingState{


    bookingFormViewProps:BookingFormViewProps | null;
    showBookingSuccessMessage:boolean;
    showLeaveMessage:boolean;

    toggleBookingLeaveMessage( show:boolean ):this;
    toogleBookingSuccessMessage(show:boolean):this;
    setBookingFormBlocks( viewProps:BookingFormViewProps ):this;
    book():Promise<null|undefined>;



}
